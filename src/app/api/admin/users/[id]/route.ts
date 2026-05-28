import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { users } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{
    name: string;
    role: "admin" | "instructor" | "student";
    status: "active" | "inactive";
  }>(request);
  const [user] = await db
    .update(users)
    .set({
      ...(body.name ? { name: String(body.name) } : {}),
      ...(body.role ? { role: body.role } : {}),
      ...(body.status ? { status: body.status } : {}),
      updatedAt: new Date()
    })
    .where(eq(users.id, id))
    .returning();
  return ok(user);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin"])) return unauthorized();
  const { id } = await context.params;
  const [user] = await db.delete(users).where(eq(users.id, id)).returning();
  return ok(user);
}
