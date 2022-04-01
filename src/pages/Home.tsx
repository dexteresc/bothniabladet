import Sidebar from "@/components/Sidebar";
import ThemeButton from "@/components/ThemeButton";
import Navbar from "../components/Navbar";

const Home = () => {
  const items = [
    {
      name: "Category 1",
      path: "/category/1",
      icon: "folder",
      subItems: [
        {
          name: "Subcategory 1",
          path: "/category/1/subcategory/1",
          icon: "folder",
        },
        {
          name: "Subcategory 2",
          path: "/category/1/subcategory/2",
          icon: "folder",
        },
      ],
    },
    {
      name: "Category 2",
      path: "/category/2",
      icon: "folder",
    },
  ];

  return (
    <>
      <Navbar />
      <Sidebar items={items} />
      <div className="lg:pl-[20rem]">
        <main className="px-6 pt-4 min-h-[calc(100vh-64px)]">
          <h1 className="text-xl font-semibold mb-4">Home</h1>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vulputate, ipsum eu dignissim lacinia, nisi nisl aliquam eros, eget
            tincidunt nisl nunc eget lorem.
          </p>
          {/* Items */}
          <ThemeButton />
        </main>
      </div>
    </>
  );
};

export default Home;
