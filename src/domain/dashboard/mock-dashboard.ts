import { featuredCourses } from "@/src/domain/course/mock-courses";

export const studentDashboard = {
  name: "Alya",
  stats: [
    { label: "Kursus aktif", value: "6" },
    { label: "Lesson selesai", value: "18" },
    { label: "Kuis pending", value: "3" },
    { label: "Streak belajar", value: "12h" }
  ],
  learning: featuredCourses.map((course, index) => ({
    ...course,
    progress: [68, 42, 21][index] ?? 0,
    nextLesson: ["Building the learning shell", "Progress-oriented dashboard", "Quiz performance analysis"][index]
  })),
  quizzes: [
    { title: "UI Components Check", course: "UI/UX Futuristic Dashboard", due: "Hari ini" },
    { title: "Routing Fundamentals", course: "Frontend Mastery with Next.js", due: "Besok" }
  ]
};

export const instructorDashboard = {
  stats: [
    { label: "Kursus dibuat", value: "12" },
    { label: "Total siswa", value: "842" },
    { label: "Avg completion", value: "72%" },
    { label: "Materi upload", value: "96" }
  ],
  courses: featuredCourses.map((course, index) => ({
    ...course,
    status: index === 0 ? "Published" : index === 1 ? "Review" : "Draft",
    studentsCount: [420, 268, 154][index],
    completion: [74, 61, 38][index]
  })),
  students: [
    { name: "Alya Putri", course: "Frontend Mastery with Next.js", progress: 68 },
    { name: "Bima Satria", course: "UI/UX Futuristic Dashboard", progress: 91 },
    { name: "Citra Dewi", course: "Data Analytics for Product Teams", progress: 44 }
  ],
  materials: [
    { name: "Design checklist.pdf", type: "PDF", size: "1.8 MB" },
    { name: "Next.js starter.zip", type: "ZIP", size: "12.4 MB" },
    { name: "Quiz rubric.xlsx", type: "XLSX", size: "740 KB" }
  ]
};

export const adminDashboard = {
  stats: [
    { label: "Total users", value: "4,982" },
    { label: "Total courses", value: "126" },
    { label: "Instruktur aktif", value: "38" },
    { label: "Enrollments", value: "9,420" }
  ],
  users: [
    { name: "Alya Putri", email: "alya@lumora.test", role: "Siswa", status: "Active" },
    { name: "Raka Pradipta", email: "raka@lumora.test", role: "Instruktur", status: "Active" },
    { name: "Nadia Kurnia", email: "nadia@lumora.test", role: "Instruktur", status: "Active" },
    { name: "Admin Lumora", email: "admin@lumora.test", role: "Admin", status: "Active" }
  ],
  categories: ["Programming", "Design", "Business", "Data", "Language"],
  activities: [
    "Alya menyelesaikan Lesson 08 - Routing Fundamentals",
    "Instruktur Raka menerbitkan modul baru",
    "12 siswa mengerjakan kuis UI Components",
    "Admin menyetujui kursus Data Analytics"
  ]
};
