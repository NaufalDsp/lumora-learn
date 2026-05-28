import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { quizzes } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{ title: string; description: string; passingScore: number }>(request);
  const [quiz] = await db
    .update(quizzes)
    .set({
      ...(body.title ? { title: String(body.title) } : {}),
      ...(body.description !== undefined ? { description: String(body.description) } : {}),
      ...(body.passingScore !== undefined ? { passingScore: Number(body.passingScore) } : {})
    })
    .where(eq(quizzes.id, Number(id)))
    .returning();
  return ok(quiz);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const [quiz] = await db.delete(quizzes).where(eq(quizzes.id, Number(id))).returning();
  return ok(quiz);
}
