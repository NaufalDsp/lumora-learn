import { Plus, Upload } from "lucide-react";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { DataPanel } from "@/src/components/dashboard/DataPanel";
import { StatCard } from "@/src/components/dashboard/StatCard";
import { instructorDashboard } from "@/src/domain/dashboard/mock-dashboard";

export function InstructorDashboardPage() {
  return (
    <div className="dashboard-grid">
      <section className="focus-card focus-card--wide">
        <span className="eyebrow">Instructor studio</span>
        <h2>Bangun kursus dari draft sampai publish.</h2>
        <p>Kelola modul, video, materi, kuis, dan progres siswa dalam satu area.</p>
        <ButtonLink href="/instructor/courses/create" className="focus-card__action">
          <Plus size={18} />
          Buat Kursus
        </ButtonLink>
      </section>
      {instructorDashboard.stats.map((stat) => (
        <StatCard {...stat} key={stat.label} />
      ))}
      <InstructorCoursesPage />
    </div>
  );
}

export function InstructorCoursesPage() {
  return (
    <DataPanel eyebrow="My courses" title="Kursus saya">
      <div className="stack-list">
        {instructorDashboard.courses.map((course) => (
          <div className="management-row" key={course.slug}>
            <div>
              <strong>{course.title}</strong>
              <span>{course.studentsCount} siswa</span>
            </div>
            <b>{course.status}</b>
            <span>{course.completion}% completion</span>
            <ButtonLink href="/instructor/builder" variant="secondary">
              Edit
            </ButtonLink>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function CourseCreatePage() {
  return (
    <DataPanel eyebrow="Create course" title="Informasi kursus">
      <div className="form-stack">
        <label>
          Judul kursus
          <input defaultValue="Frontend Mastery with Next.js" />
        </label>
        <label>
          Deskripsi
          <textarea defaultValue="Bangun aplikasi web modern dengan pola frontend yang terstruktur." />
        </label>
        <div className="form-grid">
          <label>
            Kategori
            <select defaultValue="Programming">
              <option>Programming</option>
              <option>Design</option>
              <option>Data</option>
            </select>
          </label>
          <label>
            Level
            <select defaultValue="Intermediate">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </label>
        </div>
        <button className="button button--primary">Simpan Draft</button>
      </div>
    </DataPanel>
  );
}

export function CourseBuilderPage() {
  return (
    <DataPanel eyebrow="Module builder" title="Susun modul dan lesson">
      <div className="stack-list">
        {["Product orientation", "Design system foundations", "Learning shell", "Quiz setup"].map((lesson, index) => (
          <div className="module-builder-row" key={lesson}>
            <span>{index + 1}</span>
            <strong>{lesson}</strong>
            <button className="button button--secondary">
              <Upload size={17} />
              Upload
            </button>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function StudentProgressPage() {
  return (
    <DataPanel eyebrow="Student progress" title="Progres siswa">
      <div className="stack-list">
        {instructorDashboard.students.map((student) => (
          <div className="progress-row" key={student.name}>
            <strong>{student.name}</strong>
            <span>{student.course}</span>
            <div className="progress">
              <span style={{ width: `${student.progress}%` }} />
            </div>
            <b>{student.progress}%</b>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function MaterialLibraryPage() {
  return (
    <DataPanel eyebrow="Material library" title="File materi">
      <div className="stack-list">
        {instructorDashboard.materials.map((material) => (
          <div className="simple-row" key={material.name}>
            <Upload size={18} />
            <div>
              <strong>{material.name}</strong>
              <span>{material.type}</span>
            </div>
            <b>{material.size}</b>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}
