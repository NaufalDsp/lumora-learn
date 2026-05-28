import { CirclePlay, Download, FileText } from "lucide-react";
import { CourseCard } from "@/src/components/course/CourseCard";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { DataPanel } from "@/src/components/dashboard/DataPanel";
import { StatCard } from "@/src/components/dashboard/StatCard";
import { featuredCourses } from "@/src/domain/course/mock-courses";
import { studentDashboard } from "@/src/domain/dashboard/mock-dashboard";

export function StudentDashboardPage() {
  return (
    <div className="dashboard-grid">
      <section className="focus-card">
        <span className="eyebrow">Continue learning</span>
        <h2>UI/UX Futuristic Dashboard</h2>
        <p>Lesson berikutnya: Building the learning shell</p>
        <div className="progress">
          <span style={{ width: "68%" }} />
        </div>
        <ButtonLink href="/student/learning-room" className="focus-card__action">
          <CirclePlay size={18} />
          Lanjutkan
        </ButtonLink>
      </section>
      {studentDashboard.stats.map((stat) => (
        <StatCard {...stat} key={stat.label} />
      ))}
      <DataPanel eyebrow="My learning" title="Progress kursus">
        <div className="stack-list">
          {studentDashboard.learning.map((course) => (
            <div className="progress-row" key={course.slug}>
              <strong>{course.title}</strong>
              <span>{course.nextLesson}</span>
              <div className="progress">
                <span style={{ width: `${course.progress}%` }} />
              </div>
              <b>{course.progress}%</b>
            </div>
          ))}
        </div>
      </DataPanel>
      <DataPanel eyebrow="Quiz" title="Kuis pending">
        <div className="stack-list">
          {studentDashboard.quizzes.map((quiz) => (
            <div className="simple-row" key={quiz.title}>
              <FileText size={18} />
              <div>
                <strong>{quiz.title}</strong>
                <span>{quiz.course}</span>
              </div>
              <b>{quiz.due}</b>
            </div>
          ))}
        </div>
      </DataPanel>
    </div>
  );
}

export function StudentCoursesPage() {
  return (
    <div className="page-stack">
      <DataPanel eyebrow="Course catalog" title="Katalog untuk siswa">
        <div className="course-grid dashboard-course-grid">
          {featuredCourses.map((course) => (
            <CourseCard course={course} key={course.slug} />
          ))}
        </div>
      </DataPanel>
    </div>
  );
}

export function MyLearningPage() {
  return (
    <DataPanel eyebrow="My Learning" title="Kursus yang sedang diikuti">
      <div className="stack-list">
        {studentDashboard.learning.map((course) => (
          <div className="learning-row" key={course.slug}>
            <div>
              <strong>{course.title}</strong>
              <span>{course.nextLesson}</span>
            </div>
            <div className="progress">
              <span style={{ width: `${course.progress}%` }} />
            </div>
            <ButtonLink href="/student/learning-room" variant="secondary">
              Lanjut
            </ButtonLink>
          </div>
        ))}
      </div>
    </DataPanel>
  );
}

export function LearningRoomPage() {
  return (
    <div className="learning-room-page">
      <section className="learning-video">
        <CirclePlay size={76} />
        <strong>03. Building the learning shell</strong>
      </section>
      <DataPanel eyebrow="Lesson aktif" title="Building the learning shell">
        <p>
          Video, materi unduhan, dan akses kuis disusun di satu ruang belajar agar fokus.
        </p>
        <div className="resource-grid">
          {["Design checklist.pdf", "Starter wireframe.fig"].map((file) => (
            <button className="resource-card" key={file}>
              <Download size={19} />
              <strong>{file}</strong>
              <span>Download material</span>
            </button>
          ))}
          <ButtonLink href="/student/quiz" variant="secondary" className="resource-card">
            <FileText size={19} />
            <strong>Kuis Lesson</strong>
            <span>5 soal pilihan ganda</span>
          </ButtonLink>
        </div>
      </DataPanel>
    </div>
  );
}

export function StudentQuizPage() {
  return (
    <DataPanel eyebrow="Quiz" title="UI structure fundamentals">
      <div className="quiz-card-large">
        <p>Apa pola terbaik untuk menjaga Learning Room mudah dikembangkan?</p>
        {[
          "Memecah UI menjadi shell, panel, dan komponen domain",
          "Menaruh semua state pada satu komponen global",
          "Menghindari progress indicator",
          "Membuat semua halaman sebagai modal"
        ].map((answer, index) => (
          <button className={index === 0 ? "answer active" : "answer"} key={answer}>
            {answer}
          </button>
        ))}
        <button className="button button--primary">Submit Kuis</button>
      </div>
    </DataPanel>
  );
}

export function StudentProgressPage() {
  return <MyLearningPage />;
}

export function StudentProfilePage() {
  return (
    <DataPanel eyebrow="Profile" title="Pengaturan akun">
      <div className="form-stack">
        <label>
          Nama
          <input defaultValue="Alya Putri" />
        </label>
        <label>
          Email
          <input defaultValue="alya@lumora.test" />
        </label>
        <button className="button button--primary">Simpan Profil</button>
      </div>
    </DataPanel>
  );
}
