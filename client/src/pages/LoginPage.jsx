import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./../customHooks/useAuth";
import { Loader } from "lucide-react";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { Link,  } from "react-router-dom";

const Login = () => {
  const { logging, Login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    await Login(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full border-1 border-green-600 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 bg-gray-900 p-3 md:p-6 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center mb-2">
            <img
              src="src/assets/logo.png"
              alt="Logo"
              className="h-10 w-10 "
            />
            <h1 className="text-3xl font-bold text-green-500">LinguaLink</h1>
          </div>

          <p className="mb-5 text-gray-300 text-center text-sm">
            Sign in your account to continue your language learning journey
          </p>

          <form
            className="bg-gray-800 p-4 rounded-lg shadow-inner w-full"
            onSubmit={handleSubmit}
          >
           

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="hello@example.com"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="********"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Password must be at least 6 characters long
              </p>
            </div>

           

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 cursor-pointer rounded font-semibold flex justify-center items-center"
            >
              {logging ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Login"
              )}
            </button>

            <p className="mt-4 text-sm text-gray-400">
              Dont have an account?{" "}
             <Link to="/sign-up" className="link link-primary text-green-500 underline cursor-pointer">
                Sign Up
              </Link>
            </p>
          </form>
        </div>

        <div className="md:w-1/2 bg-green-900 p-8 flex flex-col justify-center items-center">
          <img
            className="h-50 sm:h-70"
            src="src/assets/sign_up_pic.png"
            alt=""
          />
          <h2 className="text-white text-sm sm:text-lg font-bold mb-2 text-center">
            Connect with language partners worldwide
          </h2>
          <p className="text-gray-300 text-xs sm:text-md text-center">
            Practice conversations, make friends, and improve your language
            skills together
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
