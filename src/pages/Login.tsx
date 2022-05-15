import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { login } from "@/api/auth";
import { useAuth } from "@/contexts/auth";

interface LoginError {
  email?: string;
  password?: string;
  other?: string;
}

function Login() {
  const auth = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError>({
    email: "",
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
    if (!email) {
      newError.email = "Email is required";
    }
    if (!password) {
      newError.password = "Password is required";
    }
    if (email && password) {
      setIsLoading(true);
      await login(email, password)
        .then(({ token, user }) => {
          if (!token || !user) {
            setError({
              other: "An error occurred"
            });
            return;
          }
          auth.login(user, token);
          setIsLoading(false);
          navigate("/"); // Redirect to home
        })
        .catch((err) => {
          // If err.response.data is empty, then err.message is the error message
          newError.other =
            err.response.data ?? err.message ?? "An error occurred";
          setError(newError);
          setIsLoading(false);
        });
    } else {
      setError(newError);
    }
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
            Email:
            <Input
              className={`${
                error.email && "border-red-500 text-red-500"
              } w-full mt-2`}
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="font-semibold">
            Password:
            <Input
              className={`${
                error.password && "border-red-500 text-red-500"
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
        {/* Don't have an account? <Link to="/register">Register</Link> */}
        <p
          className={`text-center text-gray-600 mt-2 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-500 dark:text-blue-300">
            Sign up
          </Link>
        </p>
        <Loading
          className={`${
            isLoading ? "visible" : "hidden"
          } transition-opacity w-20 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0`}
        />
      </main>
    </div>
  );
}

export default Login;
