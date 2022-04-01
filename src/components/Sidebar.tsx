import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  name: string;
  path?: string;
  subItems?: NavItem[];
}

function ListItem({ item }: { item: NavItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    localStorage.setItem(
      item.name,
      JSON.stringify(!isOpen)
    );
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    if (item.subItems) {
      // fetch open state from local storage
      const open = localStorage.getItem(item.name);
      if (open) {
        setIsOpen(open === "true");
      }
    }
  }, [item.subItems]);

  return (
    <li className="mb-2 last:mb-0  h-fit">
      {item.subItems && item.subItems.length > 0 ? (
        <button
          type="button"
          className="flex items-center pl-2 pr-4 py-2 rounded group hover:transition-all hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 whitespace-nowrap w-full"
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
                  : "font-normal text-inherit"
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
            <li
              key={subItem.name}
              className="mb-1 last:mb-0"
            >
              {subItem.path && (
                <NavLink
                  to={subItem.path}
                  className={({ isActive }) =>
                    `${
                      isActive &&
                      "text-blue-500 dark:text-blue-300"
                    } py-1 px-2 rounded hover:transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-blue-100 dark:active:bg-gray-500 whitespace-nowrap flex items-center`
                  }
                >
                  <span className="inline-block w-1 h-[1rem] bg-blue-300 mr-2 rounded" />
                  {subItem.name}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

function Sidebar({ items }: { items: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const toggle = () => setIsOpen(!isOpen);

  return (
    <aside className="fixed top-16 bottom-0 hidden lg:block w-[20rem] bg-inherit border-r border-r-gray-100 dark:border-r-gray-900">
      <nav className="w-full h-full p-2">
        <ul className="">
          {items.map((item) => (
            <ListItem item={item} key={item.name} />
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
