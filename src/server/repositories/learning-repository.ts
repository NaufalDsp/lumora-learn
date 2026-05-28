import { and, eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import {
  enrollments,
  lessonProgress,
  lessons,
  quizAttempts
} from "@/src/server/db/schema";

export async function createEnrollment(studentId: string, courseId: number) {
  const [enrollment] = await db
    .insert(enrollments)
    .values({ studentId, courseId })
    .onConflictDoNothing()
    .returning();

  if (enrollment) {
    return enrollment;
  }

  const [existing] = await db
    .select()
    .from(enrollments)
    .where(and(eq(enrollments.studentId, studentId), eq(enrollments.courseId, courseId)))
    .limit(1);

  return existing;
}

export async function listStudentEnrollments(studentId: string) {
  return db.select().from(enrollments).where(eq(enrollments.studentId, studentId));
}

export async function markLessonCompleted(studentId: string, lessonId: number) {
  const [progress] = await db
    .insert(lessonProgress)
    .values({ studentId, lessonId, isCompleted: true, completedAt: new Date() })
    .onConflictDoUpdate({
      target: [lessonProgress.studentId, lessonProgress.lessonId],
      set: { isCompleted: true, completedAt: new Date() }
    })
    .returning();

  return progress;
}

export async function submitQuizAttempt(input: {
  studentId: string;
  quizId: number;
  score: number;
  passingScore: number;
}) {
  const [attempt] = await db
    .insert(quizAttempts)
    .values({
      quizId: input.quizId,
      studentId: input.studentId,
      score: input.score,
      status: input.score >= input.passingScore ? "passed" : "failed"
    })
    .returning();

  return attempt;
}

export async function getLesson(lessonId: number) {
  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
  return lesson;
}
