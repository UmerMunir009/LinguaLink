import { Heart, Bookmark, MessageCircle, Loader2 } from "lucide-react";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import axiosInstance from "../utils/axios";
import { useState, useEffect } from "react";

export default function PostActions({ postId, initiallySaved  }) {
  const [savingId, setSavingId] = useState(null);
  const [isSaved, setIsSaved] = useState(initiallySaved);

  const toggleSave = async (id) => {
    try {
      setSavingId(id);
      const res = await axiosInstance.post(`/post/toggle-save/${id}`);
      setIsSaved((prev) => !prev);

      showSuccessToast(res.data.message);
    } catch (error) {
      if (error.response) {
        showErrorToast(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    } finally {
      setSavingId(null);
    }
  };

  return (
    <div className="flex justify-between items-center mt-3 border-t border-gray-700 pt-3">
      <div className="flex gap-5">
        <button className="flex items-center cursor-pointer gap-1 text-green-500 hover:text-green-400 font-semibold transition">
          <Heart size={18} />
          <span className="hidden sm:inline">Like</span>
        </button>

        <button
          onClick={() => toggleSave(postId)}
          className="flex items-center cursor-pointer gap-1 text-green-500 hover:text-green-400 font-semibold transition"
        >
          {savingId ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Bookmark
                size={18}
                fill={isSaved ? "currentColor" : "none"} 
              />
              <span className="hidden sm:inline">
                {isSaved ? "Unsave" : "Save"}
              </span>
            </>
          )}
        </button>
      </div>

      <button className="flex items-center cursor-pointer gap-1 text-green-500 hover:text-green-400 font-semibold transition">
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Comment</span>
      </button>
    </div>
  );
}
