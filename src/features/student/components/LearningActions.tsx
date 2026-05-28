"use client";

import { CheckCircle2 } from "lucide-react";
import { useNotifications } from "@/src/components/notifications/NotificationProvider";

export function CompleteLessonButton() {
  const { notify } = useNotifications();

  async function completeLesson() {
    const response = await fetch("/api/student/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lessonId: 3 })
    });
    const result = await response.json();

    if (!response.ok) {
      notify(result.error ?? "Progress gagal diperbarui.", "error");
      return;
    }

    notify("Lesson selesai. Progress kursus diperbarui.", "success");
  }

  return (
    <button className="button button--primary" onClick={completeLesson} type="button">
      <CheckCircle2 size={18} />
      Tandai Selesai
    </button>
  );
}
