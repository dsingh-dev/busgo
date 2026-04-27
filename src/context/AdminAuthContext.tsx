import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  ReactNode,
} from "react";

export interface AdminUser {
  id: number;
  name: string | null;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  adminToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const USER_KEY = "bus_admin_user";
const TOKEN_KEY = "bus_admin_token";

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [adminToken, setAdminToken] = useState<string | null>(() =>
    localStorage.getItem(TOKEN_KEY),
  );

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch("/api/auth/login-admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.message ?? "Invalid credentials");
    }
    if (data.user?.role !== "ADMIN") {
      throw new Error("This account does not have admin access.");
    }
    console.log(TOKEN_KEY, data.token);
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setAdminToken(data.token);
    setAdminUser(data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
    setAdminUser(null);
    setAdminToken(null);
  }, []);

  const value = useMemo(
    () => ({ adminUser, adminToken, login, logout }),
    [adminUser, adminToken, login, logout],
  );

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
