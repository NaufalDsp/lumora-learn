import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { modules } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{ title: string; description: string; sortOrder: number }>(request);
  const [module] = await db
    .update(modules)
    .set({
      ...(body.title ? { title: String(body.title) } : {}),
      ...(body.description !== undefined ? { description: String(body.description) } : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: Number(body.sortOrder) } : {})
    })
    .where(eq(modules.id, Number(id)))
    .returning();
  return ok(module);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const [module] = await db.delete(modules).where(eq(modules.id, Number(id))).returning();
  return ok(module);
}
