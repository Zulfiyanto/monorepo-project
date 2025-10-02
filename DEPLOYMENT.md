# 🚀 Deployment Guide - Vercel

## 📋 Prerequisites

1. ✅ GitHub/GitLab repository dengan kode yang sudah di-push
2. ✅ Akun Vercel (https://vercel.com)
3. ✅ pnpm terinstall di local

## 🔧 Persiapan Sebelum Deploy

### 1. **Generate NEXTAUTH_SECRET untuk Production**

Jalankan command ini untuk generate secret yang aman:

```bash
# Untuk Internal App
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Untuk External App
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Simpan hasil generate ini, akan digunakan di environment variables Vercel.

### 2. **Push Code ke Git Repository**

```bash
# Stage semua perubahan
git add .

# Commit
git commit -m "feat: prepare for vercel deployment"

# Push ke remote
git push origin main
```

### 3. **Update Environment Variables**

File `.env.local` **TIDAK** akan ter-commit (ada di .gitignore).
Anda perlu set environment variables di Vercel dashboard.

## 📦 Deploy ke Vercel

### **Option 1: Deploy Internal App (Admin Dashboard)**

1. **Import Project di Vercel**
   - Buka https://vercel.com/new
   - Connect ke Git repository Anda
   - Select repository: `monorepo-project`

2. **Configure Project Settings:**
   ```
   Framework Preset: Next.js
   Root Directory: apps/internal
   Build Command: cd ../.. && pnpm build --filter=internal
   Output Directory: (leave default)
   Install Command: pnpm install
   ```

3. **Environment Variables** (Required):
   ```
   NEXTAUTH_URL=https://your-internal-app.vercel.app
   NEXTAUTH_SECRET=<generated-secret-for-internal>
   NEXT_PUBLIC_INTERNAL_URL=https://your-internal-app.vercel.app
   NEXT_PUBLIC_EXTERNAL_URL=https://your-external-app.vercel.app
   ```

4. **Deploy!** - Klik tombol "Deploy"

### **Option 2: Deploy External App (Client Dashboard)**

1. **Import Project di Vercel** (New Project)
   - Buka https://vercel.com/new
   - Connect ke Git repository yang sama
   - Select repository: `monorepo-project`

2. **Configure Project Settings:**
   ```
   Framework Preset: Next.js
   Root Directory: apps/external
   Build Command: cd ../.. && pnpm build --filter=external
   Output Directory: (leave default)
   Install Command: pnpm install
   ```

3. **Environment Variables** (Required):
   ```
   NEXTAUTH_URL=https://your-external-app.vercel.app
   NEXTAUTH_SECRET=<generated-secret-for-external>
   NEXT_PUBLIC_INTERNAL_URL=https://your-internal-app.vercel.app
   NEXT_PUBLIC_EXTERNAL_URL=https://your-external-app.vercel.app
   ```

4. **Deploy!** - Klik tombol "Deploy"

## ⚙️ Vercel Configuration Files

### **Untuk Internal App** - `apps/internal/vercel.json`

```json
{
  "buildCommand": "cd ../.. && pnpm build --filter=internal",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

### **Untuk External App** - `apps/external/vercel.json`

```json
{
  "buildCommand": "cd ../.. && pnpm build --filter=external",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```

## 🔒 Production Security - PENTING!

### ⚠️ **URL Credential Passing HARUS Diganti!**

Current implementation menggunakan URL parameters untuk pass credentials:
```typescript
window.location.href = `${externalUrl}/auto-login?email=${email}&password=${password}`;
```

**JANGAN deploy ini ke production!** Ini hanya untuk development.

### ✅ **Production Solutions:**

#### **Option 1: JWT Token (Recommended)**

```typescript
// Internal: Generate JWT
const token = jwt.sign(
  { email: user.email, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: '5m' }
);
window.location.href = `${externalUrl}/verify?token=${token}`;

// External: Verify & Login
const decoded = jwt.verify(token, process.env.JWT_SECRET);
// Create session from decoded data
```

#### **Option 2: Shared Database Session**

```typescript
// packages/auth/src/config.ts
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" }, // Shared session!
  // ...
};
```

#### **Option 3: SSO Provider**

Use Auth0, Clerk, atau NextAuth dengan shared database:
```typescript
providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
]
```

## 📊 Post-Deployment Checklist

- [ ] Internal app accessible di production URL
- [ ] External app accessible di production URL
- [ ] Environment variables sudah benar
- [ ] Login flow berfungsi (admin → internal, user → external)
- [ ] Auto-redirect berfungsi
- [ ] Logout redirect ke URL yang benar
- [ ] **CRITICAL**: Replace URL credential passing dengan JWT/OAuth

## 🔄 CI/CD - Auto Deploy

Vercel otomatis deploy ketika ada push ke branch:
- `main` branch → Production deployment
- Other branches → Preview deployment

## 📝 Environment Variables Reference

| Variable | Internal App | External App | Description |
|----------|-------------|--------------|-------------|
| `NEXTAUTH_URL` | ✅ Required | ✅ Required | Full URL of the app |
| `NEXTAUTH_SECRET` | ✅ Required | ✅ Required | Random secret 32+ chars |
| `NEXT_PUBLIC_INTERNAL_URL` | ✅ Required | ✅ Required | Internal app URL |
| `NEXT_PUBLIC_EXTERNAL_URL` | ✅ Required | ✅ Required | External app URL |
| `DATABASE_URL` | Optional | Optional | For production DB |

## 🐛 Troubleshooting

### Build Fails
- Check build command: `cd ../.. && pnpm build --filter=<app-name>`
- Ensure pnpm workspace configuration is correct
- Check Turborepo cache settings

### Environment Variables Not Working
- Ensure `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding new env vars
- Check for typos in variable names

### Authentication Issues
- Verify `NEXTAUTH_URL` matches actual deployment URL
- Ensure both apps use different `NEXTAUTH_SECRET`
- Check redirect URLs match deployment URLs

## 🎯 Production URLs Example

```
Internal: https://admin-myapp.vercel.app
External: https://client-myapp.vercel.app
```

Update all environment variables accordingly!

---

**Ready to deploy! 🚀**
