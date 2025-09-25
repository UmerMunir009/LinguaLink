import { useState, useEffect } from "react";
import PostActions from "../components/PostActions";
import { UserPlus, Loader2 } from "lucide-react";
import axiosInstance from "../utils/axios";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { userStore } from "../store/userStore";

const hideScrollbarStyle = `
  .hide-scrollbar {
    -ms-overflow-style: none;  
    scrollbar-width: none;    
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;             
  }
`;

export default function CulturalFeed() {
  const { friends, getFriends } = userStore();
  const [posts, setPosts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [formData, setFormData] = useState({
    type: "text",
    title: "",
    description: "",
    content: "",
    media: null,
    category: "food",
  });

  const fetchPosts = async (append = false) => {
    if (append) {
      setLoadingMore(true);
    } else {
      setIsLoading(true);
    }

    try {
      const res = await axiosInstance.get(`/post/feed?page=${page}&limit=10`);
      if (res.data.data.length > 0) {
        setPosts((prev) =>
          append ? [...prev, ...res.data.data] : res.data.data
        );
        setHasMore(res.data.hasMore);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error(err);
    }

    if (append) {
      setLoadingMore(false);
    } else {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };
    useEffect(() => {
      getFriends();
    }, [getFriends]);

  useEffect(() => {
    if (page === 1) {
      fetchPosts(false);
    } else {
      fetchPosts(true);
    }
  }, [page]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const postData = new FormData();
    postData.append("type", formData.type);
    postData.append("title", formData.title);
    postData.append("description", formData.description || "");
    postData.append("category", formData.category);
    postData.append("content", formData.content);
    if (formData.media) postData.append("media", formData.media);

    try {
      const response = await axiosInstance.post("/post/create", postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setIsModalOpen(false);
      setFormData({
        type: "text",
        title: "",
        description: "",
        content: "",
        media: null,
        category: "food",
      });
    } catch (error) {
      console.error("Error creating post:", error.response || error);
      showErrorToast("Error in uploading");
    }
    showSuccessToast("Post uploaded successfully");
    setSubmitting(false);
  };

  return (
    <>
      <style>{hideScrollbarStyle}</style>

      <div className="h-screen bg-gray-900 text-white p-4 flex justify-center overflow-hidden">
        <div className="w-full max-w-2xl flex flex-col">
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <h1 className="text-lg sm:text-2xl font-bold text-green-500">
              Cultural Exchange
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-2 sm:px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition"
            >
              Add Post
            </button>
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 px-5 z-50">
              <div className="bg-gray-800 p-3 rounded-xl w-full max-w-md shadow-xl animate-fadeIn">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-green-500">
                    Create Post
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-white transition text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>

                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={formData.description || ""}
                    onChange={handleChange}
                    placeholder="Description (optional)"
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="food">Food</option>
                    <option value="music">Music</option>
                    <option value="tradition">Tradition</option>
                    <option value="fact">Fun Fact</option>
                    <option value="meme">Meme</option>
                    <option value="educational">Educational</option>
                  </select>

                  {formData.type === "text" && (
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleChange}
                      placeholder="Write your post..."
                      className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      rows="4"
                      required
                    />
                  )}

                  {(formData.type === "image" || formData.type === "video") && (
                    <div className="w-full">
                      {formData.media ? (
                        <div className="relative w-full h-64 rounded-lg overflow-hidden border-2 border-green-500 bg-gray-700 flex items-center justify-center">
                          {formData.type === "image" && (
                            <img
                              src={URL.createObjectURL(formData.media)}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          )}
                          {formData.type === "video" && (
                            <video
                              src={URL.createObjectURL(formData.media)}
                              controls
                              className="w-full h-full object-cover"
                            />
                          )}

                          <label className="absolute top-2 right-2 bg-gray-800 text-green-500 px-2 py-1 rounded cursor-pointer hover:bg-gray-700">
                            Change
                            <input
                              type="file"
                              name="media"
                              accept={formData.type + "/*"}
                              onChange={handleChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-500 rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition">
                          <span className="text-white text-sm">
                            Upload {formData.type}
                          </span>
                          <input
                            type="file"
                            name="media"
                            accept={formData.type + "/*"}
                            onChange={handleChange}
                            className="hidden"
                            required
                          />
                        </label>
                      )}
                    </div>
                  )}

                  <div className="flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      disabled={submitting}
                      className={`px-4 py-2 rounded-lg transition ${
                        submitting
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={submitting}
                      className={`px-4 py-2 rounded-lg shadow-md flex items-center justify-center gap-2 ${
                        submitting
                          ? "bg-green-400 cursor-not-allowed"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {submitting && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      {submitting ? "Posting..." : "Post"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex-1 overflow-y-auto hide-scrollbar space-y-6 pr-2">
            {isLoading ? (
              <div className="flex justify-center mt-10">
                <Loader2 className="w-12 h-12 animate-spin text-green-500" />
              </div>
            ) : posts.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">
                No posts available
              </p>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            post.user?.profilePic || "https://i.pravatar.cc/150"
                          }
                          alt={post.user?.name}
                          className="w-12 h-12 rounded-full border-2 border-green-500"
                        />
                        <div>
                          <h3 className="font-semibold text-green-400 text-lg">
                            {post.user?.name}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {post.user?.nativeLanguage}
                          </p>
                        </div>
                      </div>
                      {!friends.some((f) => f.id === post.user?.id) && (
                        <button className="flex cursor-pointer hover:bg-green-800 items-center gap-2 px-3 py-1.5 bg-gray-800 border-2 border-green-500 text-green-500 font-semibold text-sm rounded-full shadow-sm hover:shadow-md transition">
                          <UserPlus className="w-4 h-4" />
                          <span className="hidden sm:inline">Add Friend</span>
                        </button>
                      )}
                    </div>

                    <h4 className="font-bold text-green-500 text-lg mb-2">
                      {post.title}
                    </h4>
                    <p className="text-gray-200 text-[10px] sm:text-sm mb-3">
                      {post.content}
                    </p>

                    {post.type === "image" && (
                      <img
                        src={post.mediaUrl}
                        alt={post.title}
                        className="w-full rounded-lg mb-3"
                      />
                    )}
                    {post.type === "video" && (
                      <video
                        src={post.mediaUrl}
                        controls
                        className="w-full rounded-lg mb-3"
                      />
                    )}

                    <PostActions postId={post.id} initiallySaved={post.saved}  initiallyLiked={post.liked}/>
                  </div>
                ))}
                {hasMore && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="px-4 py-2 bg-green-600 cursor-pointer text-white rounded flex items-center gap-2"
                    >
                      {loadingMore && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      {loadingMore ? "Loading..." : "Load More"}
                    </button>
                  </div>
                )}
                {!hasMore && (
                  <div className="flex justify-center mt-4">
                    <p>You all caught up</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
