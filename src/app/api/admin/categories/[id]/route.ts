import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { categories } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{ name: string; slug: string; description: string }>(request);
  const [category] = await db
    .update(categories)
    .set({
      ...(body.name ? { name: String(body.name) } : {}),
      ...(body.slug ? { slug: String(body.slug) } : {}),
      ...(body.description !== undefined ? { description: String(body.description) } : {})
    })
    .where(eq(categories.id, Number(id)))
    .returning();
  return ok(category);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin"])) return unauthorized();
  const { id } = await context.params;
  const [category] = await db.delete(categories).where(eq(categories.id, Number(id))).returning();
  return ok(category);
}
