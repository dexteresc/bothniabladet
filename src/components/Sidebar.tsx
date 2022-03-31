import { useState } from "react";
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
    <aside className="fixed h-[calc(100vh-64px)] invisible sm:visible min-w-[300px] max-w-[720px] w-[20vw] bg-white border-r border-r-gray-100">
      <nav className="w-full h-full p-2">
        <ul>
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

  return (
    <li className="mb-2 last:mb-0">
      {item.subItems && item.subItems.length > 0 ? (
        <button
          className="flex items-center px-4 py-2 rounded transition-colors hover:bg-gray-50 active:bg-blue-50 whitespace-nowrap w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="material-icons text-xl text-gray-200 mr-2">
            expand_more
          </span>
          {item.name}
        </button>
      ) : (
        item.path && (
          <Link to={item.path}>
            <button className="flex items-center px-4 py-2 rounded transition-colors hover:bg-gray-50 active:bg-blue-50 whitespace-nowrap w-full">
              {item.name}
            </button>
          </Link>
        )
      )}
      {item.subItems && item.subItems.length > 0 && isOpen && (
        <ul className="pl-8 my-2">
          {item.subItems.map((subItem) => (
            <li key={subItem.name} className="mb-2 last:mb-0">
              {subItem.path && (
                <Link
                  to={subItem.path}
                  className="p-2 rounded hover:bg-gray-50 active:bg-blue-50"
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
