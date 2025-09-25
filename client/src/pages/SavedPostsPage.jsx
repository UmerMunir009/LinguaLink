import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Loader2, Bookmark } from "lucide-react";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const SavedPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unsavingId, setUnsavingId] = useState(null);

  const fetchSavedPosts = async () => {
    try {
      const res = await axiosInstance.get("/post/saved-posts");
      setPosts(res.data.data);
    } catch (error) {
     if (error.response) {
        showErrorToast(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const handleUnsave = async (id) => {
    setUnsavingId(id);
    try {
      await axiosInstance.post(`/post/toggle-save/${id}`); 
      showSuccessToast("Post unsaved ");
      fetchSavedPosts();
    } catch (error) {
      if (error.response) {
        showErrorToast(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    } finally {
      setUnsavingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-green-500 mb-6 text-center">
        Saved Posts
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post?.post.id}
              className="bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={post?.post?.user?.profilePic}
                  alt={post?.post?.user?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-green-400 font-semibold">
                    {post?.post?.user?.name}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {post?.post?.user?.nativeLanguage}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-green-400 text-lg">
                  {post?.post.title}
                </h2>
                <button
                  onClick={() => handleUnsave(post?.post.id)}
                  className="text-yellow-400 hover:text-yellow-300 transition cursor-pointer"
                >
                  {unsavingId === post?.post.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Bookmark size={22} fill="green" /> 
                  )}
                </button>
              </div>

              {post?.post.type === "image" && (
                <img
                  src={post?.post.mediaUrl}
                  alt={post?.post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {post?.post.type === "video" && (
                <video
                  src={post?.post.mediaUrl}
                  controls
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {post?.post.type === "text" && (
                <div className="bg-gray-700 p-3 text-[10px] rounded-lg text-gray-100">
                  {post?.post.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedPostsPage;
