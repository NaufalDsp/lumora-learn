import { badRequest, created, unauthorized } from "@/src/server/http/responses";
import { getCurrentSession } from "@/src/server/auth/session";
import { getLesson, markLessonCompleted } from "@/src/server/repositories/learning-repository";

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session) {
    return unauthorized();
  }

  const body = await request.json();
  const lessonId = Number(body.lessonId);
  const lesson = await getLesson(lessonId);

  if (!lesson) {
    return badRequest("Lesson tidak ditemukan");
  }

  const progress = await markLessonCompleted(session.user.id, lessonId);
  return created(progress);
}
