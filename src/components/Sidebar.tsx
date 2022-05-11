import React, { FormEvent, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { createCategory } from "@/api/category";
import Input from "./Input";
import Alert from "./Alert";

export interface NavItem {
  id: number;
  name: string;
  type: "folder" | "category";
  path?: string;
  subItems?: NavItem[];
}

function ListItem({
  item,
  onClick,
  className
}: {
  item: NavItem;
  onClick?: () => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    // Save the current state of the dropdown
    localStorage.setItem(item.id.toString(), JSON.stringify(!isOpen));
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (item.subItems) {
      // fetch open state from local storage
      const open = localStorage.getItem(item.id.toString());
      if (open) {
        setIsOpen(open === "true");
      }
    }
  }, []);

  return (
    <li className={`mb-2 last:mb-0 h-fit ${className}`}>
      {item.subItems && item.subItems.length > 0 ? (
        <button
          type="button"
          className="flex items-center pl-2 pr-4 py-2 rounded group hover:transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 whitespace-nowrap w-full focus:ring-1 focus:ring-inset"
          onClick={toggle}
        >
          <span
            className={`material-icons mr-1 select-none  group-hover:transition-transform
            ${isOpen ? "rotate-0" : "-rotate-90"}`}
          >
            expand_more
          </span>
          {item.name}
        </button>
      ) : (
        item.path && (
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `flex items-center py-2 pr-4 pl-9 rounded hover:transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-blue-100 dark:active:bg-gray-500 whitespace-nowrap w-full 
              ${
                isActive
                  ? "text-blue-500 dark:text-blue-300 font-semibold bg-gray-100 dark:bg-gray-700"
                  : ""
              }`
            }
          >
            {item.name}
          </NavLink>
        )
      )}
      {item.subItems && item.subItems.length > 0 && isOpen && (
        <ul className="pl-9 my-2 text-gray-600 dark:text-gray-300 ">
          {item.subItems.map((subItem) => (
            <ListItem
              key={subItem.id}
              item={subItem}
              onClick={onClick}
              className=""
            />
          ))}
        </ul>
      )}
    </li>
  );
}

function Sidebar({
  items,
  isOpen,
  onClose,
  updateItems
}: {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line no-unused-vars
  updateItems: (newItems: NavItem[]) => void;
}) {
  const [activeId, setActiveId] = useState<number | null>(null); // Active item id

  const addInputEl = useRef<HTMLInputElement>(null); // Add input element
  const [addInputVal, setAddInputVal] = useState(""); // Add category input value
  const [isAddOpen, setIsAddOpen] = useState(false); // Add category open state
  const [addType, setAddType] = useState<"folder" | "category">("folder"); // Add category type

  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null); // Alert message
  // Closes sidebar if clicked outside or clicked on link
  useEffect(() => {
    if (isOpen) {
      const handleClick = (e: MouseEvent) => {
        const { target } = e;
        if (
          target instanceof Element && target.closest("aside")
            ? target instanceof HTMLAnchorElement
            : true
        ) {
          setIsAddOpen(false);
          onClose();
        }
      };
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
    return () => {};
  }, [isOpen, onClose]);

  // Close add category if click outside of it
  useEffect(() => {
    if (isAddOpen) {
      addInputEl.current?.focus();
      const handleClick = (e: MouseEvent) => {
        const { target } = e;
        if (target instanceof Element && !target.closest("form")) {
          setIsAddOpen(false);
        }
      };
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
    return () => {};
  }, [isAddOpen]);

  const handleAddSubmit = (e: FormEvent) => {
    e.preventDefault();
    const input = addInputVal.trim();
    if (!input) {
      setIsAddOpen(false);
      return;
    }
    if (input.length > 20) {
      setAlert({ type: "error", message: "Category name too long" });
    }
    if (addType === "folder") {
      createCategory({
        name: addInputVal,
        type: "folder",
        parentId: activeId ?? undefined
      })
        .then((newItem) => {
          setAlert({ type: "success", message: "Folder created" });
          setIsAddOpen(false);
          setAddInputVal("");
          const newItems = [...items, newItem];
          updateItems(newItems);
        })
        .catch((err) => {
          setAlert({ type: "error", message: err.message });
        });
    } else {
      createCategory({
        name: addInputVal,
        type: "category",
        parentId: activeId ?? undefined
      })
        .then((newItem) => {
          const newItems = [...items, newItem];
          updateItems(newItems);
          setAlert({ type: "success", message: "Category created" });
          setIsAddOpen(false);
          setAddInputVal("");
        })
        .catch((err) => {
          setAlert({ type: "error", message: err.message });
        });
    }
  };

  // Test
  useEffect(() => {
    console.log("Active id: ", activeId);
  }, [activeId]);
  return (
    <>
      <aside
        className={`${
          isOpen ? "flex" : "hidden"
        } lg:flex flex-col fixed top-16 bottom-0 w-64 lg:w-[20rem] bg-inherit border-r border-r-gray-100 dark:border-r-gray-900 shadow-lg lg:shadow-none z-40 p-2`}
        role="navigation"
      >
        <nav
          className="flex-1 w-full overflow-y-auto"
          onClick={(e) => {
            // Check if click is exact element and not child
            if (e.target instanceof Element && !e.target.closest("li")) {
              setActiveId(null);
            }
          }}
        >
          <ul className="">
            {items.map((item) => (
              <ListItem
                item={item}
                key={item.id}
                onClick={() => setActiveId(item.id)}
              />
            ))}
          </ul>
        </nav>
        <div className="w-full">
          <form
            onSubmit={handleAddSubmit}
            className={`flex overflow-hidden flex-nowrap 
            ${isAddOpen ? "visible" : "hidden"}
        `}
          >
            <Input
              placeholder={`Create ${addType}`}
              className="rounded-r-none flex-1 min-w-0"
              ref={addInputEl}
              value={addInputVal}
              onChange={(e) => setAddInputVal(e.target.value)}
            />
            <Input
              type="submit"
              className="rounded-l-none flex-none"
              value="Add"
            />
          </form>
          <div className={`flex group ${isAddOpen ? "hidden" : "visible"}`}>
            <button
              type="button"
              className="transition-all flex basis-1/2 justify-center rounded px-4 py-2 group-hover:basis-0 group-hover:hover:basis-full hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 text-gray-700 dark:text-gray-300"
              title="Add new directory"
              onClick={() => {
                setAddType("folder");
                setIsAddOpen(true);
              }}
            >
              <span className="material-icons">folder</span>
            </button>
            <button
              type="button"
              className="transition-all flex basis-1/2 justify-center rounded px-4 py-2 group-hover:basis-0 group-hover:hover:basis-full hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 text-gray-700 dark:text-gray-300"
              title="Add new category"
              onClick={() => {
                setAddType("category");
                setIsAddOpen(true);
              }}
            >
              <span className="material-icons">add</span>
            </button>
          </div>
        </div>
      </aside>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
}

export default Sidebar;
