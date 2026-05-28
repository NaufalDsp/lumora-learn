"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import { useNotifications } from "@/src/components/notifications/NotificationProvider";

export function UploadField() {
  const { notify } = useNotifications();
  const [isPending, setIsPending] = useState(false);

  async function handleUpload(file?: File) {
    if (!file) return;
    setIsPending(true);
    const formData = new FormData();
    formData.set("file", file);
    const response = await fetch("/api/uploads", {
      method: "POST",
      body: formData
    });
    const result = await response.json();
    setIsPending(false);

    if (!response.ok) {
      notify(result.error ?? "Upload gagal.", "error");
      return;
    }

    notify(`Upload berhasil: ${result.data.fileName}`, "success");
  }

  return (
    <label className="upload-field">
      <Upload size={18} />
      <span>{isPending ? "Uploading..." : "Upload file/video"}</span>
      <input
        accept=".pdf,.zip,.pptx,.docx,.xlsx,.mp4,.webm,.png,.jpg,.jpeg"
        onChange={(event) => handleUpload(event.target.files?.[0])}
        type="file"
      />
    </label>
  );
}
