import { BookOpen, CheckCircle2, GraduationCap, Sparkles } from "lucide-react";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { CourseCard } from "@/src/components/course/CourseCard";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { featuredCourses } from "@/src/domain/course/mock-courses";
import type { Course } from "@/src/domain/course/types";
import { DashboardPreview } from "./components/DashboardPreview";

const features = [
  {
    title: "Belajar terstruktur",
    body: "Video, lesson, materi, dan kuis tersusun dalam alur yang jelas dari awal sampai selesai."
  },
  {
    title: "Progress terlihat",
    body: "Siswa langsung tahu kursus apa yang sedang berjalan, lesson berikutnya, dan status penyelesaian."
  },
  {
    title: "Siap untuk role lengkap",
    body: "Arsitektur produk disiapkan untuk guest, siswa, instruktur, dan admin sesuai PRD."
  }
];

type LandingPageProps = {
  courses?: Course[];
};

export function LandingPage({ courses = featuredCourses }: LandingPageProps) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-section__content">
          <span className="pill">
            <Sparkles size={15} />
            Futuristic learning space
          </span>
          <h1>Belajar lebih terarah dalam satu platform futuristik.</h1>
          <p>
            Lumora Learn menyatukan video kursus, materi unduhan, kuis, dan
            progress tracking dalam pengalaman belajar yang premium, clean, dan imersif.
          </p>
          <div className="button-row">
            <ButtonLink href="/courses">
              <BookOpen size={18} />
              Mulai Belajar
            </ButtonLink>
            <ButtonLink href="/register" variant="secondary">
              <GraduationCap size={18} />
              Daftar Akun
            </ButtonLink>
          </div>
          <div className="metric-grid">
            <Metric value="3.8k" label="Siswa aktif" />
            <Metric value="126" label="Kursus publish" />
            <Metric value="84%" label="Completion rate" />
          </div>
        </div>
        <DashboardPreview />
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Feature highlight"
          title="Dibuat untuk pengalaman belajar yang fokus"
          description="Fitur awal mengikuti kebutuhan guest dalam PRD, dengan struktur yang siap diperluas ke dashboard role."
        />
        <div className="feature-grid">
          {features.map((feature) => (
            <article className="glass-card" key={feature.title}>
              <CheckCircle2 size={22} />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Popular courses"
          title="Kursus populer"
          description="Preview katalog publik yang bisa dilihat guest sebelum login."
        />
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard course={course} key={course.slug} />
          ))}
        </div>
      </section>

      <section className="split-section">
        <div>
          <SectionHeading
            eyebrow="How it works"
            title="Alur belajar sederhana"
            description="Pilih kursus, daftar akun, mulai belajar, kerjakan kuis, lalu pantau progress sampai selesai."
          />
        </div>
        <div className="step-list">
          {["Cari kursus", "Lihat detail", "Login atau daftar", "Mulai belajar"].map((step, index) => (
            <div className="step-item" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <span className="eyebrow">Lumora Learn</span>
        <h2>Bangun kebiasaan belajar yang lebih rapi hari ini.</h2>
        <ButtonLink href="/register">Buat Akun Gratis</ButtonLink>
      </section>
    </main>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="metric-card">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
