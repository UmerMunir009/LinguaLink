import React from "react";
import { Navigate, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import FriendsPage from "./pages/FriendsPage";
import NotificationPage from "./pages/NotificationPage";
import Layout from "./pages/Layout";
import ChatPage from "./pages/ChatPage";
import CallPage from './pages/CallPage'

import { useAuth } from "./customHooks/useAuth";
import { authStore } from "./store/authStore";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { AnimatePresence, motion } from "framer-motion";
import CulturalExchangePage from "./pages/CulturalExchangePage";

const App = () => {
  const { isCheckingAuth } = useAuth();
  const { authUser } = authStore();

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex bg-gray-900 justify-center items-center h-screen">
        <Loader size={40} className="text-green-500 animate-spin" />
      </div>
    );
  }

  const ProtectedRoute = ({ children, authUser }) => {
    if (!authUser) return <Navigate to="/sign-up" replace />;
    if (!authUser.isOnBoarded) return <Navigate to="/onboarding" replace />;
    return children;
  };

  return (
    <div>
      <Toaster position="top-right" />
      <AnimatePresence mode="wait">
        <motion.div
          key={authUser ? "authed" : "guest"} //this will only work for signUp/Login and Home screen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                  <ProtectedRoute authUser={authUser}>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="friends"
                element={
                  <ProtectedRoute authUser={authUser}>
                    <FriendsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="culturalFeed"
                element={
                  <ProtectedRoute authUser={authUser}>
                    <CulturalExchangePage />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route
              path="/sign-up"
              element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
            />
            <Route
              path="/onboarding"
              element={
                authUser && !authUser.isOnBoarded ? (
                  <OnboardingPage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
                path="/chat/:id"
                element={
                  <ProtectedRoute authUser={authUser}>
                    <ChatPage />
                  </ProtectedRoute>
                }
              />

            <Route
                path="/call/:id"
                element={
                  <ProtectedRoute authUser={authUser}>
                    <CallPage />
                  </ProtectedRoute>
                }
              />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
export default App