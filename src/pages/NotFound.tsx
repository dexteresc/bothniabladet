import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="h-screen w-screen flex flex-col items-center justify-center">
      <p className="mb-8 font-semibold text-2xl">There's nothing here 😢</p>
      <button className="rounded px-4 py-2 bg-gray-100 dark:bg-gray-700 flex items-center" onClick={() => navigate(-1)}>
        <span className="material-icons mr-2">arrow_back</span>
         Go back</button>
    </main>
  );
};
export default NotFound;