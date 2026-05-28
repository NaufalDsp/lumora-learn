"use client";

import { useState } from "react";
import { useNotifications } from "@/src/components/notifications/NotificationProvider";

const answers = [
  { questionId: 1, optionId: 1, text: "Memecah UI menjadi shell, panel, dan komponen domain" },
  { questionId: 1, optionId: 2, text: "Menaruh semua state pada satu komponen global" },
  { questionId: 1, optionId: 3, text: "Membuat semua halaman sebagai modal" }
];

export function QuizAttemptClient() {
  const { notify } = useNotifications();
  const [selectedOptionId, setSelectedOptionId] = useState(1);
  const [isPending, setIsPending] = useState(false);

  async function submitQuiz() {
    setIsPending(true);
    const response = await fetch("/api/student/quiz-attempts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        quizId: 1,
        passingScore: 70,
        answers: [{ questionId: 1, optionId: selectedOptionId }]
      })
    });
    const result = await response.json();
    setIsPending(false);

    if (!response.ok) {
      notify(result.error ?? "Submit kuis gagal.", "error");
      return;
    }

    notify(`Kuis tersubmit. Skor kamu ${result.data.score}.`, "success");
  }

  return (
    <div className="quiz-card-large">
      <p>Apa pola terbaik untuk menjaga Learning Room mudah dikembangkan?</p>
      {answers.map((answer) => (
        <button
          className={selectedOptionId === answer.optionId ? "answer active" : "answer"}
          key={answer.optionId}
          onClick={() => setSelectedOptionId(answer.optionId)}
          type="button"
        >
          {answer.text}
        </button>
      ))}
      <button className="button button--primary" disabled={isPending} onClick={submitQuiz} type="button">
        {isPending ? "Mengirim..." : "Submit Kuis"}
      </button>
    </div>
  );
}
