import type { Course } from "./types";

export const featuredCourses: Course[] = [
  {
    slug: "frontend-mastery-nextjs",
    title: "Frontend Mastery with Next.js",
    category: "Programming",
    level: "Intermediate",
    instructor: "Raka Pradipta",
    lessonsCount: 28,
    duration: "8j 20m",
    rating: 4.8,
    students: "1.240",
    accent: "violet",
    summary:
      "Bangun aplikasi modern dengan App Router, komponen reusable, dan pola UI yang siap production.",
    description:
      "Kursus ini memandu siswa membangun aplikasi web modern menggunakan Next.js, mulai dari struktur route, komponen server, reusable UI, hingga pola integrasi API untuk produk e-learning.",
    outcomes: [
      "Memahami struktur App Router dan layout bertingkat",
      "Membangun komponen UI yang konsisten dan reusable",
      "Mendesain alur belajar berbasis video, materi, dan kuis",
      "Menyiapkan pola frontend yang siap dihubungkan ke backend"
    ],
    curriculum: [
      { title: "Product orientation dan setup project", duration: "08:12", isPreview: true },
      { title: "Design system foundations", duration: "14:40", isPreview: true },
      { title: "Building the learning shell", duration: "22:16", isPreview: false },
      { title: "Course state dan progress model", duration: "18:05", isPreview: false }
    ]
  },
  {
    slug: "uiux-futuristic-dashboard",
    title: "UI/UX Futuristic Dashboard",
    category: "Design",
    level: "Beginner",
    instructor: "Maya Lestari",
    lessonsCount: 18,
    duration: "5j 10m",
    rating: 4.9,
    students: "920",
    accent: "cyan",
    summary:
      "Pelajari visual hierarchy, glassmorphism, dashboard layout, dan microinteraction modern.",
    description:
      "Kursus desain antarmuka untuk membangun dashboard edukasi yang premium, clean, dan nyaman digunakan dalam sesi belajar panjang.",
    outcomes: [
      "Membuat sistem warna dark futuristic yang tetap readable",
      "Merancang kartu, badge, progress, dan search filter",
      "Menyusun dashboard siswa dan instruktur",
      "Menghindari UI dashboard yang terlalu padat"
    ],
    curriculum: [
      { title: "Visual direction dan moodboard", duration: "09:31", isPreview: true },
      { title: "Card system dan spacing", duration: "16:10", isPreview: true },
      { title: "Progress-oriented dashboard", duration: "20:42", isPreview: false },
      { title: "Responsive polish", duration: "15:20", isPreview: false }
    ]
  },
  {
    slug: "data-analytics-product-teams",
    title: "Data Analytics for Product Teams",
    category: "Data",
    level: "Advanced",
    instructor: "Nadia Kurnia",
    lessonsCount: 34,
    duration: "10j 45m",
    rating: 4.7,
    students: "740",
    accent: "green",
    summary:
      "Ubah data aktivitas pengguna menjadi insight produk, laporan, dan eksperimen terukur.",
    description:
      "Kursus untuk memahami data pembelajaran, aktivitas pengguna, performa kuis, dan metrik retensi agar tim produk bisa mengambil keputusan yang lebih tajam.",
    outcomes: [
      "Membaca funnel pembelajaran dari enrollment sampai completion",
      "Membangun laporan aktivitas dan performa kuis",
      "Mengidentifikasi lesson dengan drop-off tinggi",
      "Menerjemahkan data menjadi rekomendasi produk"
    ],
    curriculum: [
      { title: "Learning analytics fundamentals", duration: "12:04", isPreview: true },
      { title: "Enrollment dan completion funnel", duration: "19:34", isPreview: true },
      { title: "Quiz performance analysis", duration: "24:01", isPreview: false },
      { title: "Retention dashboard", duration: "21:18", isPreview: false }
    ]
  }
];

export function getCourseBySlug(slug: string) {
  return featuredCourses.find((course) => course.slug === slug);
}
