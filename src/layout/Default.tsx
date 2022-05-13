import { NavigateFunction, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar, { NavItem } from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Category, getCategories } from "@/api/category";
import { useAlert } from "@/contexts/alert";

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

  const { addAlert } = useAlert();

  const [items, setItems] = useState<NavItem[]>([]);

  // Todo: Move to api maybe ?
  const spreadTree = (categories: Category[]) => {
    const tree = (c: NavItem[], rootId: number) => {
      let r: NavItem = {
        id: rootId,
        name: "",
        type: "folder",
        path: "",
        parentId: null,
        subItems: []
      }; // To peace TS
      const o: {
        [key: string]: NavItem;
      } = {};
      c.forEach((a: NavItem) => {
        const b = a;
        b.subItems = o[b.id] && o[b.id].subItems;
        o[b.id] = b;
        if (b.id === rootId) {
          r = b;
          r.path = `/category/${b.id}`;
        } else if (b.parentId) {
          o[b.parentId] = o[b.parentId] || {};
          o[b.parentId].subItems = o[b.parentId].subItems || [];
          b.path = `${o[b.parentId].path}/${b.id}`;
          // @ts-ignore
          o[b.parentId].subItems.push(b);
        }
      });
      return r;
    };

    const result: NavItem[] = [];
    categories.forEach((c: Category) => {
      if (c.parentId === null) {
        result.push(tree(categories as NavItem[], c.id));
      }
    });
    return result;
  };

  function retrieveCategories() {
    getCategories()
      .then((categories) => {
        setItems(() => [
          {
            id: 0,
            name: "All",
            path: "/",
            type: "category",
            parentId: null
          },
          ...spreadTree(categories)
        ]);
      })
      .catch((err) => {
        setItems([
          {
            id: 0,
            name: "All",
            path: "/",
            type: "category",
            parentId: null
          }
        ]);
        addAlert("error", err.message);
      });
  }

  useEffect(() => {
    retrieveCategories();
    return () => {
      setItems([
        {
          id: 0,
          name: "All",
          path: "/",
          type: "category",
          parentId: null
        }
      ]);
    };
  }, []);

  return (
    <>
      <Navbar navigate={navigate} onOpen={onOpen} isOpen={isOpen} />
      <Sidebar
        items={items}
        isOpen={isOpen}
        onClose={onClose}
        updateItems={retrieveCategories}
      />
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
