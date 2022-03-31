import { Route, Routes } from "react-router";
import Login from "@/pages/Login";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="*"
        element={
          <main className="p-2">
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  );
}

export default App;
