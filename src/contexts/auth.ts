import { createContext, useContext } from "react";
import { User } from "@/api/user";

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

export default AuthContext;
