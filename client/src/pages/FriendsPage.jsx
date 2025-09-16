import React, { useEffect } from "react";
import { userStore } from "../store/userStore";
import { Loader2 ,MessageCircle} from "lucide-react";
import { useNavigate } from "react-router-dom"; // assuming you use react-router

const FriendsPage = () => {
  const { friends, isFriendsLoading, getFriends } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    getFriends();
  }, [getFriends]);

  const openChat = (friendId) => {
    navigate(`/chat/${friendId}`);
  };

  return (
    <div className="px-4 sm:px-8 pt-6 min-h-screen bg-gray-900">
      <h1 className="text-lg sm:text-2xl font-bold text-white mb-4">
        Friends
      </h1>

      {isFriendsLoading ? (
        <div className="flex justify-center items-center mt-14">
          <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
        </div>
      ) : friends.length === 0 ? (
        <div className="flex flex-col justify-center items-center mt-14 text-center">
          <p className="text-gray-300 text-md sm:text-lg font-medium">
            No friends yet.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">
            Connect with people to start chatting!
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => openChat(friend.id)}
              className="flex items-center gap-4 p-3 rounded-xl cursor-pointer 
                         hover:bg-gray-800 transition border border-gray-700/40"
            >
              <img
                src={friend.profilePic}
                alt={friend.name}
                className="w-12 h-12 rounded-full border-2 border-green-500"
              />
              <div className="flex-1">
                <h3 className="text-white font-semibold">{friend.name}</h3>
                <p className="text-gray-400 text-xs">
                  {friend.location || "Available to chat"}
                </p>
              </div>
              <MessageCircle className="text-xs text-green-400" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;
