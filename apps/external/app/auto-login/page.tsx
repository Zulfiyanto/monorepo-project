"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function AutoLoginPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const email = searchParams.get("email");
    const password = searchParams.get("password");

    if (email && password) {
      // Validasi format email sederhana
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const decodedEmail = decodeURIComponent(email);

      if (!emailRegex.test(decodedEmail)) {
        setError("Invalid email format");
        setTimeout(() => {
          window.location.href = process.env.NEXT_PUBLIC_INTERNAL_URL || "http://localhost:3001/login";
        }, 2000);
        return;
      }

      // Auto login dengan credentials dari URL
      signIn("credentials", {
        email: decodedEmail,
        password: decodeURIComponent(password),
        redirect: false,
      })
        .then((result) => {
          if (result?.ok) {
            // Login berhasil, redirect ke client page
            router.push("/client");
          } else {
            // Login gagal, tampilkan error
            setError(result?.error || "Authentication failed");
            setTimeout(() => {
              window.location.href = process.env.NEXT_PUBLIC_INTERNAL_URL || "http://localhost:3001/login";
            }, 2000);
          }
        })
        .catch((err) => {
          setError("An unexpected error occurred");
          console.error("Auto-login error:", err);
          setTimeout(() => {
            window.location.href = process.env.NEXT_PUBLIC_INTERNAL_URL || "http://localhost:3001/login";
          }, 2000);
        });
    } else {
      // Tidak ada credentials, redirect ke internal login
      setError("Missing credentials");
      setTimeout(() => {
        window.location.href = process.env.NEXT_PUBLIC_INTERNAL_URL || "http://localhost:3001/login";
      }, 1500);
    }
  }, [searchParams, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      <div className="text-center space-y-4">
        {error ? (
          <>
            <div className="flex justify-center">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-red-600">Authentication Failed</h2>
              <p className="text-muted-foreground mt-2">{error}</p>
              <p className="text-sm text-muted-foreground mt-1">Redirecting to login...</p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet-500 border-t-transparent"></div>
            </div>
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                Logging you in...
              </h2>
              <p className="text-muted-foreground mt-2">Please wait a moment</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
