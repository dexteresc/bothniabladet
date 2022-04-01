import { Route, Routes } from "react-router";
import Login from "@/pages/Login";
import Home from "./pages/Home";


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

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <main className="p-2">
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
