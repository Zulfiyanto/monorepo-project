# Setup Guide

## Langkah-langkah Setup Project

### 1. Install Dependencies

```bash
# Install pnpm jika belum ada
npm install -g pnpm

# Install semua dependencies
pnpm install
```

### 2. Setup Environment Variables

#### Internal App (Admin)
Buat file `apps/internal/.env.local`:
```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=ganti-dengan-secret-key-minimal-32-karakter-untuk-production
```

#### External App (Client)
Buat file `apps/external/.env.local`:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=ganti-dengan-secret-key-minimal-32-karakter-untuk-production
```

**Generate secret key:**
```bash
openssl rand -base64 32
```

### 3. Jalankan Development Server

#### Opsi 1: Jalankan Semua Apps (Recommended)
```bash
pnpm dev
```

Ini akan menjalankan:
- Internal app di `http://localhost:3001`
- External app di `http://localhost:3000`

#### Opsi 2: Jalankan Per App
```bash
# Internal app (Admin)
cd apps/internal
pnpm dev

# External app (Client)
cd apps/external
pnpm dev
```

### 4. Test Login

#### Admin Dashboard (Internal)
1. Buka `http://localhost:3001`
2. Otomatis redirect ke `/login`
3. Login dengan:
   - Email: `admin@example.com` (atau email apapun yang mengandung "admin")
   - Password: `password123` (minimal 8 karakter)
4. Akan redirect ke dashboard admin

#### Client App (External)
1. Buka `http://localhost:3000`
2. Login dengan:
   - Email: `user@example.com` (email tanpa kata "admin")
   - Password: `password123`
3. User dengan role "user" akan diarahkan ke halaman client

## Build untuk Production

### Build Semua Apps
```bash
pnpm build
```

### Build Specific App
```bash
# Build internal app only
pnpm --filter=internal build

# Build external app only
pnpm --filter=external build
```

### Start Production Server
```bash
# Internal app
cd apps/internal
pnpm start

# External app
cd apps/external
pnpm start
```

## Troubleshooting

### Error: "Cannot find module '@repo/ui'"
```bash
# Build ulang shared packages
pnpm install
pnpm --filter=@repo/ui build
pnpm --filter=@repo/auth build
pnpm --filter=@repo/utils build
```

### Error: Port sudah digunakan
Ganti port di `package.json` masing-masing app:
```json
{
  "scripts": {
    "dev": "next dev --port 3002"
  }
}
```

### Cache Issues
Hapus cache dan rebuild:
```bash
pnpm clean
rm -rf node_modules
rm -rf .turbo
pnpm install
pnpm dev
```

## Development Workflow

### 1. Menambah UI Component Baru

```bash
cd packages/ui
# Tambahkan component di src/components/ui/
# Export dari src/index.ts
```

### 2. Menambah Utility Function

```bash
cd packages/utils
# Tambahkan function di src/
# Export dari src/index.ts
```

### 3. Menggunakan Shared Package di App

```typescript
// Di apps/internal atau apps/external
import { Button, Card } from "@repo/ui";
import { cn, ROUTES } from "@repo/utils";
import { isAdmin } from "@repo/auth";
```

### 4. Linting & Type Checking

```bash
# Lint semua
pnpm lint

# Type check semua
pnpm type-check

# Format code
pnpm format
```

## Project Structure

```
monorepo-project/
├── apps/
│   ├── internal/         # Admin dashboard (Port 3001)
│   │   ├── app/          # Next.js App Router
│   │   │   ├── (auth)/   # Auth pages (login, register)
│   │   │   ├── (dashboard)/  # Protected dashboard pages
│   │   │   └── api/      # API routes
│   │   ├── components/   # App-specific components
│   │   └── public/       # Static assets
│   │
│   └── external/         # Client app (Port 3000)
│       └── [Similar structure]
│
├── packages/
│   ├── ui/              # Shared UI components
│   │   ├── src/
│   │   │   ├── components/ui/  # shadcn/ui components
│   │   │   └── styles/         # Global styles
│   │   └── package.json
│   │
│   ├── auth/            # Shared auth logic
│   │   ├── src/
│   │   │   ├── config.ts       # NextAuth config
│   │   │   ├── types.ts        # Auth types
│   │   │   └── schemas.ts      # Zod schemas
│   │   └── package.json
│   │
│   ├── utils/           # Shared utilities
│   │   ├── src/
│   │   │   ├── cn.ts           # Tailwind utility
│   │   │   └── constants.ts    # App constants
│   │   └── package.json
│   │
│   ├── typescript-config/   # Shared tsconfig
│   └── eslint-config/       # Shared eslint config
│
├── turbo.json           # Turborepo config
├── package.json         # Root package.json
├── pnpm-workspace.yaml  # pnpm workspace config
└── README.md
```

## Next Steps

1. **Kustomisasi UI**: Edit theme di `packages/ui/src/styles/globals.css`
2. **Tambah Auth Provider**: Edit `packages/auth/src/config.ts`
3. **Tambah Database**: Integrate Prisma atau database lainnya
4. **Setup CI/CD**: Tambahkan GitHub Actions atau GitLab CI
5. **Deploy**: Deploy ke Vercel, Railway, atau platform lainnya

## Resources

- [Turborepo Docs](https://turbo.build/repo/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com)

---

**Happy Coding! 🚀**
