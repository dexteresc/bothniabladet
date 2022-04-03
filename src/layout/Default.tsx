import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

function Default() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
    document.body.classList.add("overflow-hidden");
  };
  const onClose = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };
  const items = [
    {
      name: "All",
      path: "/"
    },
    {
      name: "Category 1",
      path: "/category/1",
      icon: "folder",
      subItems: [
        {
          name: "Subcategory 1",
          path: "/category/1/subcategory/1",
          icon: "folder"
        },
        {
          name: "Subcategory 2",
          path: "/category/1/subcategory/2",
          icon: "folder"
        }
      ]
    },
    {
      name: "Category 2",
      path: "/category/2",
      icon: "folder",
      subItems: [
        {
          name: "Subcategory 1",
          path: "/category/2/subcategory/1"
        }
      ]
    }
  ];

  return (
    <>
      <Navbar navigate={navigate} onOpen={onOpen} isOpen={isOpen} />
      <Sidebar items={items} isOpen={isOpen} onClose={onClose} />
      <div className="lg:pl-[20rem] pt-16">
        {/*
        <header className="fixed top-16 h-14 w-full bg-green-50">
          FILTERS
        </header>
          */}
        <main className="px-6 pt-6 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Default;
