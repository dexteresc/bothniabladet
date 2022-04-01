import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const ThemeButton = () => {
  const [theme, setThemeState] = useState<Theme>("light");
  const setTheme = (
    theme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  ) => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.theme = theme;
    setThemeState(theme);
  };
  useEffect(() => {
    const localTheme = localStorage.theme;
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);
  return (
    <div>
      {/* Select between light, dark and media */}
      <button
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-tl rounded-bl shadow-lg"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        className="bg-gray-200 text-gray-700 px-4 py-2 shadow-lg"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
      <button
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-tr rounded-br shadow-lg"
        onClick={() => setTheme()}
      >
        Media
      </button>
    </div>
  );
};

export default ThemeButton;
