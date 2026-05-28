import { and, desc, eq } from "drizzle-orm";
import { db } from "@/src/server/db/client";
import { categories, courses, lessons, modules } from "@/src/server/db/schema";

export async function listPublishedCourses() {
  return db
    .select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      description: courses.description,
      level: courses.level,
      status: courses.status,
      estimatedDuration: courses.estimatedDuration,
      category: categories.name
    })
    .from(courses)
    .innerJoin(categories, eq(courses.categoryId, categories.id))
    .where(eq(courses.status, "published"))
    .orderBy(desc(courses.createdAt));
}

export async function getCourseDetailBySlug(slug: string) {
  const [course] = await db
    .select({
      id: courses.id,
      slug: courses.slug,
      title: courses.title,
      description: courses.description,
      level: courses.level,
      status: courses.status,
      estimatedDuration: courses.estimatedDuration,
      category: categories.name
    })
    .from(courses)
    .innerJoin(categories, eq(courses.categoryId, categories.id))
    .where(and(eq(courses.slug, slug), eq(courses.status, "published")))
    .limit(1);

  if (!course) {
    return null;
  }

  const curriculum = await db
    .select({
      moduleId: modules.id,
      moduleTitle: modules.title,
      lessonId: lessons.id,
      lessonTitle: lessons.title,
      duration: lessons.duration
    })
    .from(modules)
    .leftJoin(lessons, eq(lessons.moduleId, modules.id))
    .where(eq(modules.courseId, course.id))
    .orderBy(modules.sortOrder, lessons.sortOrder);

  return { ...course, curriculum };
}

export async function createCourse(input: {
  instructorId: string;
  categoryId: number;
  title: string;
  slug: string;
  description: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  status?: "draft" | "published" | "archived" | "review";
}) {
  const [course] = await db.insert(courses).values(input).returning();
  return course;
}

export async function listInstructorCourses(instructorId: string) {
  return db
    .select()
    .from(courses)
    .where(eq(courses.instructorId, instructorId))
    .orderBy(desc(courses.createdAt));
}

export async function listAllCoursesForAdmin() {
  return db.select().from(courses).orderBy(desc(courses.createdAt));
}
