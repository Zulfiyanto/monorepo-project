# Single Login Flow - Unified Authentication

## 🎯 Konsep

**Login hanya di satu tempat (Internal - Port 3001)**, kemudian otomatis terhubung ke External app.

## 🔐 Authentication Flow

### Flow 1: Admin Login
```
1. Buka → http://localhost:3001/login
2. Login → admin@example.com / password123
3. ✅ Redirect ke → http://localhost:3001/dashboard (Admin Dashboard)
4. Session tersimpan untuk Internal app
```

### Flow 2: User Login (Single Login)
```
1. Buka → http://localhost:3001/login
2. Login → user@example.com / password123
3. 🔄 Auto redirect ke → http://localhost:3000/auto-login?email=...&password=...
4. 🔐 Auto login di External app
5. ✅ Redirect ke → http://localhost:3000/client (Client Dashboard)
6. Session tersimpan untuk External app
```

### Flow 3: Akses External Tanpa Login
```
1. Buka → http://localhost:3000
2. Belum ada session
3. 🔄 Redirect ke → http://localhost:3001/login
4. Login di sana, kemudian flow seperti Flow 2
```

## 📋 Struktur

### Internal App (Port 3001)
- ✅ Login Page (`/login`) - **SATU-SATUNYA tempat login**
- ✅ Admin Dashboard (`/dashboard`)
- ✅ User Management
- ✅ Settings

### External App (Port 3000)
- ❌ **TIDAK ADA** Login Page (dihapus)
- ✅ Auto Login Page (`/auto-login`) - Untuk receive credentials
- ✅ Client Dashboard (`/client`)
- ✅ Root page - Redirect ke Internal jika belum login

## 🔧 Cara Kerja Auto-Login

### 1. Internal Login (User biasa)
```typescript
// apps/internal/app/(auth)/login/page.tsx
if (!data.email.includes("admin")) {
  // Encode credentials
  const encodedEmail = encodeURIComponent(data.email);
  const encodedPassword = encodeURIComponent(data.password);

  // Redirect dengan credentials
  window.location.href = `http://localhost:3000/auto-login?email=${encodedEmail}&password=${encodedPassword}`;
}
```

### 2. External Auto-Login
```typescript
// apps/external/app/auto-login/page.tsx
const email = searchParams.get("email");
const password = searchParams.get("password");

// Auto sign in
signIn("credentials", {
  email: decodeURIComponent(email),
  password: decodeURIComponent(password),
  redirect: false,
}).then((result) => {
  if (result?.ok) {
    router.push("/client"); // Success
  }
});
```

## 🚀 Testing

### Test Admin Flow
```bash
# Browser:
1. http://localhost:3001/login
2. Email: admin@example.com
3. Password: password123
4. ✅ Should stay at: http://localhost:3001/dashboard
```

### Test User Flow (Single Login)
```bash
# Browser:
1. http://localhost:3001/login
2. Email: user@example.com
3. Password: password123
4. 🔄 Auto redirect to: http://localhost:3000/auto-login?...
5. 🔐 Auto login happens
6. ✅ Final page: http://localhost:3000/client
```

### Test Direct External Access
```bash
# Browser:
1. http://localhost:3000
2. 🔄 Redirect to: http://localhost:3001/login
3. Login there
4. ✅ Auto return to External
```

## ⚠️ Security Notes

### Credential Passing via URL
- ✅ **Development Only** - Untuk testing & demo
- ❌ **JANGAN gunakan di production**

### Production Alternatives:
1. **Token-based:** Generate JWT token di Internal, pass ke External
2. **OAuth Flow:** Gunakan OAuth 2.0 authorization code flow
3. **SSO Provider:** Auth0, Clerk, NextAuth dengan database adapter
4. **Shared Session Store:** Redis/Database untuk session sharing

## 🔒 Production Implementation (Recommended)

### Option 1: Shared Session with Database
```typescript
// packages/auth/src/config.ts
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" }, // Shared session
  // ...
};
```

### Option 2: JWT Token
```typescript
// Internal: Generate token
const token = jwt.sign({ email, role }, secret);
window.location.href = `http://localhost:3000/verify?token=${token}`;

// External: Verify token
const decoded = jwt.verify(token, secret);
// Create session from decoded data
```

### Option 3: OAuth/SSO
```typescript
// Use external provider
providers: [
  GoogleProvider({ ... }),
  // atau Auth0, Clerk, etc
]
```

## 📁 Files Changed

### Removed:
- ❌ `apps/external/app/(auth)/login/page.tsx`

### Added:
- ✅ `apps/external/app/auto-login/page.tsx`

### Modified:
- ✅ `apps/internal/app/(auth)/login/page.tsx` - Auto-login logic
- ✅ `apps/external/app/page.tsx` - Redirect to Internal login
- ✅ `apps/external/app/(client)/page.tsx` - Check session

## ✅ Benefits

1. **Single Entry Point** - User hanya perlu tau 1 URL login
2. **Better UX** - Tidak perlu login 2 kali
3. **Centralized Auth** - Semua autentikasi di satu tempat
4. **Easy Management** - Update auth logic di satu tempat

## 🎉 Summary

**User Journey:**
```
http://localhost:3001/login
  → Login once
  → Auto redirected & logged in to External
  → ✅ Access both apps with single login!
```

---

**Ready to use! 🚀**
