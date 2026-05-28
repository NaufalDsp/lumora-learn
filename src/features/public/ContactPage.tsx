import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { ButtonLink } from "@/src/components/ui/ButtonLink";

export function ContactPage() {
  return (
    <main className="page">
      <section className="contact-layout">
        <div className="page-hero">
          <span className="pill">
            <MessageSquare size={15} />
            Contact
          </span>
          <h1>Diskusikan kebutuhan belajar digital kamu.</h1>
          <p>
            Hubungi tim Lumora Learn untuk demo, kerja sama institusi, atau
            konsultasi pengembangan platform e-learning.
          </p>
          <div className="contact-list">
            <span>
              <Mail size={18} />
              hello@lumora-learn.test
            </span>
            <span>
              <Phone size={18} />
              +62 812 0000 2026
            </span>
            <span>
              <MapPin size={18} />
              Jakarta, Indonesia
            </span>
          </div>
        </div>
        <section className="auth-card contact-card">
          <span className="eyebrow">Send message</span>
          <h2>Kirim pesan</h2>
          <form className="form-stack">
            <label>
              Nama
              <input placeholder="Nama kamu" />
            </label>
            <label>
              Email
              <input placeholder="nama@email.com" type="email" />
            </label>
            <label>
              Pesan
              <textarea placeholder="Ceritakan kebutuhan kamu" />
            </label>
            <ButtonLink href="mailto:hello@lumora-learn.test" className="button--full">
              Kirim via Email
            </ButtonLink>
          </form>
        </section>
      </section>
    </main>
  );
}
