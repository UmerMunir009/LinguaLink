import { useChannelStateContext } from "stream-chat-react";
import { ArrowLeft, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { showErrorToast,showSuccessToast } from "../utils/toast";


const ChatHeader = ({ currentUserId,client }) => {
  const { channel } = useChannelStateContext();
  const navigate = useNavigate();

  const members = Object.values(channel.state.members);
  const initialOtherUser  = members.find((m) => m.user?.id !== currentUserId);
  const [otherUser, setOtherUser] = useState(initialOtherUser?.user);

  useEffect(() => {
    if (!channel) return;

    // Update on presence changes
    const handlePresence = (event) => {
      if (event.user?.id === initialOtherUser?.user?.id) {
        setOtherUser(event.user);
      }
    };

    client.on("user.presence.changed", handlePresence);

    return () => {
      client.off("user.presence.changed", handlePresence);
    };
  }, [client, initialOtherUser]);

   const handleCall = async () => {
    if (!channel) return;

    const callUrl = `${window.location.origin}/call/${channel.id}`;
    try {
      await channel.sendMessage({
        text: `📞 Join the video call: ${callUrl}`
         });
        showSuccessToast('Video call link sent Successfully')
    } catch (error) {
      showErrorToast("Failed to send call link.Please try again later");
    }
  };

  return (
    <div className="flex items-center justify-between p-3 bg-white border-b border-gray-300">
      <div className="flex justify-start items-center gap-5">
      <button
        onClick={() => navigate("/friends")}
        className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-green-600 transition"
      >
        <ArrowLeft className="w-5 h-5" />
       </button>

      <div className="flex items-center gap-3">
        <img
          src={otherUser?.image || "/default-avatar.png"}
          alt={otherUser?.name}
          className="w-10 h-10 rounded-full bg-green-900"
        />
        <div>
          <p className="font-semibold text-gray-900">
            {otherUser?.name}
          </p>
          <p className="text-sm text-gray-600">
            {otherUser?.online ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      </div>

      <button
        onClick={handleCall}
        className="p-2 rounded-full hover:bg-green-100  cursor-pointer transition"
      >
        <Video className="w-6 h-6 text-green-600" />
      </button>
    </div>
  );
};

export default ChatHeader;
