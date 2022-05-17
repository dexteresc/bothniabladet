import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/Logo";
import Input from "@/components/Input";
import Loading from "@/components/Loading";
import { signup } from "@/api/auth";

interface SignUpError {
  email?: string;
  password?: string;
  other?: string;
}

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<SignUpError>({
    email: "",
    password: "",
    other: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Blur current input

    e.currentTarget.querySelector<HTMLInputElement>("input:focus")?.blur();

    const newError: SignUpError = {
      email: "",
      password: "",
      other: ""
    };

    // Handle errors
    if (!email) {
      newError.email = "Email is required";
    }
    if (!password) {
      newError.password = "Password is required";
    }
    if (email && password) {
      setIsLoading(true);
      await signup(email, password)
        .then(() => {
          navigate("/login"); // Redirect to login
        })
        .catch((err) => {
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
          } flex flex-col w-full lg:w-1/2 mx-auto transition-opacity z-10`}
        >
          <h1 className="text-4xl lg:text-5xl font-semibold my-8">Sign Up</h1>
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
          <Input type="submit" value="Sign Up" className="mt-5 font-semibold" />
        </form>
        {/* User already have an account */}
        <p
          className={`text-center text-gray-600 mt-2 transition-opacity ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        >
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 dark:text-blue-300">
            Login
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

export default SignUp;
