import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { lessons } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{ title: string; content: string; videoUrl: string; duration: number; sortOrder: number }>(request);
  const [lesson] = await db
    .update(lessons)
    .set({
      ...(body.title ? { title: String(body.title) } : {}),
      ...(body.content !== undefined ? { content: String(body.content) } : {}),
      ...(body.videoUrl !== undefined ? { videoUrl: String(body.videoUrl) } : {}),
      ...(body.duration !== undefined ? { duration: Number(body.duration) } : {}),
      ...(body.sortOrder !== undefined ? { sortOrder: Number(body.sortOrder) } : {})
    })
    .where(eq(lessons.id, Number(id)))
    .returning();
  return ok(lesson);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const [lesson] = await db.delete(lessons).where(eq(lessons.id, Number(id))).returning();
  return ok(lesson);
}
