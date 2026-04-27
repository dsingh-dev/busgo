import { Toaster } from "@/components/ui/toaster";
import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bus,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";

const navClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
    isActive
      ? "bg-primary text-primary-foreground"
      : "text-muted-foreground hover:bg-muted hover:text-foreground",
  );

const AdminLayout = () => {
  const { adminUser, logout } = useAdminAuth();
  const location = useLocation();

  if (!adminUser) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <>
    <Toaster />
    <div className="flex min-h-screen bg-muted/30">
      <aside className="flex w-56 flex-col border-r bg-card">
        <div className="flex h-14 items-center gap-2 border-b px-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Shield className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">BusGo Admin</p>
            <p className="truncate text-xs text-muted-foreground">{adminUser.email}</p>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-3">
          <NavLink to="/admin/dashboard" end className={navClass}>
            <LayoutDashboard className="h-4 w-4 shrink-0" />
            Dashboard
          </NavLink>
          <NavLink to="/admin/buses" className={navClass}>
            <Bus className="h-4 w-4 shrink-0" />
            Buses
          </NavLink>
          <NavLink to="/admin/profile" className={navClass}>
            <User className="h-4 w-4 shrink-0" />
            Profile
          </NavLink>
          <NavLink to="/admin/settings" className={navClass}>
            <Settings className="h-4 w-4 shrink-0" />
            Settings
          </NavLink>
        </nav>

        <div className="border-t p-3">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => {
              logout();
            }}
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto p-6 md:p-8">
        <Outlet />
      </main>
    </div>
    </>
  );
};

export default AdminLayout;
