import { count, desc, eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import {
  activityLogs,
  categories,
  courses,
  enrollments,
  lessons,
  modules,
  quizAttempts,
  users
} from "@/src/server/db/schema";
import type { Course } from "@/src/domain/course/types";

const courseAccents: Course["accent"][] = ["violet", "cyan", "green"];

export async function getPublicCourseCards(): Promise<Course[]> {
  const rows = await db
    .select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      category: categories.name,
      level: courses.level,
      instructor: users.name,
      lessonsCount: count(lessons.id),
      duration: courses.estimatedDuration,
      description: courses.description
    })
    .from(courses)
    .innerJoin(categories, eq(courses.categoryId, categories.id))
    .innerJoin(users, eq(courses.instructorId, users.id))
    .leftJoin(modules, eq(modules.courseId, courses.id))
    .leftJoin(lessons, eq(lessons.moduleId, modules.id))
    .where(eq(courses.status, "published"))
    .groupBy(courses.id)
    .orderBy(desc(courses.createdAt));

  return rows.map((row, index) => ({
    slug: row.slug,
    title: row.title,
    category: row.category,
    level: row.level,
    instructor: row.instructor,
    lessonsCount: row.lessonsCount,
    duration: `${Math.max(1, Math.round(row.duration / 60))}j`,
    rating: 4.7 + index / 10,
    students: `${920 + index * 160}`,
    accent: courseAccents[index % courseAccents.length],
    summary: row.description,
    description: row.description,
    outcomes: [
      "Mengikuti lesson secara terstruktur",
      "Mengakses materi pendukung",
      "Mengerjakan kuis dan melihat progress",
      "Melanjutkan pembelajaran dari lesson terakhir"
    ],
    curriculum: []
  }));
}

export async function getPublicCourseBySlug(slug: string): Promise<Course | null> {
  const cards = await getPublicCourseCards();
  const course = cards.find((item) => item.slug === slug);

  if (!course) return null;

  const curriculum = await db
    .select({
      title: lessons.title,
      duration: lessons.duration
    })
    .from(courses)
    .innerJoin(modules, eq(modules.courseId, courses.id))
    .innerJoin(lessons, eq(lessons.moduleId, modules.id))
    .where(eq(courses.slug, slug))
    .orderBy(modules.sortOrder, lessons.sortOrder);

  return {
    ...course,
    curriculum: curriculum.map((lesson, index) => ({
      title: lesson.title,
      duration: `${Math.round(lesson.duration / 60)}:${String(lesson.duration % 60).padStart(2, "0")}`,
      isPreview: index < 2
    }))
  };
}

export async function getAdminSummary() {
  const [userCount] = await db.select({ value: count(users.id) }).from(users);
  const [courseCount] = await db.select({ value: count(courses.id) }).from(courses);
  const [enrollmentCount] = await db.select({ value: count(enrollments.id) }).from(enrollments);
  const [attemptCount] = await db.select({ value: count(quizAttempts.id) }).from(quizAttempts);
  const recentActivity = await db.select().from(activityLogs).orderBy(desc(activityLogs.createdAt)).limit(8);

  return {
    stats: [
      { label: "Total users", value: String(userCount.value) },
      { label: "Total courses", value: String(courseCount.value) },
      { label: "Enrollments", value: String(enrollmentCount.value) },
      { label: "Quiz attempts", value: String(attemptCount.value) }
    ],
    recentActivity
  };
}
