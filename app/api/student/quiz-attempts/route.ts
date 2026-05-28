import { badRequest, created, unauthorized } from "@/src/server/http/responses";
import { getCurrentSession } from "@/src/server/auth/session";
import { submitQuizAttempt } from "@/src/server/repositories/learning-repository";

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session) {
    return unauthorized();
  }

  const body = await request.json();
  const score = Number(body.score);
  const quizId = Number(body.quizId);
  const passingScore = Number(body.passingScore ?? 70);

  if (Number.isNaN(score) || Number.isNaN(quizId)) {
    return badRequest("Payload kuis tidak valid");
  }

  const attempt = await submitQuizAttempt({
    studentId: session.user.id,
    quizId,
    score,
    passingScore
  });

  return created(attempt);
}
