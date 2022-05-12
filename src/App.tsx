import {
  Route,
  Routes,
  useLocation,
  Navigate,
  useNavigate,
  Location
} from "react-router-dom";
import { ReactNode, useMemo, useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AuthContext, { useAuth } from "./contexts/auth";
import Search from "./pages/Search";
import Default from "./layout/Default";
import { User } from "./api/user";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import { PhotoModal, PhotoViewFull } from "./pages/PhotoView";
import { AlertProvider } from "./components/Alert";
import Category from "./pages/Category";

/*
STYLE REF

DARK: 
bg: bg-gray-800
hover: bg-gray-700
active: bg-gray-600
active-link: bg-gray-500

LIGHT:
bg: bg-white
hover: bg-gray-100
active: bg-gray-200
active-link: bg-blue-200

*/

function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setIsAuthenticated(true);
    setUser(newUser);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  const value = useMemo(() => ({ isAuthenticated, user, login, logout }), []);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line no-unused-vars
function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as { backgroundLocation?: Location };

  return (
    <AuthProvider>
      <AlertProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Default navigate={navigate} />}>
            <Route path="" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category/*" element={<Category />} />
          </Route>
          <Route path="/photo/:photoId" element={<PhotoViewFull />} />
          <Route path="/login" element={<Login />} />
          <Route path="/upload" element={<Upload navigate={navigate} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {state?.backgroundLocation && (
          <Routes>
            <Route path="/photo/:photoId" element={<PhotoModal />} />
          </Routes>
        )}
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
