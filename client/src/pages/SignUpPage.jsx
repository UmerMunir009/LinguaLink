import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./../customHooks/useAuth";
import { Loader } from "lucide-react";
import { showErrorToast, showSuccessToast } from "../utils/toast";

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
    const data = {
      name: fullName,
      email,
      password,
    };
    await signUp(data);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-900 text-white">
      <div className="md:w-1/2 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-6 text-green-500">LinguaLink</h1>
        <p className="mb-8 text-gray-400">
          Join LinguaLink and start your language learning journey
        </p>
        <form
          className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
              className="w-full p-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
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
            <p className="text-sm text-gray-400">
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
            <span className="text-green-500 underline cursor-pointer">
              Sign in
            </span>
          </p>
        </form>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex justify-center items-center p-8">
        <div className="bg-green-900 rounded-lg p-6 w-full max-w-md flex flex-col items-center">
          <div className="bg-green-800 rounded-lg p-4 w-full flex flex-col items-center">
            <div className="w-32 h-32 bg-gray-700 rounded-full mb-4 flex items-center justify-center">
              <span className="text-white text-2xl">👤</span>
            </div>
            <h2 className="text-white text-lg font-bold mb-2">
              Connect with language partners worldwide
            </h2>
            <p className="text-gray-300 text-center">
              Practice conversations, make friends, and improve your language
              skills together
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
