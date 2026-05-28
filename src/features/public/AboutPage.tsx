import { CheckCircle2, GraduationCap, Sparkles, UsersRound } from "lucide-react";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const values = [
  "Membuat pembelajaran online lebih terstruktur",
  "Menggabungkan video, materi, kuis, dan progress dalam satu alur",
  "Memberi ruang kerja yang jelas untuk siswa, instruktur, dan admin"
];

export function AboutPage() {
  return (
    <main className="page">
      <section className="page-hero about-hero">
        <span className="pill">
          <Sparkles size={15} />
          About Lumora
        </span>
        <h1>Platform belajar modern untuk pengalaman yang lebih fokus.</h1>
        <p>
          Lumora Learn dirancang sebagai produk edukasi digital premium yang
          membantu siswa belajar terarah, instruktur mengelola kursus, dan admin
          memantau aktivitas pembelajaran dalam satu sistem.
        </p>
      </section>

      <section className="split-section">
        <div>
          <SectionHeading
            eyebrow="Product mission"
            title="Menyatukan proses belajar yang sebelumnya tersebar"
            description="Video, file materi, kuis, nilai, dan progress tidak perlu lagi berada di platform berbeda."
          />
          <ButtonLink href="/courses">
            <GraduationCap size={18} />
            Lihat Katalog
          </ButtonLink>
        </div>
        <div className="step-list">
          {values.map((value) => (
            <div className="step-item" key={value}>
              <span>
                <CheckCircle2 size={19} />
              </span>
              <strong>{value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHeading
          eyebrow="Who it serves"
          title="Dibangun untuk tiga peran utama"
        />
        <div className="feature-grid">
          {[
            ["Siswa", "Mengikuti kursus, menonton video, mengerjakan kuis, dan melihat progress."],
            ["Instruktur", "Membuat kursus, menyusun modul, mengunggah materi, dan memantau siswa."],
            ["Admin", "Mengelola user, kategori, kursus, laporan, dan aktivitas sistem."]
          ].map(([title, body]) => (
            <article className="glass-card" key={title}>
              <UsersRound size={22} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
