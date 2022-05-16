import { ReactNode, useMemo, useState } from "react";
import axios from "axios";
import { User } from "@/api/user";
import AuthContext from "./auth";
import { get } from "@/api/axios";

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
