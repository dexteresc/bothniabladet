import { NavigateFunction, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar, { NavItem } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { getCategories } from "@/api/category";

interface DefaultPageProps {
  navigate: NavigateFunction;
}

function Default({ navigate }: DefaultPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(true);
    document.body.classList.add("overflow-hidden");
  };
  const onClose = () => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  };

  const [items, setItems] = useState<NavItem[]>([]);

  const updateItems = (newItems: NavItem[]): void => {
    setItems(newItems);
  };

  useEffect(() => {
    getCategories()
      .then((result) => {
        setItems((prev) => [
          ...prev,
          ...result.map((category) => ({
            id: category.id,
            name: category.name,
            type: category.type,
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
          id: 1,
          name: "All",
          path: "/",
          type: "category"
        }
      ]);
    };
  }, []);

  return (
    <>
      <Navbar navigate={navigate} onOpen={onOpen} isOpen={isOpen} />
      <Sidebar items={items} isOpen={isOpen} onClose={onClose} updateItems={updateItems} />
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
