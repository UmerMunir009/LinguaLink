import { create } from "zustand";
import {showErrorToast,showSuccessToast} from '../utils/toast'
import axiosInstance from "../utils/axios";
import { persist } from "zustand/middleware";


export const userStore = create(persist((set, get) => ({

    newLearners:[],
    isNewLearnersLoading:false,

    friends:[],
    isFriendsLoading:false,

    isPendingLoading:false,
    pendingRequests:[],

    isAcceptingRequest:false,
    isRejectingRequest:false,
    

     getNewLearners: async () => {
        set({ isNewLearnersLoading: true });
        try {
          const res = await axiosInstance.get("users/recommended");
          set({ newLearners: res.data.data });
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.message);
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
            console.log(error.response.data.message);
          } else if (error.request) {
            showErrorToast("No response from server.");
          } else {
            showErrorToast("Unexpected error occurred.");
          }
        } finally {
          set({ isFriendsLoading: false });
        }
      },
      
      sendFriendReq: async (id) => {
        try {
          const res = await axiosInstance.post(`/users/friend-request/${id}`);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.message);
          } else if (error.request) {
            showErrorToast("No response from server.");
          } else {
            showErrorToast("Unexpected error occurred.");
          }
        } finally {
          showSuccessToast('Request Sent')
        }
      },

      acceptFriendReq: async (id) => {
        try {
          set({ isAcceptingRequest: true });
          await axiosInstance.patch(`/users/friend-request/${id}/accept`);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.message);
          } else if (error.request) {
            showErrorToast("No response from server.");
          } else {
            showErrorToast("Unexpected error occurred.");
          }
        } finally {
          set({ isAcceptingRequest: false });
          showSuccessToast('Request Accepted')
        }
      },

      rejectFriendReq: async (id) => {
        try {
          set({ isRejectingRequest: true });
          await axiosInstance.patch(`/users/friend-request/${id}/accept`);
        } catch (error) {
          if (error.response) {
            console.log(error.response.data.message);
          } else if (error.request) {
            showErrorToast("No response from server.");
          } else {
            showErrorToast("Unexpected error occurred.");
          }
        } finally {
          set({ isRejectingRequest: false });
          showSuccessToast('Request Rejected')
        }
      },

      getPendingRequests: async () => {
         try {
           set({ isPendingLoading: true });
           const res = await axiosInstance.get("users/friend-request/pending");
           set({ pendingRequests: res.data.data });
         } catch (error) {
           if (error.response) {
             console.log(error.response.data.message);
           } else if (error.request) {
             showErrorToast("No response from server.");
           } else {
             showErrorToast("Unexpected error occurred.");
           }
         } finally {
           set({ isPendingLoading: false });
         }
       },

    }),{
      name: "test",
      partialize: (state) => ({
        newLearners: state.newLearners,
      }),
    }));
