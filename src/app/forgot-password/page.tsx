import { PublicShell } from "@/src/components/public/PublicShell";
import { AuthPage } from "@/src/features/public/AuthPage";

export default function ForgotPasswordPage() {
  return (
    <PublicShell>
      <AuthPage mode="forgot-password" />
    </PublicShell>
  );
}
