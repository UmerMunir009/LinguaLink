import { create } from "zustand";
import {showErrorToast,showSuccessToast} from '../utils/toast'
import axiosInstance from "../utils/axios";


export const chatStore = create((set) => ({

    streamToken:null,
       

     getStreamToken: async () => {
        try {
          const res = await axiosInstance.get("/chat/stream-token");
          set({ streamToken: res.data.token });
          return res.data.token
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.message);
          } else if (error.request) {
            showErrorToast("No response from server.");
          } else {
            showErrorToast("Unexpected error occurred.");
          }
        }
      },
}));
