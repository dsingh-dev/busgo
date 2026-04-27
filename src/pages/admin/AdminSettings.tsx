import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight">Website settings</h1>
        <p className="text-muted-foreground">
          Public site branding and defaults (placeholder — wire to your API later).
        </p>
      </div>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>Basic information shown on the public site.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="site-name">Site name</Label>
            <Input id="site-name" defaultValue="BusGo" disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="support-email">Support email</Label>
            <Input id="support-email" type="email" placeholder="support@example.com" disabled />
          </div>
          <Button type="button" disabled variant="secondary">
            Save changes
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
