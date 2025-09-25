import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authStore } from "../store/authStore";
import { chatStore } from "../store/chatStore";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import { showErrorToast } from "../utils/toast";
import { Loader2 } from "lucide-react";
import ChatHeader from "../components/ChatHeader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const generateChannelId = (user1, user2) => {
  const sorted = [user1, user2].sort().join("-");
  return btoa(sorted)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 50);
};

const ChatPage = () => {
  const { authUser } = authStore();
  const { getStreamToken, streamToken } = chatStore();

  const { id: targetUserId } = useParams();
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  let client;

  useEffect(() => {
    if (!authUser) return;

    const initChat = async () => {
      let token = streamToken;
      try {
        if (!token) {
          token = await getStreamToken();
        }
        client = StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser(
          {
            id: authUser.id,
            name: authUser.name,
            image: authUser.profilePic || undefined,
          },
          token,
          { enable_presence: true }
        );

        const channelId = generateChannelId(authUser.id, targetUserId);

        // 1-to-1 chat channel
        const newChannel = client.channel("messaging", channelId, {
          members: [authUser.id, targetUserId],
        });

        await newChannel.watch({ presence: true });

        setChatClient(client);
        setChannel(newChannel);
      } catch (error) {
        console.error("Stream Chat init error:", error);
        showErrorToast("Failed to initialize chat.");
      } finally {
        setLoading(false);
      }
    };
    initChat();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, [authUser, targetUserId]);

  if (loading || !chatClient || !channel) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <Loader2 className="w-10 h-10 text-green-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-900 text-white">
      <Chat client={chatClient} theme="messaging dark">
        <Channel channel={channel}>
          <Window>
            <ChatHeader currentUserId={authUser.id} client={chatClient} />
            <MessageList />
            <MessageInput focus />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
