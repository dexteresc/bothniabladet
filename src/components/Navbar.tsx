import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const toggle = () => setIsOpen(!isOpen);
  const fileInput = useRef<HTMLInputElement>(null);
  const searchEl = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchEl.current) {
      searchEl.current.blur();
    }

    if (searchEl.current && searchEl.current.value) {
      window.location.href = `/search?q=${searchEl.current.value}`;
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileSubmit = () => {
    if (file) {
      console.log(file);
    }
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            setIsModalOpen(false);
            window.location.reload();
          }
        });
    }
  };

  const focusSearch = () => {
    if (searchEl.current) {
      searchEl.current.focus();
    }
  };
  // Listen for CTRL + K to search
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.key == "k") {
      e.preventDefault();
      focusSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col justify-center items-center">
          {/* Upload file form */}
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleFileSubmit}
          >
            <input
              ref={fileInput}
              type="file"
              name="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={() => fileInput.current && fileInput.current.click()}
            >
              Välj fil
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              disabled={!file}
            >
              Ladda upp
            </button>
          </form>
        </div>
      </Modal>
      <header className="sticky w-full h-16 bg-inherit text-gray-500 dark:text-gray-200 flex items-center border-b border-b-gray-100 dark:border-b-gray-900">
        <nav className="w-full flex items-center px-4">
          <Link to="/" className="pl-2 py-2 pr-4 mr-4 flex-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 353.75 202.23"
              className="w-12 text-black dark:text-white"
            >
              <g id="Layer_2" data-name="Layer 2">
                <g id="Layer_1-2" data-name="Layer 1">
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
          <div className="flex items-center flex-1 justify-end lg:justify-between flex-nowrap">
            <div className="px-2 lg:px-4 py-2 rounded-full lg:rounded flex items-center lg:flex-grow-0 lg:flex-shrink lg:basis-[50vw] lg:max-w-[720px] transition-all lg:bg-gray-100 dark:lg:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 lg:active:bg-gray-100 dark:lg:active:bg-gray-700 lg:hover:bg-gray-100 dark:lg:hover:bg-gray-700 focus-within:bg-white dark:focus-within:bg-gray-600 focus-within:drop-shadow lg:focus-within:active:bg-white dark:focus-within:active:bg-gray-600 lg:focus-within:hover:bg-white  dark:lg:focus-within:hover:bg-gray-600">
              <span
                className="material-icons text-xl select-none cursor-pointer lg:cursor-default w-[1.75rem] flex justify-center"
                onClick={focusSearch}
              >
                search
              </span>
              <input
                ref={searchEl}
                type="text"
                placeholder="Sök"
                className="outline-none bg-transparent pl-2 h-full flex-1 text-lg hidden lg:block"
              />
            </div>
            <button
              className="mr-0 lg:mr-2 font-semibold flex items-center p-2 lg:px-4 lg:py-2 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-blue-200 dark:active:bg-gray-500 whitespace-nowrap select-none rounded-full lg:rounded"
              onClick={() => setIsModalOpen(true)}
            >
              <span className="material-icons text-xl w-[1.75rem] h-[1.75rem]">
                upload
              </span>
              <span className="hidden lg:block">Ladda upp</span>
            </button>
          </div>
          {/* Profile icon */}
          <button
            className="rounded-full h-auto p-2 flex items-center transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 select-none"
            onClick={toggle}
          >
            <span className="material-icons ">account_circle</span>
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
