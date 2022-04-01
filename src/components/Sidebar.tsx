import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavItem {
  name: string;
  path?: string;
  subItems?: NavItem[];
}
const Sidebar = ({ items }: { items: NavItem[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <aside className="fixed h-[calc(100vh-64px)] hidden lg:block w-[20rem] bg-white dark:bg-gray-800 border-r border-r-gray-100 dark:border-r-gray-900">
      <nav className="w-full h-full p-2">
        <ul className="">
          {items.map((item) => (
            <ListItem item={item} key={item.name} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const ListItem = ({ item }: { item: NavItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    localStorage.setItem(item.name, JSON.stringify(!isOpen));
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
          className="flex items-center pl-2 pr-4 py-2 rounded transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-gray-100 dark:active:bg-gray-600 whitespace-nowrap w-full"
          onClick={toggle}
        >
          <span
            className={`material-icons mr-1 transition-transform select-none
              ${isOpen ? "rotate-0" : "-rotate-90"}`}
          >
            expand_more
          </span>
          {item.name}
        </button>
      ) : (
        item.path && (
          <Link to={item.path}>
            <button className="flex items-center py-2 pr-4 pl-9 rounded transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-blue-50 dark:active:bg-gray-500 whitespace-nowrap w-full">
              {item.name}
            </button>
          </Link>
        )
      )}
      {item.subItems && item.subItems.length > 0 && isOpen && (
        <ul className="pl-8 my-2 text-gray-600 dark:text-gray-300 ">
          {item.subItems.map((subItem) => (
            <li key={subItem.name} className="mb-4 last:mb-0">
              {subItem.path && (
                <Link
                  to={subItem.path}
                  className="p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 active:bg-blue-50 dark:active:bg-gray-500 whitespace-nowrap"
                >
                  {subItem.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
export default Sidebar;
