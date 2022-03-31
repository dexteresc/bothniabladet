import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "@/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <header className="sticky w-full h-16 bg-white text-gray-500 flex items-center border-b border-b-gray-100">
      <nav className="w-full flex items-center px-4">
        <Link to="/" className="pl-2 pr-4 py-2 mr-4">
          <img className="h-8 w-auto" src={logo} alt="Logo" />
        </Link>
        <div className="flex items-center flex-1 justify-between flex-nowrap">
          <div className="px-4 py-2 bg-gray-100 rounded flex items-center flex-grow-0 flex-shrink basis-[50vw] max-w-[720px] transition-all focus-within:bg-white focus-within:drop-shadow">
            <span className="material-icons text-xl">search</span>
            <input
              type="text"
              placeholder="Sök"
              className="outline-none bg-transparent pl-2 h-full flex-1 text-lg"
            />
          </div>
          <button className=" font-semibold flex items-center px-4 py-2 rounded transition-colors bg-white hover:bg-gray-100 active:bg-blue-200 whitespace-nowrap">
            <span className="material-icons text-xl">upload</span>
            Ladda upp
          </button>
        </div>
        <div>
          {/* Profile icon */}
          <button
            className="rounded-full h-auto p-2 flex items-center transition-colors hover:bg-gray-100"
            onClick={toggle}
          >
            <span className="material-icons ">account_circle</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
