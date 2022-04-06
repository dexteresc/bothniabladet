import { createContext, useContext } from "react";
import { User } from "@/api/user";

interface IAuthContext {
  isAuthenticated: boolean;
  user: any;
  // eslint-disable-next-line no-unused-vars
  login(user: User): void;
  logout(): void;
}

const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {}
});

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
