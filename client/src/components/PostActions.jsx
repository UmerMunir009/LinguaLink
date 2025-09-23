import { Heart, Bookmark, MessageCircle } from "lucide-react";

export default function PostActions() {
  return (
    <div className="flex justify-between items-center mt-3 border-t border-gray-700 pt-3">
      <div className="flex gap-5">
        <button className="flex items-center gap-1 text-green-500 hover:text-green-400 font-semibold transition">
          <Heart size={18} />
          <span className="hidden sm:inline">Like</span>
        </button>
        <button className="flex items-center gap-1 text-green-500 hover:text-green-400 font-semibold transition">
          <Bookmark size={18} />
          <span className="hidden sm:inline">Save</span>
        </button>
      </div>
      <button className="flex items-center gap-1 text-green-500 hover:text-green-400 font-semibold transition">
        <MessageCircle size={18} />
        <span className="hidden sm:inline">Comment</span>
      </button>
    </div>
  );
}
