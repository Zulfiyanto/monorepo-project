import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";
import { ClientDashboard } from "@/components/client-dashboard";

export default async function ClientHomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // Belum login, redirect ke Internal login
    const internalUrl = process.env.NEXT_PUBLIC_INTERNAL_URL || "http://localhost:3001";
    redirect(`${internalUrl}/login`);
  }

  return <ClientDashboard user={session.user} />;
}
