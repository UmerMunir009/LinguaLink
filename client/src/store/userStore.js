import { create } from "zustand";
import {showErrorToast,showSuccessToast} from '../utils/toast'
import axiosInstance from "../utils/axios";
import { persist } from "zustand/middleware";


export const userStore = create(persist((set, get) => ({

    newLearners:[],
    isNewLearnersLoading:false,

    friends:[],
    isFriendsLoading:false,


     getNewLearners: async () => {
        set({ isNewLearnersLoading: true });
        try {
          const res = await axiosInstance.get("users/recommended");
          set({ newLearners: res.data.data });
        } catch (error) {
          if (error.response) {
            showErrorToast(error.response.data.message);
          } else if (error.request) {
            showErrorToast("No response from server.");
          } else {
            showErrorToast("Unexpected error occurred.");
          }
        } finally {
          set({ isNewLearnersLoading: false });
        }
      },

     getFriends: async () => {
        set({ isFriendsLoading: true });
        try {
          const res = await axiosInstance.get("/users/friends");
          set({ friends: res.data.data });
        } catch (error) {
          if (error.response) {
            showErrorToast(error.response.data.message);
          } else if (error.request) {
            showErrorToast("No response from server.");
          } else {
            showErrorToast("Unexpected error occurred.");
          }
        } finally {
          set({ isFriendsLoading: false });
        }
      },


}),{
      name: "test",
      partialize: (state) => ({
        newLearners: state.newLearners,
      }),
    }));
