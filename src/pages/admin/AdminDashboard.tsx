import { LayoutDashboard } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminDashboard() {
  const { adminUser } = useAdminAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back{adminUser?.name ? `, ${adminUser.name}` : ""}.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center gap-2 space-y-0 pb-2">
            <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">—</p>
            <CardDescription className="mt-1">Metrics will appear here</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
