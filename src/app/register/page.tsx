import { PublicShell } from "@/src/components/public/PublicShell";
import { AuthPage } from "@/src/features/public/AuthPage";

export default function RegisterPage() {
  return (
    <PublicShell>
      <AuthPage mode="register" />
    </PublicShell>
  );
}
