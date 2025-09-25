import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { Loader2, Trash2 } from "lucide-react";
import { showSuccessToast ,showErrorToast} from "../utils/toast";

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

              {post.type === "image" && (
                <img
                  src={post.mediaUrl}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {post.type === "video" && (
                <video
                  src={post.mediaUrl}
                  controls
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              {post.type === "text" && (
                <div className="bg-gray-700 p-3 text-[10px] rounded-lg text-gray-100">
                  {post.content}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPostsPage;
