import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axiosInstance from "../utils/axios";
import { authStore } from "../store/authStore";
import { showErrorToast, showSuccessToast } from "../utils/toast";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const { setAuthUser } = authStore();
  const [isCheckingAuth, setCheckingAuth] = useState(true);
  const [signingUp, setSigningUp] = useState(false);
  const [logging, setLogging] = useState(false);
  const [onboarding, setOnboarding] = useState(false);

  const checkAuth = async () => {
    setCheckingAuth(true);
    try {
      const response = await axiosInstance.get("/auth/checkAuth");
      setAuthUser(response.data.data);
    } catch (error) {
      if (error.response) {
        showErrorToast(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    } finally {
      setCheckingAuth(false);
    }
  };

  const signUp = async (data) => {
    try {
      setSigningUp(true);
      const response = await axiosInstance.post("/auth/sign-up", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setAuthUser(response.data.data);
      showSuccessToast("Sign-up Successfull");
    } catch (error) {
      if (error.response) {
        showErrorToast(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    } finally {
      setSigningUp(false);
    }
  };
  const onBoard = async (formdata) => {
    try {
      setOnboarding(true);
      const { bio, nativeLanguage, learningLanguage, location, updatedPic } = formdata;
      const response = await axiosInstance.post("/auth/onboarding", {
        bio,
        nativeLanguage,
        learningLanguage,
        location,
        updatedPic,
      });

      setAuthUser(response.data.data);
      console.log(response.data.data)
      showSuccessToast("On-boarding completed");
    } catch (error) {
      if (error.response) {
        showErrorToast(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    } finally {
      setOnboarding(false);
    }
  };

  const Login = async (formData) => {
    try {
      setLogging(true);
     const { email,password } = formData;
      const response = await axiosInstance.post("/auth/login", {email,password});
      setAuthUser(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      if (error.response) {
        showErrorToast(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    } finally {
      setLogging(false);
    }
  };

  // const Logout = async () => {
  //   try {
  //     const response = await axiosInstance.post("/auth/logout");
  //     toast.success(response.data.message);
  //     localStorage.removeItem("token");
  //     setAuthUser(null);
  //     disconnectSocket(); //disconnecting right after the logout
  //   } catch (error) {
  //     if (error.response) {
  //       toast.error(error.response.data.message);
  //     } else if (error.request) {
  //       toast.error("No response from server.");
  //     } else {
  //       toast.error("Unexpected error occurred.");
  //     }
  //   } finally {
  //     setLogging(false);
  //   }
  // };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signingUp,
        signUp,
        onBoard,
        onboarding,
        logging,
        Login,
        // Logout,
        isCheckingAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
