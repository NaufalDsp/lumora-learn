import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { quizzes } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { created, ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

export async function GET(request: Request) {
  const session = await getCurrentSession();
  if (!session) return unauthorized();
  const lessonId = Number(new URL(request.url).searchParams.get("lessonId"));
  return ok(await db.select().from(quizzes).where(eq(quizzes.lessonId, lessonId)));
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const body = await readJsonBody<{ lessonId: number; title: string; description: string; passingScore: number }>(request);
  const [quiz] = await db
    .insert(quizzes)
    .values({
      lessonId: Number(body.lessonId),
      title: String(body.title ?? ""),
      description: body.description ? String(body.description) : null,
      passingScore: Number(body.passingScore ?? 70)
    })
    .returning();
  return created(quiz);
}
