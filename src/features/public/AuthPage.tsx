import { ShieldCheck } from "lucide-react";
import { AuthForm } from "./components/AuthForm";

type AuthMode = "login" | "register" | "forgot-password";

const authCopy = {
  login: {
    eyebrow: "Welcome back",
    title: "Masuk ke ruang belajar",
    description: "Lanjutkan kursus, cek kuis pending, dan pantau progress belajar kamu.",
    button: "Masuk",
    helper: "Belum punya akun?",
    helperHref: "/register",
    helperLabel: "Daftar"
  },
  register: {
    eyebrow: "Create account",
    title: "Mulai perjalanan belajar",
    description: "Buat akun siswa untuk mengikuti kursus dan menyimpan progress.",
    button: "Buat akun",
    helper: "Sudah punya akun?",
    helperHref: "/login",
    helperLabel: "Masuk"
  },
  "forgot-password": {
    eyebrow: "Reset password",
    title: "Pulihkan akses akun",
    description: "Masukkan email akun kamu untuk menerima instruksi reset password.",
    button: "Kirim link reset",
    helper: "Ingat password?",
    helperHref: "/login",
    helperLabel: "Masuk"
  }
};

type AuthPageProps = {
  mode: AuthMode;
};

export function AuthPage({ mode }: AuthPageProps) {
  const copy = authCopy[mode];
  const isRegister = mode === "register";
  const isForgotPassword = mode === "forgot-password";

  return (
    <main className="auth-page">
      <section className="auth-visual">
        <span className="pill">
          <ShieldCheck size={15} />
          Secure learning access
        </span>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        <div className="auth-orbit">
          <div>
            <strong>68%</strong>
            <span>Progress aktif</span>
          </div>
          <div>
            <strong>3</strong>
            <span>Kuis pending</span>
          </div>
        </div>
      </section>

      <section className="auth-card">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h2>{copy.title}</h2>
        <AuthForm
          mode={mode}
          buttonLabel={copy.button}
          helper={copy.helper}
          helperHref={copy.helperHref}
          helperLabel={copy.helperLabel}
        />
      </section>
    </main>
  );
}
