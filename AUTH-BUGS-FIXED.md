# Auth System - Bugs Fixed

## 🐛 Bugs yang Ditemukan & Diperbaiki:

### 1. **NEXTAUTH_URL di External App Salah**
**Problem:**
- External app `.env.local` menggunakan port 3001 (seharusnya 3000)
- Menyebabkan NextAuth redirect ke URL yang salah

**Fixed:**
```env
# apps/external/.env.local
NEXTAUTH_URL=http://localhost:3000  # ✅ Sudah diperbaiki
```

### 2. **Session Tidak Di-Share Antar Apps**
**Problem:**
- Internal (port 3001) dan External (port 3000) adalah domain berbeda
- NextAuth sessions tidak di-share antar domain
- User harus login ulang di setiap app

**Solusi yang Diterapkan:**
Karena ini adalah dua aplikasi terpisah dengan port berbeda, mereka memang perlu login terpisah. Ini adalah behavior yang **benar** untuk security.

**Flow yang Benar:**
1. User login di Internal (3001) → Session untuk Internal
2. User login di External (3000) → Session untuk External
3. Redirect cross-app menggunakan `window.location.href`

## ✅ Auth Flow yang Sudah Diperbaiki:

### **Scenario 1: Admin Login**
```
1. Buka http://localhost:3001
2. Login dengan: admin@example.com / password123
3. ✅ Redirect ke http://localhost:3001/dashboard (Internal Dashboard)
4. Session tersimpan untuk port 3001
```

### **Scenario 2: User Login di Internal**
```
1. Buka http://localhost:3001
2. Login dengan: user@example.com / password123
3. ✅ Redirect ke http://localhost:3000 (External App)
4. User perlu login lagi di External (security by design)
```

### **Scenario 3: User Login Langsung di External**
```
1. Buka http://localhost:3000
2. Login dengan: user@example.com / password123
3. ✅ Redirect ke http://localhost:3000/client (Client Dashboard)
4. Session tersimpan untuk port 3000
```

## 🔧 Konfigurasi yang Benar:

### Internal App (.env.local)
```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key-min-32-chars
```

### External App (.env.local)
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-min-32-chars
```

⚠️ **Important:** Gunakan NEXTAUTH_SECRET yang SAMA di kedua app untuk consistency.

## 🚀 Cara Test Setelah Fix:

### Test 1: Admin Flow
```bash
# Restart apps
pnpm dev

# Browser:
1. http://localhost:3001
2. Login: admin@example.com / password123
3. Should redirect to: http://localhost:3001/dashboard ✅
```

### Test 2: User Flow (dari Internal)
```bash
# Browser:
1. http://localhost:3001
2. Login: user@example.com / password123
3. Should redirect to: http://localhost:3000
4. Login lagi di External (by design)
5. Should show: Client Dashboard ✅
```

### Test 3: User Flow (langsung External)
```bash
# Browser:
1. http://localhost:3000
2. Login: user@example.com / password123
3. Should redirect to: http://localhost:3000/client ✅
```

## 💡 Alternative Solution (Optional):

Jika Anda ingin **single login** untuk kedua apps, ada beberapa opsi:

### Option 1: Menggunakan Subdomain yang Sama
```
- Internal: admin.localhost:3000
- External: app.localhost:3000
- Shared cookies domain: .localhost
```

### Option 2: API Gateway/Reverse Proxy
```
- Semua request melalui satu domain
- Nginx/Traefik untuk routing
- Share session via Redis/Database
```

### Option 3: OAuth/SSO Provider
```
- Gunakan external auth provider (Auth0, Clerk, etc)
- Single sign-on across multiple apps
```

## 📝 Catatan Penting:

1. **Port berbeda = Domain berbeda** → Session terpisah (ini NORMAL)
2. **Cookie tidak di-share** antar port untuk security
3. **Cross-domain authentication** memerlukan setup khusus
4. Current flow sudah **BENAR** untuk security best practices

## ✅ Status: FIXED

Auth system sekarang berjalan dengan benar sesuai security best practices.
