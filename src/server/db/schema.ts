import { relations, sql } from "drizzle-orm";
import { integer, real, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  role: text("role", { enum: ["admin", "instructor", "student"] }).notNull().default("student"),
  status: text("status", { enum: ["active", "inactive"] }).notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const sessions = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" })
});

export const accounts = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const verifications = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).default(sql`(unixepoch())`)
});

export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  instructorId: text("instructor_id").notNull().references(() => users.id),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url"),
  level: text("level", { enum: ["Beginner", "Intermediate", "Advanced"] }).notNull(),
  status: text("status", { enum: ["draft", "published", "archived", "review"] }).notNull().default("draft"),
  estimatedDuration: integer("estimated_duration").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const enrollments = sqliteTable(
  "enrollments",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    studentId: text("student_id").notNull().references(() => users.id),
    courseId: integer("course_id").notNull().references(() => courses.id),
    progressPercentage: real("progress_percentage").notNull().default(0),
    status: text("status", { enum: ["active", "completed", "cancelled"] }).notNull().default("active"),
    enrolledAt: integer("enrolled_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`),
    completedAt: integer("completed_at", { mode: "timestamp" })
  },
  (table) => ({
    uniqueEnrollment: uniqueIndex("enrollments_student_course_unique").on(table.studentId, table.courseId)
  })
);

export const modules = sqliteTable("modules", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const lessons = sqliteTable("lessons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  moduleId: integer("module_id").notNull().references(() => modules.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  content: text("content"),
  videoUrl: text("video_url"),
  duration: integer("duration").notNull().default(0),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const materials = sqliteTable("materials", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileType: text("file_type").notNull(),
  fileSize: integer("file_size").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const quizzes = sqliteTable("quizzes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  passingScore: integer("passing_score").notNull().default(70),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  questionText: text("question_text").notNull(),
  sortOrder: integer("sort_order").notNull().default(0)
});

export const options = sqliteTable("options", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
  optionText: text("option_text").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" }).notNull().default(false)
});

export const quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id),
  studentId: text("student_id").notNull().references(() => users.id),
  score: integer("score").notNull(),
  status: text("status", { enum: ["passed", "failed"] }).notNull(),
  submittedAt: integer("submitted_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const lessonProgress = sqliteTable(
  "lesson_progress",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    studentId: text("student_id").notNull().references(() => users.id),
    lessonId: integer("lesson_id").notNull().references(() => lessons.id),
    isCompleted: integer("is_completed", { mode: "boolean" }).notNull().default(false),
    completedAt: integer("completed_at", { mode: "timestamp" })
  },
  (table) => ({
    uniqueLessonProgress: uniqueIndex("lesson_progress_student_lesson_unique").on(table.studentId, table.lessonId)
  })
);

export const activityLogs = sqliteTable("activity_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type").notNull(),
  entityId: integer("entity_id"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(sql`(unixepoch())`)
});

export const usersRelations = relations(users, ({ many }) => ({
  courses: many(courses),
  enrollments: many(enrollments),
  quizAttempts: many(quizAttempts)
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  courses: many(courses)
}));

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, { fields: [courses.instructorId], references: [users.id] }),
  category: one(categories, { fields: [courses.categoryId], references: [categories.id] }),
  modules: many(modules),
  enrollments: many(enrollments)
}));

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, { fields: [modules.courseId], references: [courses.id] }),
  lessons: many(lessons)
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, { fields: [lessons.moduleId], references: [modules.id] }),
  materials: many(materials),
  quizzes: many(quizzes)
}));

export const schema = {
  users,
  sessions,
  accounts,
  verifications,
  categories,
  courses,
  enrollments,
  modules,
  lessons,
  materials,
  quizzes,
  questions,
  options,
  quizAttempts,
  lessonProgress,
  activityLogs
};
