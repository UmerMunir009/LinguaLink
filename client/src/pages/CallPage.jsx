import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authStore } from "../store/authStore";
import { chatStore } from "../store/chatStore";
import { showSuccessToast } from "../utils/toast";
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { authUser } = authStore();
  const { getStreamToken, streamToken } = chatStore();
  const { id: callId } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  useEffect(() => {
    if (!authUser) return;

    let videoClient;

    const initCall = async () => {
      try {
        let token = streamToken;
        if (!token) {
          token = await getStreamToken();
        }

        const user = {
          id: authUser.id,
          name: authUser.name,
          image: authUser.profilePic || undefined,
        };

        videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("Stream Video init error:", error);
      } finally {
        setIsConnecting(false);
      }
    };

    initCall();

    return () => {
      if (videoClient) {
        videoClient.disconnectUser();
      }
    };
  }, [authUser, callId]);

  if (isConnecting) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p>Connecting to call...</p>
      </div>
    );
  }

  if (!client || !call) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-red-400">
        <p>Failed to join the call</p>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme>
        <StreamCall call={call}>
          <CallContent call={call} />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};

const CallContent = ({ call }) => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();


  useEffect(() => {
    if (callingState === CallingState.LEFT) {
      window.close()
    }
    
  }, [callingState]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-1">
        <SpeakerLayout />
      </div>
      <div className="border-t border-gray-800 p-3">
        <CallControls />
      </div>
    </div>
  );
};

export default CallPage;
