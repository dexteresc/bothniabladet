import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "@/components/Logo";
import Input from "@/components/Input";
import Loading from "@/components/Loading";

interface LoginError {
  username?: string;
  password?: string;
  other?: string;
}

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError>({
    username: "",
    password: "",
    other: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Blur current input

    e.currentTarget.querySelector<HTMLInputElement>("input:focus")?.blur();

    const newError: LoginError = {};

    // Handle errors
    if (!username) {
      newError.username = "Username is required";
    }
    if (!password) {
      newError.password = "Password is required";
    }
    if (username && password) {
      setIsLoading(true);
      await axios
        .post("/api/login", { username, password })
        .then((res) => {
          if (res.data.success) {
            navigate("/");
          } else {
            newError.other = res.data.message;
          }
          setIsLoading(false);
        })
        .catch((err) => {
          newError.other = err.message;
          setIsLoading(false);
        });
    }
    setError(newError);
  };

  return (
    <div className="container mx-auto py-10 px-4 min-h-screen relative">
      <header>
        <Logo className="w-20 mx-auto" />
      </header>
      <main className="">
        <form
          onSubmit={handleSubmit}
          className={`${
            isLoading ? "opacity-0" : "opacity-100"
          } flex flex-col w-full lg:w-1/2 mx-auto transition-opacity`}
        >
          <h1 className="text-4xl lg:text-5xl font-semibold my-8">Login</h1>
          {Object.values(error).some((value) => value) && (
            <p className="text-red-900 p-2 my-5 bg-red-300 rounded whitespace-pre-line leading-7">
              {Object.values(error).join("\n")}
            </p>
          )}
          <label className="mb-5 font-semibold">
            Username:
            <Input
              className={`${
                error.username ?? "border-red-500 text-red-500"
              } w-full mt-2`}
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label className="font-semibold">
            Password:
            <Input
              className={`${
                error.password ?? "border-red-500 text-red-500"
              } w-full mt-2`}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <input
            type="submit"
            value="Login"
            className="mt-5 px-4 py-2 rounded bg-blue-600 dark:bg-blue-600 text-gray-100 font-semibold cursor-pointer"
          />
        </form>
        <Loading
          className={`${
            isLoading ? "opacity-100" : "opacity-0"
          } transition-opacity w-20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2`}
        />
      </main>
    </div>
  );
}

export default Login;
