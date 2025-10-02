import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { Users, Settings, Activity, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      description: "+12% dari bulan lalu",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Active Sessions",
      value: "1,234",
      description: "+5% dari kemarin",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Settings Changed",
      value: "42",
      description: "Minggu ini",
      icon: Settings,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Growth Rate",
      value: "23.5%",
      description: "Pertumbuhan bulanan",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Selamat datang kembali di admin dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Aktivitas terbaru dalam sistem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">User activity {i}</p>
                    <p className="text-xs text-muted-foreground">{i} menit yang lalu</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Status sistem saat ini</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "API Server", status: "Online", color: "bg-green-500" },
                { name: "Database", status: "Online", color: "bg-green-500" },
                { name: "Cache Server", status: "Online", color: "bg-green-500" },
                { name: "Email Service", status: "Online", color: "bg-green-500" },
              ].map((service) => (
                <div key={service.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`h-2 w-2 rounded-full ${service.color}`} />
                    <span className="text-sm font-medium">{service.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{service.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
