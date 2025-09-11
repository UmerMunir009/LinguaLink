import { toast } from "react-hot-toast";

export const showErrorToast = (message) => {
  toast.error(message, {
    style: {
      background: "#1f2937",
      color: "#f87171",     
      fontWeight: "500",
      borderRadius: "8px",
      padding: "12px 16px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      border: "1px solid #f87171",
    },
    iconTheme: {
      primary: "#f87171",
      secondary: "#1f2937",
    },
  });
};

export const showSuccessToast = (message) => {
  toast.success(message, {
    style: {
      background: "#1f2937",
      color: "#10b981",       
      fontWeight: "500",
      borderRadius: "8px",
      padding: "12px 16px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      border: "1px solid #10b981",
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#1f2937",
    },
  });
};
