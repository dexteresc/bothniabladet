import { useEffect, useRef, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavIcon({ icon, className }: { icon: string; className?: string }) {
  return (
    <span
      className={`${className} material-icons text-xl select-none w-7 ${
        className?.includes("flex") ?? "flex"
      } items-center justify-center`}
    >
      {icon}
    </span>
  );
}

function Navbar() {
  const [search, setSearch] = useState<string>("");
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const searchEl = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = search.trim();
    if (query && searchEl.current) {
      searchEl.current.blur();
      navigate("/search");
    }
  };

  const handleSearchClick = () => {
    if (window.innerWidth < 1024) {
      if (searchActive) {
        setSearch("");
      }
      setSearchActive(!searchActive);
    }
  };

  useEffect(() => {
    if (searchActive) {
      searchEl.current?.focus();
    }
  }, [searchActive]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Listen for CTRL + K to search
      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        handleSearchClick();
      }
    };
    const handleSearchResize = () => {
      // set search active on resize
      if (window.innerWidth >= 1024) {
        setSearchActive(false);
      } else if (search) {
        setSearchActive(true);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleSearchResize);
    return () => {
      window.removeEventListener("resize", handleSearchResize);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // TEMPORARY
  useEffect(() => {
    console.log("searchActive: ", searchActive);
  }, [searchActive]);
  return (
    <header className="fixed top-0 w-full h-16 bg-inherit text-gray-500 dark:text-gray-200 flex items-center border-b border-b-gray-100 dark:border-b-gray-900 z-30">
      <nav className="w-full flex items-center px-4">
        <div className={`${searchActive ? "hidden md:flex" : "flex"}`}>
          <button
            type="button"
            className="material-icons block lg:hidden p-2 select-none"
          >
            menu
          </button>
          <Link to="/" className="pl-2 py-2 pr-4 mr-4 flex-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 353.75 202.23"
              className="w-12 text-black dark:text-white"
              version="1"
            >
              <title>BothniaBladet logo</title>
              <g>
                <g>
                  <rect fill="#fc3" y="0.23" width="60.65" height="202" />
                  <rect
                    fill="#36c"
                    x="27"
                    y="0.23"
                    width="43.96"
                    height="202"
                  />
                  <path
                    fill="currentColor"
                    d="M60.58,0H92q28.64,0,42.55,6.19A51.13,51.13,0,0,1,157,25.43a50.55,50.55,0,0,1,8.53,28.18,49.6,49.6,0,0,1-6,23.86,51.86,51.86,0,0,1-17.39,18.76q27.13,18.84,27.13,50A54.18,54.18,0,0,1,160.6,176q-8.59,13.47-21.24,19.86t-36.57,6.4H33ZM76.12,166.34l22.76.83q17.15,0,25-6.74T131.66,142a25.85,25.85,0,0,0-17.73-24.74q-8-2.76-30.82-2.89Zm11.58-86h6.8q15.23,0,20.67-2.27a20.1,20.1,0,0,0,9.24-8.46,25.67,25.67,0,0,0,3.81-13.75,21.35,21.35,0,0,0-3.37-12.09A16.7,16.7,0,0,0,116,36.84q-5.48-1.79-22.22-1.78Z"
                  />
                  <path
                    fill="currentColor"
                    d="M200.91,0h31.37q28.64,0,42.56,6.19a51.16,51.16,0,0,1,22.43,19.24,50.55,50.55,0,0,1,8.53,28.18,49.6,49.6,0,0,1-6,23.86,51.92,51.92,0,0,1-17.38,18.76q27.12,18.84,27.12,50a54.09,54.09,0,0,1-8.59,29.7q-8.6,13.47-21.24,19.86t-36.57,6.4H173.27Zm15.53,166.34,22.77.83q17.13,0,25-6.74T272,142a25.85,25.85,0,0,0-17.73-24.74q-8-2.76-30.82-2.89Zm11.58-86h6.8q15.23,0,20.67-2.27a20.1,20.1,0,0,0,9.24-8.46,25.67,25.67,0,0,0,3.81-13.75,21.35,21.35,0,0,0-3.37-12.09,16.66,16.66,0,0,0-8.85-6.88q-5.48-1.79-22.22-1.78Z"
                  />
                  <circle fill="currentColor" cx="334.75" cy="183.23" r="19" />
                </g>
              </g>
            </svg>
          </Link>
        </div>

        <div className="flex items-center flex-1 justify-end lg:justify-between flex-nowrap">
          <form
            role="search"
            onSubmit={handleSearch}
            className={`lg:rounded flex items-center lg:flex-grow-0 lg:flex-shrink lg:basis-[50vw] lg:max-w-[720px] transition-all lg:bg-gray-100 dark:lg:bg-gray-700 lg:active:bg-gray-100 dark:lg:active:bg-gray-700 lg:hover:bg-gray-100 dark:lg:hover:bg-gray-700 ${
              searchActive
                ? "flex-1 md:w-auto rounded focus-within:bg-white bg-gray-100 dark:bg-gray-700 dark:focus-within:bg-gray-600 focus-within:drop-shadow"
                : "rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 lg:focus-within:bg-white dark:lg:focus-within:bg-gray-600 lg:focus-within:hover:bg-white dark:lg:focus-within:hover:bg-gray-600 lg:focus-within:drop-shadow"
            }`}
          >
            <button
              type="button"
              onClick={handleSearchClick}
              className="cursor-pointer lg:cursor-default p-2"
            >
              <NavIcon
                icon="search"
                className={searchActive ? "hidden lg:flex" : "flex"}
              />
              <NavIcon
                icon="arrow_back"
                className={searchActive ? "flex lg:hidden" : "hidden"}
              />
            </button>
            <input
              ref={searchEl}
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`outline-none bg-transparent pl-2 h-full flex-1 text-lg ${
                searchActive ? "block" : "hidden lg:block"
              }`}
            />
            <button
              type="button"
              aria-label="Clear search"
              className={`${search.trim().length > 0 ? "flex" : "hidden"} p-2`}
              onClick={() => {
                searchEl.current?.focus();
                setSearch("");
              }}
            >
              <NavIcon icon="close" />
            </button>
          </form>
          <div className={`flex-nowrap ${searchActive ? "hidden md:flex" : "flex"}`}>
            <button
              type="button"
              className="mr-0 lg:mr-2 font-semibold flex items-center p-2 lg:px-4 lg:py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-blue-200 dark:active:bg-gray-500 whitespace-nowrap select-none rounded-full lg:rounded"
            >
              <NavIcon icon="upload" />
              <span className="hidden lg:block">Ladda upp</span>
            </button>
            <button
              type="button"
              className="rounded-full h-auto p-2 flex items-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 select-none"
            >
              <NavIcon icon="account_circle" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
