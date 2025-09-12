import React, { useEffect, useState } from "react";
import LearnerCard from "./LearnerCard";
import { userStore } from "../store/userStore";
import { Loader2, Users } from "lucide-react";
import FriendCard from "./FriendCard";
import FriendRequestsModal from "./FriendRequestsModal";

const Friends = () => {
  const { friends, isFriendsLoading, getFriends } = userStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  return (
    <div className="px-6 pt-10 ">
      <div className="flex justify-between">
        <h1 className="text-lg sm:text-2xl font-bold text-white">
          Your Friends
        </h1>
        <div
          onClick={() => setIsModalOpen(true)}
          className="flex justify-center items-center cursor-pointer gap-2 bg-green-800 px-2 py-1 rounded-2xl border border-white/20 hover:bg-green-700 transition"
        >
          <Users className="w-4 text-white " />
          <button className="text-xs text-white cursor-pointer">
            Friend Requests
          </button>
        </div>
      </div>

      {isFriendsLoading ? (
        <div className="flex justify-center items-center mt-14">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
        </div>
      ) : (
        <div className="grid gap-6 mt-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {friends.map((friend, idx) => (
            <FriendCard key={idx} friend={friend} />
          ))}
        </div>
      )}

      <FriendRequestsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Friends;
