import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("bus_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string) => {
    const u = { name: email.split("@")[0], email };
    setUser(u);
    localStorage.setItem("bus_user", JSON.stringify(u));
    return true;
  };

  const signup = (name: string, email: string, _password: string) => {
    const u = { name, email };
    setUser(u);
    localStorage.setItem("bus_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bus_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
