"use client";

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@repo/auth";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label, useToast } from "@repo/ui";
import { ROUTES } from "@repo/utils";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  // Redirect jika sudah login
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push(ROUTES.INTERNAL.DASHBOARD);
    }
  }, [status, session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Error",
          description: "Email atau password salah",
          variant: "destructive",
        });
      } else {
        // Cek role user setelah login
        if (data.email.includes("admin")) {
          // Admin tetap di internal
          toast({
            title: "Berhasil",
            description: "Login berhasil sebagai Admin",
          });
          router.push(ROUTES.INTERNAL.DASHBOARD);
          router.refresh();
        } else {
          // User biasa - Redirect ke External dengan auto-login
          toast({
            title: "Berhasil",
            description: "Redirect ke halaman client...",
          });

          // Encode credentials untuk auto-login di External
          const encodedEmail = encodeURIComponent(data.email);
          const encodedPassword = encodeURIComponent(data.password);

          // Redirect ke External app dengan credentials
          const externalUrl = process.env.NEXT_PUBLIC_EXTERNAL_URL || "http://localhost:3000";
          window.location.href = `${externalUrl}/auto-login?email=${encodedEmail}&password=${encodedPassword}`;
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading saat cek session
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Jangan render form jika sedang redirect
  if (status === "authenticated") {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Masukkan email dan password untuk mengakses dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                disabled={isLoading}
              />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo: gunakan email yang mengandung &quot;admin&quot; untuk login sebagai admin</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
