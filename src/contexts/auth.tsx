import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import axios from "axios";
import { User } from "@/api/user";
import { get } from "@/api/axios";

interface IAuthContext {
  isAuthenticated: boolean;
  user: User | null;
  token: string;
  login(user: User, token: string): void;
  logout(): void;
  authenticate(token: string): Promise<void>;
}

const AuthContext = createContext<IAuthContext>(null!);

export const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");

  const login = (newUser: User, newToken: string) => {
    setIsAuthenticated(true);
    setToken(newToken);
    setUser(newUser);
    // Save to localStorage
    localStorage.setItem("token", newToken);
    // Set token to Axios
    axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken("");
    // Remove from localStorage
    localStorage.removeItem("token");
  };

  const authenticate = async (newToken: string) => {
    await get<User>("/auth/validate", {
      headers: {
        Authorization: `Bearer ${newToken}`
      }
    })
      .then((data) => {
        axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        setUser(data);
        setIsAuthenticated(true);
        setToken(newToken);
      })
      .catch(() => {
        logout();
      });
  };

  const value = useMemo(
    () => ({ isAuthenticated, user, token, login, logout, authenticate }),
    [isAuthenticated, user, token]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
