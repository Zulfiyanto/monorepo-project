"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/utils";
import { ROUTES } from "@repo/utils";
import { LayoutDashboard, Users, Settings } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: ROUTES.INTERNAL.DASHBOARD, icon: LayoutDashboard },
  { name: "Users", href: ROUTES.INTERNAL.USERS, icon: Users },
  { name: "Settings", href: ROUTES.INTERNAL.SETTINGS, icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-64 flex-col border-r bg-white">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
