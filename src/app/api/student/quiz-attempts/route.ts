import { badRequest, created, unauthorized } from "@/src/server/http/responses";
import { getCurrentSession } from "@/src/server/auth/session";
import { scoreQuizAttempt } from "@/src/server/repositories/learning-repository";

export async function POST(request: Request) {
  const session = await getCurrentSession();

  if (!session) {
    return unauthorized();
  }

  const body = await request.json();
  const quizId = Number(body.quizId);
  const passingScore = Number(body.passingScore ?? 70);
  const answers = Array.isArray(body.answers) ? body.answers : [];

  if (Number.isNaN(quizId) || answers.length === 0) {
    return badRequest("Payload kuis tidak valid");
  }

  const attempt = await scoreQuizAttempt({
    studentId: session.user.id,
    quizId,
    answers: answers.map((answer: { questionId: unknown; optionId: unknown }) => ({
      questionId: Number(answer.questionId),
      optionId: Number(answer.optionId)
    })),
    passingScore
  });

  return created(attempt);
}
