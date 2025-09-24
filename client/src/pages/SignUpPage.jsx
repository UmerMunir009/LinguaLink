import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./../customHooks/useAuth";
import { Loader } from "lucide-react";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const { signUp, signingUp } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      showErrorToast(
        "You must agree to our terms of service and privacy policy"
      );
      return;
    }
    const data = { name: fullName, email, password };
    await signUp(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center p-4">
      <div className="max-w-6xl w-full border-1 border-green-600 rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-1/2 bg-gray-900 p-3 md:p-6 flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center mb-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 "
            />
            <h1 className="text-3xl font-bold text-green-500">LinguaLink</h1>
          </div>

          <p className="mb-5 text-gray-300 text-center text-sm">
            Join LinguaLink and start your language learning journey
          </p>

          <form
            className="bg-gray-800 p-4 rounded-lg shadow-inner w-full"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="XYZ"
                required
              />
            </div>

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

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                checked={agree}
                onChange={() => setAgree(!agree)}
                className="mr-2 accent-green-500 cursor-pointer"
              />
              <p className="text-xs md:text-sm text-gray-400">
                I agree to the{" "}
                <span className="text-green-500 underline cursor-pointer">
                  terms of service
                </span>{" "}
                and{" "}
                <span className="text-green-500 underline cursor-pointer">
                  privacy policy
                </span>
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white p-3 cursor-pointer rounded font-semibold flex justify-center items-center"
            >
              {signingUp ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>

            <p className="mt-4 text-sm text-gray-400">
              Already have an account?{" "}
             <Link to="/login" className="link link-primary text-green-500 underline cursor-pointer">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="md:w-1/2 bg-green-900 p-8 flex flex-col justify-center items-center">
          <img
            className="h-50 sm:h-70"
            src="/sign_up_pic.png"
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

export default SignUpPage;
