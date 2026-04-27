import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/context/AdminAuthContext";

export default function AdminProfile() {
  const { adminUser } = useAdminAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Your admin account details.</p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Information from your login session.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex justify-between gap-4 border-b py-2">
            <span className="text-muted-foreground">Name</span>
            <span className="font-medium">{adminUser?.name ?? "—"}</span>
          </div>
          <div className="flex justify-between gap-4 border-b py-2">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">{adminUser?.email}</span>
          </div>
          <div className="flex justify-between gap-4 py-2">
            <span className="text-muted-foreground">Role</span>
            <span className="font-medium">{adminUser?.role}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
