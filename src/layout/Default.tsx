import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

function Default() {
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
      <Navbar />
      <Sidebar items={items} />
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
