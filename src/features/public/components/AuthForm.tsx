"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Mail, ShieldCheck, UserRound } from "lucide-react";
import { authClient } from "@/src/lib/auth-client";
import { ButtonLink } from "@/src/components/ui/ButtonLink";
import { useNotifications } from "@/src/components/notifications/NotificationProvider";

type AuthMode = "login" | "register" | "forgot-password";

type AuthFormProps = {
  mode: AuthMode;
  buttonLabel: string;
  helper: string;
  helperHref: string;
  helperLabel: string;
};

type AuthUserWithRole = {
  role?: string;
};

function getRoleRedirect(role?: string) {
  if (role === "admin") return "/admin";
  if (role === "instructor") return "/instructor";
  return "/student";
}

export function AuthForm({ mode, buttonLabel, helper, helperHref, helperLabel }: AuthFormProps) {
  const router = useRouter();
  const { notify } = useNotifications();
  const [isPending, setIsPending] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const isRegister = mode === "register";
  const isForgotPassword = mode === "forgot-password";

  async function handleSubmit(formData: FormData) {
    setIsPending(true);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const name = String(formData.get("name") ?? "");

    try {
      if (isForgotPassword) {
        notify("Demo reset password: email reset akan aktif saat email service disambungkan.", "info");
        return;
      }

      if (isRegister) {
        const { error } = await authClient.signUp.email({
          email,
          password,
          name,
          callbackURL: "/student"
        });

        if (error) {
          notify(error.message ?? "Registrasi gagal.", "error");
          return;
        }

        notify("Akun siswa berhasil dibuat.", "success");
        router.push("/student");
        router.refresh();
        return;
      }

      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe
      });

      if (error) {
        notify(error.message ?? "Login gagal.", "error");
        return;
      }

      notify("Login berhasil.", "success");
      router.push(getRoleRedirect((data?.user as AuthUserWithRole | undefined)?.role));
      router.refresh();
    } finally {
      setIsPending(false);
    }
  }

  return (
    <>
      <form action={handleSubmit} className="form-stack">
        {isRegister ? (
          <label>
            Nama lengkap
            <span className="input-shell">
              <UserRound size={17} />
              <input name="name" placeholder="Alya Putri" required />
            </span>
          </label>
        ) : null}
        <label>
          Email
          <span className="input-shell">
            <Mail size={17} />
            <input name="email" placeholder="nama@email.com" required type="email" />
          </span>
        </label>
        {!isForgotPassword ? (
          <label>
            Password
            <span className="input-shell">
              <ShieldCheck size={17} />
              <input name="password" minLength={8} placeholder="Minimal 8 karakter" required type="password" />
            </span>
          </label>
        ) : null}
        {!isForgotPassword && !isRegister ? (
          <div className="form-meta">
            <label className="checkbox-label">
              <input checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} type="checkbox" />
              Ingat saya
            </label>
            <Link href="/forgot-password">Lupa password?</Link>
          </div>
        ) : null}
        <button className="button button--primary button--full" disabled={isPending} type="submit">
          {isPending ? "Memproses..." : buttonLabel}
        </button>
      </form>
      <p className="auth-helper">
        {helper} <Link href={helperHref}>{helperLabel}</Link>
      </p>
      {!isForgotPassword ? (
        <ButtonLink href="/courses" variant="secondary" className="button--full">
          Jelajahi katalog sebagai guest
        </ButtonLink>
      ) : null}
    </>
  );
}
