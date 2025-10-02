import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Kelola pengaturan aplikasi</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Pengaturan umum aplikasi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">App Name</h3>
                <p className="text-sm text-muted-foreground">MonoRepo App</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Version</h3>
                <p className="text-sm text-muted-foreground">1.0.0</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Pengaturan keamanan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Disabled</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Session Timeout</h3>
                <p className="text-sm text-muted-foreground">30 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
