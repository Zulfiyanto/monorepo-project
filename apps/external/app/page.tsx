import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@repo/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    // Sudah login, redirect ke client page
    redirect("/client");
  } else {
    // Belum login, redirect ke Internal login
    const internalUrl = process.env.NEXT_PUBLIC_INTERNAL_URL || "http://localhost:3001";
    redirect(`${internalUrl}/login`);
  }
}
