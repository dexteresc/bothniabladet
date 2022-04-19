import { FormEvent, Component, createRef } from "react";
import { Link, NavigateFunction } from "react-router-dom";
import Logo from "./Logo";

export function Icon({
  value,
  className
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      className={`${className} material-icons text-xl select-none w-7 ${
        className?.includes("flex") ?? "flex"
      } items-center justify-center`}
    >
      {value}
    </span>
  );
}

interface NavbarProps {
  navigate: NavigateFunction;
  onOpen: () => void;
  isOpen: boolean;
}

interface NavbarState {
  search: string;
  searchOpen: boolean;
}

class Navbar extends Component<NavbarProps, NavbarState> {
  private searchRef = createRef<HTMLInputElement>();

  constructor(props: NavbarProps) {
    super(props);
    this.state = {
      search: "",
      searchOpen: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("resize", this.handleSearchResize);

    // Fetch query from URL
    // ! Is this OK?
    const searchParams = new URLSearchParams(window.location.search);
    const search = searchParams.get("q");
    if (search) {
      this.setState({ search });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("resize", this.handleSearchResize);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    // Listen for CTRL + K to search
    if (e.ctrlKey && e.key === "k") {
      e.preventDefault();
      this.handleSearchClick();
    }
  };

  handleSearchResize = () => {
    const { search } = this.state;
    // set search active on resize
    if (window.innerWidth >= 1024) {
      this.setState((state) => ({
        ...state,
        searchOpen: false
      }));
    } else if (search) {
      this.setState((state) => ({
        ...state,
        searchOpen: true
      }));
    }
  };

  handleSearch = (e: FormEvent<HTMLFormElement>) => {
    const { current } = this.searchRef;
    const { search } = this.state;
    const { navigate } = this.props;
    e.preventDefault();
    const query = search.trim();
    if (query && current) {
      current.blur();
      navigate(`/search?q=${query}`);
    }
  };

  handleSearchClick = () => {
    const { current } = this.searchRef;
    const { searchOpen } = this.state;
    const { navigate } = this.props;
    if (window.innerWidth < 1024 && current) {
      if (searchOpen) {
        this.setState(
          () => ({
            search: "",
            searchOpen: false
          }),
          () => {
            current.blur();
            navigate("/");
          }
        );
      } else {
        this.setState(
          () => ({
            searchOpen: true
          }),
          () => {
            current.focus();
          }
        );
      }
    }
  };

  handleSearchChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    this.setState(() => ({
      search: value
    }));
  };

  render() {
    const { search, searchOpen } = this.state;
    const { onOpen, isOpen } = this.props;
    return (
      <header className="fixed top-0 w-full h-16 bg-inherit text-gray-500 dark:text-gray-200 flex items-center border-b border-b-gray-100 dark:border-b-gray-900 z-30">
        <nav className="w-full flex items-center px-4">
          <div className={`${searchOpen ? "hidden md:flex" : "flex"}`}>
            <button
              type="button"
              className="material-icons block lg:hidden p-2 select-none"
              onClick={isOpen ? () => {} : onOpen}
            >
              {isOpen ? "close" : "menu"}
            </button>
            <Link to="/" className="pl-2 py-2 pr-4 mr-4 flex-none">
              <Logo className="w-12" />
            </Link>
          </div>

          <div className="flex items-center flex-1 justify-end lg:justify-between flex-nowrap">
            <form
              role="search"
              onSubmit={this.handleSearch}
              className={`lg:rounded flex items-center lg:flex-grow-0 lg:flex-shrink lg:basis-[50vw] lg:max-w-[720px] transition-all lg:bg-gray-100 dark:lg:bg-gray-700 lg:active:bg-gray-100 dark:lg:active:bg-gray-700 lg:hover:bg-gray-100 dark:lg:hover:bg-gray-700 ${
                searchOpen
                  ? "flex-1 md:w-auto rounded focus-within:bg-white bg-gray-100 dark:bg-gray-700 dark:focus-within:bg-gray-600 focus-within:drop-shadow"
                  : "rounded-3xl hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 lg:focus-within:bg-white dark:lg:focus-within:bg-gray-600 lg:focus-within:hover:bg-white dark:lg:focus-within:hover:bg-gray-600 lg:focus-within:drop-shadow"
              }`}
            >
              <button
                type="button"
                onClick={this.handleSearchClick}
                className="cursor-pointer lg:cursor-default p-2"
              >
                <Icon
                  value="search"
                  className={searchOpen ? "hidden lg:flex" : "flex"}
                />
                <Icon
                  value="arrow_back"
                  className={searchOpen ? "flex lg:hidden" : "hidden"}
                />
              </button>
              <input
                ref={this.searchRef}
                type="text"
                placeholder="Search"
                value={search}
                onChange={this.handleSearchChange}
                className={`outline-none bg-transparent pl-2 h-full flex-1 text-lg ${
                  searchOpen ? "block" : "hidden lg:block"
                }`}
              />
              <button
                type="button"
                aria-label="Clear search"
                className={`${
                  search.trim().length > 0 ? "flex" : "hidden"
                } p-2`}
                onClick={() => {
                  this.searchRef.current?.focus();
                  this.setState({ search: "" });
                }}
              >
                <Icon value="close" />
              </button>
            </form>
            <div
              className={`flex-nowrap ${
                searchOpen ? "hidden md:flex" : "flex"
              }`}
            >
              <Link
                to="/upload"
                className="mr-0 lg:mr-2 font-semibold flex items-center p-2 lg:px-4 lg:py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-blue-200 dark:active:bg-gray-500 whitespace-nowrap select-none rounded-full lg:rounded"
              >
                <Icon value="upload" />
                <span className="hidden lg:block">Ladda upp</span>
              </Link>
              <Link
                to="/profile"
                className="rounded-full h-auto p-2 flex items-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 select-none"
              >
                <Icon value="account_circle" />
              </Link>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
