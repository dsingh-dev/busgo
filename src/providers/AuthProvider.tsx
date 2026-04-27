import { ReactNode, useState } from "react";
import { AuthContext, User } from "../context/AuthContext";

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