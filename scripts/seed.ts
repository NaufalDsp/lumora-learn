import {
  accounts,
  activityLogs,
  categories,
  courses,
  enrollments,
  lessonProgress,
  lessons,
  materials,
  modules,
  options,
  questions,
  quizAttempts,
  quizzes,
  sessions,
  users,
  verifications
} from "../src/server/db/schema";
import { db } from "../src/server/db/client";

async function clearDatabase() {
  await db.delete(activityLogs);
  await db.delete(quizAttempts);
  await db.delete(lessonProgress);
  await db.delete(options);
  await db.delete(questions);
  await db.delete(quizzes);
  await db.delete(materials);
  await db.delete(lessons);
  await db.delete(modules);
  await db.delete(enrollments);
  await db.delete(courses);
  await db.delete(categories);
  await db.delete(accounts);
  await db.delete(sessions);
  await db.delete(verifications);
  await db.delete(users);
}

async function seedUsers() {
  await db.insert(users).values([
    {
      id: "user_admin",
      name: "Admin Lumora",
      email: "admin@lumora.test",
      emailVerified: true,
      role: "admin",
      status: "active"
    },
    {
      id: "user_instructor_raka",
      name: "Raka Pradipta",
      email: "raka@lumora.test",
      emailVerified: true,
      role: "instructor",
      status: "active"
    },
    {
      id: "user_instructor_maya",
      name: "Maya Lestari",
      email: "maya@lumora.test",
      emailVerified: true,
      role: "instructor",
      status: "active"
    },
    {
      id: "user_student_alya",
      name: "Alya Putri",
      email: "alya@lumora.test",
      emailVerified: true,
      role: "student",
      status: "active"
    },
    {
      id: "user_student_bima",
      name: "Bima Satria",
      email: "bima@lumora.test",
      emailVerified: true,
      role: "student",
      status: "active"
    }
  ]);
}

async function seedCatalog() {
  await db.insert(categories).values([
    { id: 1, name: "Programming", slug: "programming", description: "Web, app, dan software engineering." },
    { id: 2, name: "Design", slug: "design", description: "UI/UX, visual system, dan product design." },
    { id: 3, name: "Data", slug: "data", description: "Analytics, reporting, dan data-driven product." },
    { id: 4, name: "Business", slug: "business", description: "Strategy, operations, dan growth." },
    { id: 5, name: "Language", slug: "language", description: "Bahasa untuk komunikasi profesional." }
  ]);

  await db.insert(courses).values([
    {
      id: 1,
      instructorId: "user_instructor_raka",
      categoryId: 1,
      title: "Frontend Mastery with Next.js",
      slug: "frontend-mastery-nextjs",
      description:
        "Bangun aplikasi modern dengan App Router, komponen reusable, dan pola UI yang siap production.",
      level: "Intermediate",
      status: "published",
      estimatedDuration: 500
    },
    {
      id: 2,
      instructorId: "user_instructor_maya",
      categoryId: 2,
      title: "UI/UX Futuristic Dashboard",
      slug: "uiux-futuristic-dashboard",
      description:
        "Pelajari visual hierarchy, glassmorphism, dashboard layout, dan microinteraction modern.",
      level: "Beginner",
      status: "published",
      estimatedDuration: 310
    },
    {
      id: 3,
      instructorId: "user_instructor_raka",
      categoryId: 3,
      title: "Data Analytics for Product Teams",
      slug: "data-analytics-product-teams",
      description:
        "Ubah data aktivitas pengguna menjadi insight produk, laporan, dan eksperimen terukur.",
      level: "Advanced",
      status: "review",
      estimatedDuration: 645
    }
  ]);
}

