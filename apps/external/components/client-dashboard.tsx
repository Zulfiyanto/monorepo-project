"use client";

import { signOut } from "next-auth/react";
import type { User } from "@repo/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Separator,
} from "@repo/ui";
import {
  Bell,
  FileText,
  Heart,
  LogOut,
  Mail,
  MapPin,
  Phone,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  TrendingUp,
  User as UserIcon,
  Zap,
} from "lucide-react";

interface ClientDashboardProps {
  user: User;
}

export function ClientDashboard({ user }: ClientDashboardProps) {
  const initials =
    user.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                MyApp Client
              </h1>
              <p className="text-xs text-muted-foreground">Dashboard</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                3
              </span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 ring-2 ring-violet-500/20">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    const internalUrl = process.env.NEXT_PUBLIC_INTERNAL_URL || "http://localhost:3001";
                    signOut({ callbackUrl: `${internalUrl}/login` });
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Welcome Section */}
        <div className="mb-8 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-8 text-white shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="mb-2 text-3xl font-bold">Welcome back, {user.name}! 👋</h2>
              <p className="text-violet-100">
                Great to see you again. Here's what's happening with your account today.
              </p>
            </div>
            <div className="hidden rounded-full bg-white/20 p-6 backdrop-blur-sm md:block">
              <Sparkles className="h-12 w-12" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-lg transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Total Orders</span>
                <ShoppingBag className="h-5 w-5 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-blue-100">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow-lg transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Activity</span>
                <TrendingUp className="h-5 w-5 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">89%</div>
              <p className="text-sm text-emerald-100">Engagement score</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Rewards</span>
                <Star className="h-5 w-5 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,250</div>
              <p className="text-sm text-orange-100">Points available</p>
            </CardContent>
          </Card>

          <Card className="border-none bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-lg transition-all hover:scale-105">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <span>Favorites</span>
                <Heart className="h-5 w-5 opacity-80" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <p className="text-sm text-pink-100">Saved items</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="shadow-lg transition-all hover:shadow-xl lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-violet-500" />
                Your Profile
              </CardTitle>
              <CardDescription>Personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <Avatar className="h-24 w-24 ring-4 ring-violet-500/20">
                  <AvatarImage src={user.image} />
                  <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-2xl text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+62 812 3456 7890</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Jakarta, Indonesia</p>
                  </div>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6 lg:col-span-2">
            {/* Quick Actions */}
            <Card className="shadow-lg transition-all hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-violet-500" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Frequently used features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-2 p-6 hover:border-violet-500 hover:bg-violet-50"
                  >
                    <FileText className="h-8 w-8 text-violet-500" />
                    <span className="font-medium">Documents</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-2 p-6 hover:border-fuchsia-500 hover:bg-fuchsia-50"
                  >
                    <ShoppingBag className="h-8 w-8 text-fuchsia-500" />
                    <span className="font-medium">Orders</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto flex-col gap-2 p-6 hover:border-violet-500 hover:bg-violet-50"
                  >
                    <Settings className="h-8 w-8 text-violet-500" />
                    <span className="font-medium">Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="shadow-lg transition-all hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-violet-500" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      action: "Completed order #1234",
                      time: "2 hours ago",
                      icon: ShoppingBag,
                      color: "text-blue-500",
                    },
                    {
                      action: "Updated profile information",
                      time: "5 hours ago",
                      icon: UserIcon,
                      color: "text-green-500",
                    },
                    {
                      action: "Added 3 items to favorites",
                      time: "1 day ago",
                      icon: Heart,
                      color: "text-pink-500",
                    },
                    {
                      action: "Redeemed 500 reward points",
                      time: "2 days ago",
                      icon: Star,
                      color: "text-yellow-500",
                    },
                  ].map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-lg p-3 hover:bg-violet-50"
                      >
                        <div className={`rounded-full bg-gray-100 p-2 ${activity.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
