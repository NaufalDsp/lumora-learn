import type { ReactNode } from "react";
import { DashboardShell } from "@/src/components/dashboard/DashboardShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardShell role="admin" title="Admin Dashboard">
      {children}
    </DashboardShell>
  );
}
