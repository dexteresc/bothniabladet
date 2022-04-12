import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function ThemeButton() {
  const [, setThemeState] = useState<Theme>("light");
  const setTheme = (
    newTheme: Theme = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  ) => {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.theme = newTheme;
    setThemeState(newTheme);
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
        type="button"
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-tl rounded-bl shadow-lg"
        onClick={() => setTheme("light")}
      >
        Light
      </button>
      <button
        type="button"
        className="bg-gray-200 text-gray-700 px-4 py-2 shadow-lg"
        onClick={() => setTheme("dark")}
      >
        Dark
      </button>
      <button
        type="button"
        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-tr rounded-br shadow-lg"
        onClick={() => setTheme()}
      >
        Media
      </button>
    </div>
  );
}

export default ThemeButton;
