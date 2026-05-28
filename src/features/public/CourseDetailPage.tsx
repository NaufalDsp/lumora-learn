import { CheckCircle2, CirclePlay, Clock, Lock, UsersRound } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/src/components/ui/Badge";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { getCourseBySlug } from "@/src/domain/course/mock-courses";
import type { Course } from "@/src/domain/course/types";

type CourseDetailPageProps = {
  slug: string;
  course?: Course | null;
};

export function CourseDetailPage({ slug, course: courseFromDatabase }: CourseDetailPageProps) {
  const course = courseFromDatabase ?? getCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  return (
    <main className="page">
      <section className="course-detail-hero">
        <div className="course-detail-hero__content">
          <div className="badge-row">
            <Badge>{course.category}</Badge>
            <Badge>{course.level}</Badge>
          </div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="course-facts">
            <span>
              <UsersRound size={17} />
              {course.students} siswa
            </span>
            <span>
              <Clock size={17} />
              {course.duration}
            </span>
            <span>{course.lessonsCount} lesson</span>
          </div>
          <div className="button-row">
            <ButtonLink href="/login">
              <CirclePlay size={18} />
              Mulai Belajar
            </ButtonLink>
            <ButtonLink href="/register" variant="secondary">
              Daftar Akun
            </ButtonLink>
          </div>
        </div>
        <div className={`course-detail-hero__visual course-card__visual--${course.accent}`}>
          <CirclePlay size={72} />
          <strong>Preview Course</strong>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-main">
          <section className="panel">
            <SectionHeading
              eyebrow="Learning outcomes"
              title="Yang akan dipelajari"
            />
            <div className="outcome-grid">
              {course.outcomes.map((outcome) => (
                <div className="outcome-card" key={outcome}>
                  <CheckCircle2 size={19} />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="panel">
            <SectionHeading eyebrow="Curriculum" title="Preview modul" />
            <div className="curriculum-list">
              {course.curriculum.map((lesson, index) => (
                <div className="curriculum-item" key={lesson.title}>
                  <span>{index + 1}</span>
                  <strong>{lesson.title}</strong>
                  <small>{lesson.duration}</small>
                  {lesson.isPreview ? <Badge tone="success">Preview</Badge> : <Lock size={17} />}
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className="panel enroll-card">
          <h2>Siap mulai?</h2>
          <p>
            Guest dapat melihat ringkasan dan preview. Untuk menonton semua video,
            mengunduh materi, dan mengerjakan kuis, pengguna perlu login.
          </p>
          <ButtonLink href="/login" className="button--full">
            Login untuk belajar
          </ButtonLink>
          <ButtonLink href="/register" variant="secondary" className="button--full">
            Buat akun siswa
          </ButtonLink>
        </aside>
      </section>
    </main>
  );
}
