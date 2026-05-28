import type { ReactNode } from "react";
import { DashboardShell } from "@/src/components/dashboard/DashboardShell";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="student" title="Student Dashboard">
      {children}
    </DashboardShell>
  );
}
