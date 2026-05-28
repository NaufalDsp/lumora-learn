import { CourseCard } from "@/src/components/course/CourseCard";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { featuredCourses } from "@/src/domain/course/mock-courses";
import type { Course } from "@/src/domain/course/types";
import { CourseFilters } from "./components/CourseFilters";

type CourseCatalogPageProps = {
  courses?: Course[];
};

export function CourseCatalogPage({ courses = featuredCourses }: CourseCatalogPageProps) {
  return (
    <main className="page">
      <section className="page-hero">
        <span className="pill">Course Catalog</span>
        <h1>Temukan jalur belajar yang pas.</h1>
        <p>
          Katalog publik menampilkan ringkasan kursus, level, instruktur, durasi,
          dan preview sebelum pengguna login.
        </p>
      </section>
      <CourseFilters />
      <section className="section section--compact">
        <SectionHeading
          eyebrow="Semua kursus"
          title="Kursus tersedia"
          description="Filter dan search sudah disiapkan sebagai UI awal untuk integrasi backend."
        />
        <div className="course-grid">
          {courses.map((course) => (
            <CourseCard course={course} key={course.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
