import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  Location
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { useAuth } from "./contexts/auth";
import Search from "./pages/Search";
import Default from "./layout/Default";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import { PhotoModal, PhotoViewFull } from "./pages/PhotoView";
import { AlertProvider } from "./components/Alert";
import CategoryView from "./pages/CategoryView";
import Loading from "./components/Loading";

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

function RequireAuth({ children }: { children: JSX.Element }) {
  const { authenticate, token } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const reToken = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!reToken) {
      return navigate("/login", { replace: true, state: { from: location } });
    }
    authenticate(reToken);
  }, [reToken]);

  useEffect(() => {
    if (token) {
      setLoading(false);
    }
  }, [token]);

  return loading ? <Loading /> : children;
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
    <AlertProvider>
      <Routes location={state?.backgroundLocation || location}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Default navigate={navigate} />
            </RequireAuth>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/category/*" element={<CategoryView />} />
        </Route>
        <Route
          path="/photo/:photoId"
          element={
            <RequireAuth>
              <PhotoViewFull />
            </RequireAuth>
          }
        />
        <Route
          path="/upload"
          element={
            <RequireAuth>
              <Upload navigate={navigate} />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {state?.backgroundLocation && (
        <Routes>
          <Route path="/photo/:photoId" element={<PhotoModal />} />
        </Routes>
      )}
    </AlertProvider>
  );
}

export default App;
