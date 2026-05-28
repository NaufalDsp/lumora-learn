import { eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { options, questions } from "@/src/server/db/schema";
import { getCurrentSession } from "@/src/server/auth/session";
import { created, ok, unauthorized } from "@/src/server/http/responses";
import { readJsonBody } from "@/src/server/http/body";
import { hasRole } from "@/src/server/services/access-control";

export async function GET(request: Request) {
  const session = await getCurrentSession();
  if (!session) return unauthorized();
  const quizId = Number(new URL(request.url).searchParams.get("quizId"));
  return ok(await db.select().from(questions).where(eq(questions.quizId, quizId)));
}

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();
  const body = await readJsonBody<{
    quizId: number;
    questionText: string;
    sortOrder: number;
    options: { optionText: string; isCorrect: boolean }[];
  }>(request);
  const [question] = await db
    .insert(questions)
    .values({
      quizId: Number(body.quizId),
      questionText: String(body.questionText ?? ""),
      sortOrder: Number(body.sortOrder ?? 0)
    })
    .returning();

  if (Array.isArray(body.options)) {
    await db.insert(options).values(
      body.options.map((option) => ({
        questionId: question.id,
        optionText: String(option.optionText),
        isCorrect: Boolean(option.isCorrect)
      }))
    );
  }

  return created(question);
}
