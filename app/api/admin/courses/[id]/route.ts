import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { courses } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

type Context = { params: Promise<{ id: string }> };

export async function PATCH(request: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const body = await readJsonBody<{
    title: string;
    description: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    status: "draft" | "published" | "archived" | "review";
    categoryId: number;
  }>(request);
  const [course] = await db
    .update(courses)
    .set({
      ...(body.title ? { title: String(body.title) } : {}),
      ...(body.description ? { description: String(body.description) } : {}),
      ...(body.level ? { level: body.level } : {}),
      ...(body.status ? { status: body.status } : {}),
      ...(body.categoryId ? { categoryId: Number(body.categoryId) } : {}),
      updatedAt: new Date()
    })
    .where(eq(courses.id, Number(id)))
    .returning();
  return ok(course);
}

export async function DELETE(_: Request, context: Context) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const { id } = await context.params;
  const [course] = await db.delete(courses).where(eq(courses.id, Number(id))).returning();
  return ok(course);
}
