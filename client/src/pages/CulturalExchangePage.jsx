import { useState } from "react";
import { Heart, Bookmark, MessageCircle } from "lucide-react";
import PostActions from '../components/PostActions'

const dummyPosts = [
  {
    id: 1,
    type: "text",
    user: "Ali",
    avatar: "https://i.pravatar.cc/150?img=1",
    language: "Urdu",
    title: "Eid Celebration",
    content: "Sharing how we celebrate Eid in my country 🎉",
  },
  {
    id: 2,
    type: "image",
    user: "Marie",
    avatar: "https://i.pravatar.cc/150?img=2",
    language: "French",
    title: "French Recipe",
    content: "Here's a simple Croissant recipe 🥐",
    media: "https://images.unsplash.com/photo-1604908177520-22f56c17c759?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    type: "video",
    user: "Juan",
    avatar: "https://i.pravatar.cc/150?img=3",
    language: "Spanish",
    title: "Local Song",
    content: "Check out this traditional song from my region 🎵",
    media: "https://sample-videos.com/video123/mp4/480/asdasdas.mp4",
  },
  {
    id: 4,
    type: "audio",
    user: "Li",
    avatar: "https://i.pravatar.cc/150?img=4",
    language: "Chinese",
    title: "Tea Ceremony Music",
    content: "A calm background music for tea ceremony 🍵",
    media: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
];

export default function CulturalFeed() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "food",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post submitted:", formData);
    setIsModalOpen(false);
    setFormData({ title: "", content: "", category: "food" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex justify-center">
      <div className="w-full max-w-2xl">
        {/* Top Add Post Button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-green-500">Cultural Exchange</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow-md hover:shadow-lg transition"
          >
            Add Post
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-800 p-6 rounded-xl w-full max-w-md shadow-xl animate-fadeIn">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-green-500">Create Post</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition"
                >
                  ✕
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  placeholder="Content"
                  className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows="4"
                  required
                ></textarea>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="food">Food</option>
                  <option value="music">Music</option>
                  <option value="tradition">Tradition</option>
                  <option value="fact">Fun Fact</option>
                  <option value="meme">Meme</option>
                </select>
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg shadow-md transition"
                  >
                    Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Feed Posts */}
        <div className="space-y-6">
          {dummyPosts.map((post) => (
            <div
              key={post.id}
              className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-2xl transition"
            >
              {/* User Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.user}
                    className="w-12 h-12 rounded-full border-2 border-green-500"
                  />
                  <div>
                    <h3 className="font-semibold text-green-400 text-lg">{post.user}</h3>
                    <p className="text-gray-400 text-sm">{post.language}</p>
                  </div>
                </div>
                <button className="text-green-500 hover:text-green-400 text-sm font-semibold">
                  Add Friend
                </button>
              </div>

              {/* Post Content */}
              <h4 className="font-bold text-green-500 text-lg mb-2">{post.title}</h4>
              <p className="text-gray-200 mb-3">{post.content}</p>

              {/* Media Preview */}
              {post.type === "image" && (
                <img
                  src={post.media}
                  alt={post.title}
                  className="w-full rounded-lg mb-3"
                />
              )}
              {post.type === "video" && (
                <video
                  src={post.media}
                  controls
                  className="w-full rounded-lg mb-3"
                />
              )}
              {post.type === "audio" && (
                <audio
                  src={post.media}
                  controls
                  className="w-full mb-3"
                />
              )}

              {/* Post Actions */}
              <PostActions />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
