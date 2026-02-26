import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";

export type UserRole = "admin" | "public" | "guest";

export interface User {
  email: string;
  role: UserRole;
  name: string;
  loginTime: string;
}

export interface ActivityLog {
  action: string;
  timestamp: string;
  user: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
  activityLog: ActivityLog[];
  addActivity: (action: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("neerniti-user");
    return stored ? JSON.parse(stored) : null;
  });

  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    const stored = localStorage.getItem("neerniti-activity");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    if (user) localStorage.setItem("neerniti-user", JSON.stringify(user));
    else localStorage.removeItem("neerniti-user");
  }, [user]);

  useEffect(() => {
    localStorage.setItem("neerniti-activity", JSON.stringify(activityLog.slice(-50)));
  }, [activityLog]);

  const addActivity = useCallback((action: string) => {
    setActivityLog((prev) => [
      ...prev,
      { action, timestamp: new Date().toISOString(), user: user?.email || "unknown" },
    ]);
  }, [user]);

  const login = useCallback((email: string, role: UserRole) => {
    const u: User = {
      email,
      role,
      name: role === "admin" ? "Gov Admin" : role === "guest" ? "Guest User" : email.split("@")[0],
      loginTime: new Date().toISOString(),
    };
    setUser(u);
    setActivityLog((prev) => [
      ...prev,
      { action: `${role} login`, timestamp: new Date().toISOString(), user: email },
    ]);
  }, []);

  const logout = useCallback(() => {
    if (user) {
      setActivityLog((prev) => [
        ...prev,
        { action: "logout", timestamp: new Date().toISOString(), user: user.email },
      ]);
    }
    setUser(null);
    localStorage.removeItem("neerniti-user");
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, activityLog, addActivity }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
