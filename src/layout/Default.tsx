import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar, { NavItem } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/api/category";

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

  const [items, setItems] = useState<NavItem[]>([
    {
      name: "All",
      path: "/"
    }
  ]);

  useEffect(() => {
    getCategories()
      .then((result) => {
        setItems((prev) => [
          ...prev,
          ...result.map((category) => ({
            name: category.name,
            path: `/category/${category.id}`
          }))
        ]);
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      setItems([
        {
          name: "All",
          path: "/"
        }
      ]);
    };
  }, []);

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
