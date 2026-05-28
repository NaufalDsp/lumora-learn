import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { getCurrentSession } from "@/src/server/auth/session";
import { badRequest, created, unauthorized } from "@/src/server/http/responses";
import { hasRole } from "@/src/server/services/access-control";

const allowedTypes = new Set([
  "application/pdf",
  "application/zip",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "video/mp4",
  "video/webm",
  "image/png",
  "image/jpeg"
]);

export async function POST(request: Request) {
  const session = await getCurrentSession();
  if (!session || !hasRole(session.user.role, ["admin", "instructor"])) return unauthorized();

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return badRequest("File tidak ditemukan");
  }

  if (!allowedTypes.has(file.type)) {
    return badRequest("Tipe file tidak didukung");
  }

  if (file.size > 100 * 1024 * 1024) {
    return badRequest("Ukuran file maksimal 100MB");
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
  const fileName = `${Date.now()}-${safeName}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, fileName), bytes);

  return created({
    fileName: file.name,
    fileUrl: `/uploads/${fileName}`,
    fileType: file.type,
    fileSize: file.size
  });
}
