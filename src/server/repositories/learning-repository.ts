import { and, count, eq, inArray } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import {
  enrollments,
  lessonProgress,
  lessons,
  modules,
  options,
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

  const [lessonCourse] = await db
    .select({ courseId: modules.courseId })
    .from(lessons)
    .innerJoin(modules, eq(lessons.moduleId, modules.id))
    .where(eq(lessons.id, lessonId))
    .limit(1);

  if (lessonCourse) {
    await recalculateCourseProgress(studentId, lessonCourse.courseId);
  }

  return progress;
}

export async function scoreQuizAttempt(input: {
  studentId: string;
  quizId: number;
  answers: { questionId: number; optionId: number }[];
  passingScore: number;
}) {
  const optionIds = input.answers.map((answer) => answer.optionId);
  const correctOptions =
    optionIds.length > 0
      ? await db
          .select({ id: options.id })
          .from(options)
          .where(and(inArray(options.id, optionIds), eq(options.isCorrect, true)))
      : [];
  const totalQuestions = input.answers.length;
  const score = totalQuestions === 0 ? 0 : Math.round((correctOptions.length / totalQuestions) * 100);

  const [attempt] = await db
    .insert(quizAttempts)
    .values({
      quizId: input.quizId,
      studentId: input.studentId,
      score,
      status: score >= input.passingScore ? "passed" : "failed"
    })
    .returning();

  return attempt;
}

export async function getLesson(lessonId: number) {
  const [lesson] = await db.select().from(lessons).where(eq(lessons.id, lessonId)).limit(1);
  return lesson;
}

export async function recalculateCourseProgress(studentId: string, courseId: number) {
  const [total] = await db
    .select({ value: count(lessons.id) })
    .from(lessons)
    .innerJoin(modules, eq(lessons.moduleId, modules.id))
    .where(eq(modules.courseId, courseId));

  const [completed] = await db
    .select({ value: count(lessonProgress.id) })
    .from(lessonProgress)
    .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
    .innerJoin(modules, eq(lessons.moduleId, modules.id))
    .where(
      and(
        eq(lessonProgress.studentId, studentId),
        eq(lessonProgress.isCompleted, true),
        eq(modules.courseId, courseId)
      )
    );

  const progressPercentage = total.value === 0 ? 0 : Math.round((completed.value / total.value) * 100);
  const isCompleted = progressPercentage >= 100;

  const [enrollment] = await db
    .update(enrollments)
    .set({
      progressPercentage,
      status: isCompleted ? "completed" : "active",
      completedAt: isCompleted ? new Date() : null
    })
    .where(and(eq(enrollments.studentId, studentId), eq(enrollments.courseId, courseId)))
    .returning();

  return enrollment;
}
