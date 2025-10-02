# Quick Start Guide - MonoRepo Auth System

## 🚀 Setup & Run

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Environment Variables

**Internal App:** `apps/internal/.env.local`
```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-min-32-chars-change-this
```

**External App:** `apps/external/.env.local`
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-min-32-chars-change-this
```

### 3. Run Development Server
```bash
pnpm dev
```

## 🔐 Login Credentials (Demo)

### Admin Login (Internal Dashboard)
```
Email: admin@example.com
Password: password123
URL: http://localhost:3001
```

### User Login (Client Dashboard)
```
Email: user@example.com
Password: password123
URL: http://localhost:3000
```

## 📋 Auth Flow

### Flow 1: Admin Login
1. Buka → http://localhost:3001
2. Login dengan email yang **mengandung "admin"**
3. ✅ Redirect ke → http://localhost:3001/dashboard (Admin Dashboard)

### Flow 2: User Login (dari Internal)
1. Buka → http://localhost:3001
2. Login dengan email **tanpa kata "admin"**
3. ✅ Redirect ke → http://localhost:3000 (External Client)
4. Login lagi di External (required karena beda domain)

### Flow 3: User Login (langsung External)
1. Buka → http://localhost:3000
2. Login dengan email apapun
3. ✅ Redirect ke → http://localhost:3000/client (Client Dashboard)

## 🎯 Testing Checklist

- [ ] Internal app berjalan di port 3001
- [ ] External app berjalan di port 3000
- [ ] Admin login → Dashboard admin
- [ ] User login di internal → Redirect ke external
- [ ] User login di external → Client dashboard
- [ ] Logout berfungsi di kedua app
- [ ] Protected routes terproteksi

## 📱 URLs

| App | URL | Description |
|-----|-----|-------------|
| Internal | http://localhost:3001 | Admin Dashboard |
| Internal Login | http://localhost:3001/login | Admin Login Page |
| External | http://localhost:3000 | Client App |
| External Login | http://localhost:3000/login | Client Login Page |

## 🔧 Troubleshooting

### Issue: "Module not found @repo/ui"
```bash
# Rebuild workspace
pnpm install
pnpm dev
```

### Issue: "Cannot find module next-auth"
```bash
pnpm add next-auth -w
pnpm dev
```

### Issue: Login tidak redirect
1. Check `.env.local` files
2. Pastikan NEXTAUTH_URL benar
3. Restart dev server: `pnpm dev`

### Issue: Session tidak persist
- Ini normal jika port berbeda
- Port 3001 dan 3000 adalah domain berbeda
- Masing-masing perlu login terpisah

## ✨ Features

### Internal (Admin) - Port 3001
- ✅ Admin Dashboard
- ✅ User Management
- ✅ Settings
- ✅ Sidebar Navigation
- ✅ Protected Routes

### External (Client) - Port 3000
- ✅ Modern UI/UX
- ✅ Client Dashboard
- ✅ Profile Card
- ✅ Stats Cards with Gradients
- ✅ Quick Actions
- ✅ Recent Activity

## 🎨 Tech Stack

- **Monorepo:** Turborepo
- **Framework:** Next.js 14
- **Auth:** NextAuth.js
- **UI:** shadcn/ui + Tailwind CSS
- **Package Manager:** pnpm

---

**Happy Coding! 🚀**
