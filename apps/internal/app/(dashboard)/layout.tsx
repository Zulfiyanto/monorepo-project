import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions, isAdmin } from "@repo/auth";
import { ROUTES } from "@repo/utils";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  if (!isAdmin(session.user)) {
    redirect(ROUTES.AUTH.LOGIN);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header user={session.user} />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">{children}</main>
      </div>
    </div>
  );
}
