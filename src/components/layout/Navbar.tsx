import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Bus, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
          <Bus className="h-6 w-6" />
          BusGo
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden items-center gap-1.5 text-sm text-muted-foreground sm:flex">
                <User className="h-4 w-4" />
                {user.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { logout(); navigate("/login"); }}
              >
                <LogOut className="mr-1.5 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button size="sm" onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
