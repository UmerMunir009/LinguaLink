import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Loader2, Trash2, Heart } from "lucide-react";
import { showSuccessToast, showErrorToast } from "../utils/toast";

const MyPostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMyPosts = async () => {
    try {
      const res = await axiosInstance.get("/post/my-posts");
      setPosts(res.data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axiosInstance.delete(`/post/my-posts/${id}`);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else if (error.request) {
        showErrorToast("No response from server.");
      } else {
        showErrorToast("Unexpected error occurred.");
      }
    }
    setDeletingId(null);
    showSuccessToast("Post Deleted Successfully");
    fetchMyPosts();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold text-green-500 mb-6 text-center">
        My Posts
      </h1>

      {isLoading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-400">No posts found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-green-400 text-lg">
                  {post.title}
                </h2>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-red-500 hover:text-red-400 transition cursor-pointer"
                >
                  {deletingId === post.id ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <Trash2 size={18} />
                  )}
                </button>
              </div>

              <p className="text-gray-300 text-sm mb-3">{post.type}</p>

              <div className="w-full h-50 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
                {post.type === "image" && (
                  <img
                    src={post.mediaUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                )}

                {post.type === "video" && (
                  <video
                    src={post.mediaUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                )}

                {post.type === "text" && (
                  <div className="p-3 text-[10px] text-gray-100  overflow-hidden">
                    <p className="line-clamp-12">{post.content}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-3 text-gray-300">
                <Heart size={18} className="text-green-500" fill="currentColor" />
                <span className="text-sm font-medium">
                  {post.likes || 0} {post.likes === 1 ? "Like" : "Likes"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
