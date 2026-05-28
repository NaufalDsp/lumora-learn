import { PublicShell } from "@/src/components/public/PublicShell";
import { AuthPage } from "@/src/features/public/AuthPage";

export default function LoginPage() {
  return (
    <PublicShell>
      <AuthPage mode="login" />
    </PublicShell>
  );
}