async function seedCurriculum() {
  await db.insert(modules).values([
    { id: 1, courseId: 1, title: "Next.js Foundations", description: "Dasar App Router dan struktur project.", sortOrder: 1 },
    { id: 2, courseId: 1, title: "Learning Experience", description: "UI course, learning room, dan quiz.", sortOrder: 2 },
    { id: 3, courseId: 2, title: "Visual System", description: "Sistem visual futuristic dashboard.", sortOrder: 1 },
    { id: 4, courseId: 3, title: "Learning Analytics", description: "Analitik pembelajaran untuk product team.", sortOrder: 1 }
  ]);

  await db.insert(lessons).values([
    { id: 1, moduleId: 1, title: "Product orientation dan setup project", content: "Setup awal Lumora Learn.", videoUrl: "https://video.example/next-setup", duration: 492, sortOrder: 1 },
    { id: 2, moduleId: 1, title: "Design system foundations", content: "Token warna, spacing, typography.", videoUrl: "https://video.example/design-system", duration: 880, sortOrder: 2 },
    { id: 3, moduleId: 2, title: "Building the learning shell", content: "Layout dashboard dan learning room.", videoUrl: "https://video.example/learning-shell", duration: 1336, sortOrder: 1 },
    { id: 4, moduleId: 2, title: "Course state dan progress model", content: "Progress tracking dan quiz attempt.", videoUrl: "https://video.example/progress-model", duration: 1085, sortOrder: 2 },
    { id: 5, moduleId: 3, title: "Visual direction dan moodboard", content: "Moodboard UI Lumora.", videoUrl: "https://video.example/moodboard", duration: 571, sortOrder: 1 },
    { id: 6, moduleId: 4, title: "Enrollment dan completion funnel", content: "Funnel analitik siswa.", videoUrl: "https://video.example/funnel", duration: 1174, sortOrder: 1 }
  ]);

  await db.insert(materials).values([
    { id: 1, lessonId: 1, fileName: "nextjs-starter.zip", fileUrl: "/materials/nextjs-starter.zip", fileType: "ZIP", fileSize: 12400000 },
    { id: 2, lessonId: 2, fileName: "design-checklist.pdf", fileUrl: "/materials/design-checklist.pdf", fileType: "PDF", fileSize: 1800000 },
    { id: 3, lessonId: 3, fileName: "learning-room-wireframe.fig", fileUrl: "/materials/learning-room-wireframe.fig", fileType: "FIG", fileSize: 4200000 },
    { id: 4, lessonId: 6, fileName: "analytics-template.xlsx", fileUrl: "/materials/analytics-template.xlsx", fileType: "XLSX", fileSize: 740000 }
  ]);
}

async function seedQuiz() {
  await db.insert(quizzes).values([
    { id: 1, lessonId: 3, title: "Learning Shell Quiz", description: "Validasi pemahaman struktur UI.", passingScore: 70 },
    { id: 2, lessonId: 6, title: "Analytics Funnel Quiz", description: "Validasi pemahaman funnel.", passingScore: 75 }
  ]);

  await db.insert(questions).values([
    { id: 1, quizId: 1, questionText: "Apa pola terbaik untuk menjaga Learning Room mudah dikembangkan?", sortOrder: 1 },
    { id: 2, quizId: 1, questionText: "Elemen apa yang wajib terlihat pada course card?", sortOrder: 2 },
    { id: 3, quizId: 2, questionText: "Metrik apa yang tepat untuk melihat penyelesaian kursus?", sortOrder: 1 }
  ]);

  await db.insert(options).values([
    { questionId: 1, optionText: "Memecah UI menjadi shell, panel, dan komponen domain", isCorrect: true },
    { questionId: 1, optionText: "Menaruh semua state pada satu komponen global", isCorrect: false },
    { questionId: 1, optionText: "Membuat semua halaman sebagai modal", isCorrect: false },
    { questionId: 2, optionText: "Judul, instruktur, level, lesson, dan ringkasan", isCorrect: true },
    { questionId: 2, optionText: "Hanya gambar thumbnail", isCorrect: false },
    { questionId: 3, optionText: "Completion rate", isCorrect: true },
    { questionId: 3, optionText: "Jumlah warna pada dashboard", isCorrect: false }
  ]);
}

async function seedLearningActivity() {
  await db.insert(enrollments).values([
    { id: 1, studentId: "user_student_alya", courseId: 1, progressPercentage: 68, status: "active" },
    { id: 2, studentId: "user_student_alya", courseId: 2, progressPercentage: 42, status: "active" },
    { id: 3, studentId: "user_student_bima", courseId: 1, progressPercentage: 91, status: "active" }
  ]);

  await db.insert(lessonProgress).values([
    { studentId: "user_student_alya", lessonId: 1, isCompleted: true, completedAt: new Date() },
    { studentId: "user_student_alya", lessonId: 2, isCompleted: true, completedAt: new Date() },
    { studentId: "user_student_bima", lessonId: 1, isCompleted: true, completedAt: new Date() },
    { studentId: "user_student_bima", lessonId: 2, isCompleted: true, completedAt: new Date() },
    { studentId: "user_student_bima", lessonId: 3, isCompleted: true, completedAt: new Date() }
  ]);

  await db.insert(quizAttempts).values([
    { quizId: 1, studentId: "user_student_alya", score: 86, status: "passed" },
    { quizId: 1, studentId: "user_student_bima", score: 92, status: "passed" },
    { quizId: 2, studentId: "user_student_alya", score: 64, status: "failed" }
  ]);

  await db.insert(activityLogs).values([
    { userId: "user_student_alya", action: "completed_lesson", entityType: "lesson", entityId: 2 },
    { userId: "user_instructor_raka", action: "published_course", entityType: "course", entityId: 1 },
    { userId: "user_student_bima", action: "submitted_quiz", entityType: "quiz", entityId: 1 },
    { userId: "user_admin", action: "reviewed_course", entityType: "course", entityId: 3 }
  ]);
}

async function main() {
  await clearDatabase();
  await seedUsers();
  await seedCatalog();
  await seedCurriculum();
  await seedQuiz();
  await seedLearningActivity();

  console.log("Lumora Learn dummy data seeded successfully.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
