# MonoRepo Project

MonoRepo project dengan Turborepo, Next.js, dan shadcn/ui yang terdiri dari dua aplikasi:
- **Internal (Admin)**: Dashboard admin untuk mengelola aplikasi (Port 3001)
- **External (Client)**: Aplikasi client untuk end-user (Port 3000)

## 🏗️ Arsitektur

```
monorepo-project/
├── apps/
│   ├── internal/          # Admin Dashboard (Next.js)
│   │   ├── app/
│   │   │   ├── (auth)/
│   │   │   │   └── login/
│   │   │   ├── (dashboard)/
│   │   │   │   ├── dashboard/
│   │   │   │   ├── users/
│   │   │   │   └── settings/
│   │   │   └── api/auth/[...nextauth]/
│   │   └── components/
│   │       └── layout/
│   └── external/          # Client App (Next.js)
│
├── packages/
│   ├── ui/               # Shared UI components (shadcn/ui)
│   ├── auth/             # Shared authentication logic
│   ├── utils/            # Shared utilities & constants
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── eslint-config/    # Shared ESLint configurations
│
├── package.json          # Root package.json dengan workspaces
├── turbo.json           # Turborepo configuration
└── pnpm-workspace.yaml  # pnpm workspace configuration
```

## ✨ Features

### Shared Packages
- **@repo/ui**: Komponen UI dengan shadcn/ui (Button, Card, Input, dll)
- **@repo/auth**: Authentication dengan NextAuth.js (unified login)
- **@repo/utils**: Utilities dan constants (cn, ROUTES, USER_ROLES)
- **@repo/typescript-config**: Shared TypeScript configs
- **@repo/eslint-config**: Shared ESLint configs

### Internal App (Admin)
- ✅ Login page dengan validation
- ✅ Dashboard dengan statistics
- ✅ User management
- ✅ Settings page
- ✅ Sidebar navigation
- ✅ Protected routes (Admin only)

### External App (Client)
- ✅ Structure siap untuk dikembangkan
- ✅ Shared authentication
- ✅ Shared UI components

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Installation

1. Install pnpm (jika belum):
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

3. Setup environment variables:

**Internal App** (`apps/internal/.env.local`):
```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars-change-this-in-production
```

**External App** (`apps/external/.env.local`):
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-min-32-chars-change-this-in-production
```

### Development

Jalankan semua apps secara parallel:
```bash
pnpm dev
```

Atau jalankan app tertentu:
```bash
# Internal app only (Port 3001)
cd apps/internal
pnpm dev

# External app only (Port 3000)
cd apps/external
pnpm dev
```

### Build

Build semua apps:
```bash
pnpm build
```

Build app tertentu:
```bash
turbo run build --filter=internal
turbo run build --filter=external
```

## 📝 Scripts

```bash
pnpm dev          # Run all apps in development mode
pnpm build        # Build all apps
pnpm lint         # Lint all packages
pnpm format       # Format code with Prettier
pnpm type-check   # Type check all packages
pnpm clean        # Clean all build artifacts
```

## 🔐 Authentication

Aplikasi menggunakan NextAuth.js dengan shared configuration.

### Demo Login (Development)
- Email dengan kata "admin": Login sebagai **Admin** → Redirect ke Internal app
- Email tanpa "admin": Login sebagai **User** → Redirect ke External app

Contoh:
- `admin@example.com` → Admin role
- `user@example.com` → User role

### Kustomisasi Auth

Edit `packages/auth/src/config.ts` untuk mengubah provider atau logic authentication.

## 🎨 UI Components

Semua komponen UI di-share melalui `@repo/ui` package yang menggunakan shadcn/ui.

### Available Components
- Button
- Card
- Input
- Label
- Avatar
- Dropdown Menu
- Separator
- Tabs
- Toast/Toaster

### Styling
- Tailwind CSS dengan shared configuration
- CSS Variables untuk theming
- Dark mode ready

### Menambah Component Baru

1. Tambahkan di `packages/ui/src/components/ui/`
2. Export dari `packages/ui/src/index.ts`
3. Komponen akan otomatis tersedia di semua apps

## 📦 Menambah Package Baru

1. Buat folder di `packages/`
2. Tambahkan `package.json`:
```json
{
  "name": "@repo/your-package",
  "version": "0.0.0",
  "private": true,
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

3. Import di app:
```typescript
import { something } from "@repo/your-package";
```

## 🔧 Turborepo Benefits

### Caching
Turborepo akan cache hasil build. Jika tidak ada perubahan, build akan instant.

### Parallelization
Semua tasks berjalan parallel untuk maximum performance.

### Remote Caching
Setup remote caching untuk share cache antar developer:
```bash
npx turbo login
npx turbo link
```

## 📁 Project Structure Details

### Apps
- **internal**: Admin dashboard (React 18 + Next.js 14 + Tailwind CSS)
- **external**: Client app (React 18 + Next.js 14 + Tailwind CSS)

### Shared Packages
- **@repo/ui**: React components dengan TypeScript
- **@repo/auth**: Authentication utilities
- **@repo/utils**: Helper functions dan constants
- **@repo/typescript-config**: Shared tsconfig
- **@repo/eslint-config**: Shared eslint config

## 🎯 Best Practices

1. **Shared Code**: Taruh logic yang bisa di-reuse di packages
2. **Type Safety**: Gunakan TypeScript di semua file
3. **Component Reuse**: Buat komponen UI di @repo/ui
4. **Constants**: Define constants di @repo/utils
5. **Consistent Styling**: Gunakan Tailwind utilities

## 🔒 Environment Variables

Jangan commit file `.env.local` ke git. Gunakan `.env.example` sebagai template.

## 📚 Tech Stack

- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Framework**: Next.js 14 (App Router)
- **UI Library**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **Form**: React Hook Form + Zod
- **TypeScript**: Full type safety
- **Linting**: ESLint + Prettier

## 🚢 Deployment

### Vercel (Recommended)
1. Connect your repository
2. Import project
3. Set framework preset to "Next.js"
4. Set root directory to:
   - `apps/internal` untuk admin
   - `apps/external` untuk client
5. Add environment variables
6. Deploy

### Docker
Dokumentasi Docker akan ditambahkan.

## 🤝 Contributing

1. Create branch dari `main`
2. Make changes
3. Run tests: `pnpm lint` & `pnpm type-check`
4. Create pull request

## 📄 License

MIT

---

**Happy Coding! 🚀**
