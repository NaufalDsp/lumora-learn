import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { questions } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{ questionText: string; sortOrder: number }>(request);
  const [question] = await db
    .update(questions)
    .set({
      ...(body.questionText ? { questionText: String(body.questionText) } : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: Number(body.sortOrder) } : {})
    })
    .where(eq(questions.id, Number(id)))
    .returning();
  return ok(question);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const [question] = await db.delete(questions).where(eq(questions.id, Number(id))).returning();
  return ok(question);
}
