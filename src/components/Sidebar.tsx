import { FormEvent, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Category, createCategory } from "@/api/category";
import { useAlert } from "@/contexts/alert";
import Input from "./Input";

export interface NavItem extends Category {
  path: string;
  subItems?: NavItem[];
}

function ListItem({
  item,
  className = "",
  activeId,
  setActiveId,
  onContextMenu
}: {
  item: NavItem;
  className?: string;
  activeId: number | null;
  // eslint-disable-next-line no-unused-vars
  setActiveId: (id: number) => void;
  // eslint-disable-next-line no-unused-vars
  onContextMenu: (e: React.MouseEvent<HTMLLIElement>, id: number) => void;
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
    <li
      className={`mb-2 last:mb-0 h-fit ${className}`}
      onContextMenu={(e) => onContextMenu(e, item.id)}
    >
      {item.type === "folder" ? (
        <button
          type="button"
          className={`flex items-center pl-2 pr-4 py-2 rounded group transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 whitespace-nowrap w-full outline-none ${
            activeId === item.id ? "ring-1 ring-inset" : ""
          }`}
          onClick={() => {
            toggle();
            setActiveId(item.id);
          }}
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
              `outline-none flex items-center py-2 pr-4 pl-9 rounded hover:transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-blue-100 dark:active:bg-gray-500 whitespace-nowrap w-full 
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
        <ul className="pl-8 my-2 text-gray-600 dark:text-gray-300 ">
          {item.subItems.map((subItem) => (
            <ListItem
              key={subItem.id}
              item={subItem}
              setActiveId={setActiveId}
              activeId={activeId}
              onContextMenu={(e) => onContextMenu(e, item.id)}
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
  updateItems: () => void;
}) {
  const { addAlert } = useAlert();

  const [activeId, setActiveId] = useState<number | null>(null); // Active item id

  const addInputEl = useRef<HTMLInputElement>(null); // Add input element
  const [addInputVal, setAddInputVal] = useState(""); // Add category input value
  const [isAddOpen, setIsAddOpen] = useState(false); // Add category open state
  const [addType, setAddType] = useState<"folder" | "category">("folder"); // Add category type
  const [anchorPoint, setAnchorPoint] = useState<{
    visible: boolean;
    x: number;
    y: number;
    id: number;
  }>({ visible: false, x: 0, y: 0, id: 0 });

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
      addAlert("error", "Category name too long");
      return;
    }

    createCategory({
      name: addInputVal,
      type: addType,
      parentId: activeId ?? undefined
    })
      .then(() => {
        addAlert("success", `${addType}`);
        setIsAddOpen(false);
        setAddInputVal("");
        updateItems();
      })
      .catch((err) => {
        addAlert("error", err.message);
      });
  };

  const handleContextMenu = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setAnchorPoint({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      id
    });
    document.addEventListener("click", (ev) => {
      ev.preventDefault();
      setAnchorPoint({
        visible: false,
        x: 0,
        y: 0,
        id: 0
      });
    });
  };

  return (
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
              setActiveId={setActiveId}
              activeId={activeId}
              onContextMenu={handleContextMenu}
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
            className="transition-all flex basis-1/2 justify-center rounded px-4 py-2 group-hover:basis-0 group-hover:hover:basis-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 text-gray-700 dark:text-gray-300 mr-1"
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
            className="transition-all flex basis-1/2 justify-center rounded px-4 py-2 group-hover:basis-0 group-hover:hover:basis-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 text-gray-700 dark:text-gray-300 ml-1"
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
      {/* Context menu */}
      {anchorPoint.visible && (
        <div
          className="fixed z-40"
          style={{
            top: anchorPoint.y,
            left: anchorPoint.x
          }}
        >
          <div className="bg-gray-50 dark:bg-gray-900 rounded shadow-md">
            <span className="pl-8">{anchorPoint.id}</span>
            <div className="flex items-center px-4 py-2">
              <span className="material-icons mr-2">delete</span>
              <span>Delete category</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export default Sidebar;
