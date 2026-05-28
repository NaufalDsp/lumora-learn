# Rekomendasi Tech Stack Lumora Learn

## Frontend

- Framework: Next.js App Router
- Language: TypeScript
- UI: React components + CSS custom design tokens
- Icons: lucide-react
- State awal: server components untuk halaman publik, client components hanya saat butuh interaksi
- Form lanjutan: React Hook Form + Zod
- Data fetching lanjutan: TanStack Query untuk dashboard yang banyak mutasi

Alasan: Next.js cocok untuk halaman publik yang butuh SEO seperti landing, katalog kursus, dan detail kursus, sekaligus tetap bisa berkembang ke dashboard role-based dalam satu codebase.

## Backend

- Runtime backend: Next.js Route Handlers
- Database: SQLite untuk MVP lokal
- ORM: Drizzle ORM
- Auth: Better Auth dengan Drizzle adapter
- File storage: S3-compatible storage seperti AWS S3, Cloudflare R2, atau Supabase Storage
- Video: Mux, Cloudflare Stream, atau storage privat dengan signed URL untuk MVP terbatas
- Email: Resend atau Amazon SES
- Queue lanjutan: BullMQ + Redis jika nanti ada email massal, processing video, dan activity event

Alasan: Next.js Route Handlers cukup efisien untuk MVP karena frontend dan backend berada dalam satu codebase. Better Auth menangani autentikasi email/password, SQLite menjaga setup lokal sederhana, dan Drizzle memberi schema TypeScript yang rapi untuk domain course, lesson, quiz, progress, dan activity log.

## Struktur Awal Frontend

- `app/(public)` untuk route guest/public
- `src/features/public` untuk screen publik
- `src/components` untuk komponen reusable
- `src/domain` untuk tipe dan mock data domain
- `src/config` untuk konfigurasi aplikasi
- `src/server` untuk auth, database, repositories, services, dan helper response backend

## Fase Implementasi

1. Public screens: landing, catalog, course detail, login, register, forgot password.
2. Student area: dashboard, my learning, learning room, quiz, quiz result, profile.
3. Instructor area: dashboard, my courses, course builder, lesson editor, quiz builder.
4. Admin area: dashboard, user management, course moderation, category management, reports.
5. Backend API, Better Auth, SQLite, Drizzle migration, dan RBAC.
6. Storage, video streaming, email, dan activity log.
