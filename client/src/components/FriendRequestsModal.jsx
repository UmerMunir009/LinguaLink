import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2 } from "lucide-react";
import { userStore } from "../store/userStore";

const FriendRequestsModal = ({ isOpen, onClose }) => {
  const {
    getPendingRequests,
    pendingRequests,
    isPendingLoading,
    acceptFriendReq,
    rejectFriendReq,
    getFriends,
    isAcceptingRequest,
    isRejectingRequest,
  } = userStore();

  useEffect(() => {
    if (isOpen) {
      getPendingRequests();
    }
  }, [isOpen, getPendingRequests]);

  const acceptRequest = async (id) => {
    await acceptFriendReq(id);
    await getPendingRequests();
    await getFriends();
  };
  const rejectRequest = async (id) => {
    await rejectFriendReq(id);
    await getPendingRequests();
    await getFriends();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex mx-3 justify-center items-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-xl 
                       border border-green-700/40 w-full max-w-2xl p-6 relative"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-white"
            >
              <X size={22} />
            </button>

            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              Friend Requests
              {pendingRequests.length > 0 && !isPendingLoading && (
                <span className="text-sm bg-green-700/40 text-green-400 px-2 py-0.5 rounded-md">
                  {pendingRequests?.length}
                </span>
              )}
            </h2>

            {isPendingLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="w-6 h-6 text-green-400 animate-spin" />
              </div>
            ) : pendingRequests.length === 0 ? (
              <p className="text-gray-400 text-sm">No pending requests</p>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {pendingRequests.map((req) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800/60 rounded-xl border border-gray-700/50 
                               p-4 flex flex-col sm:flex-row items-start justify-start sm:items-center sm:justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={req?.user.profilePic}
                        alt={req?.user.name}
                        className="w-12 h-12 rounded-full border-2 border-green-500"
                      />
                      <div>
                        <h3 className="text-white font-semibold">
                          {req?.user.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {req?.user.location}
                        </p>
                        <div className="flex gap-2 mt-1 flex-wrap">
                          <span className="text-[8px] sm:text-xs px-2 py-0.5 bg-green-900/40 text-green-400 rounded-md">
                            🌐 Native: {req?.user.nativeLanguage}
                          </span>
                          <span className="text-[8px] sm:text-xs px-2 py-0.5 bg-gray-700/50 text-gray-200 rounded-md">
                            🎯 Learning: {req?.user.learningLanguage}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => acceptRequest(req.id)}
                        className="px-10 sm:px-3 py-1.5 bg-green-600 cursor-pointer hover:bg-green-500 text-white text-sm rounded-lg"
                      >
                        {isAcceptingRequest ? (
                         'Accepting...'
                        ) : (
                          "Accept"
                        )}
                      </button>
                      <button
                        onClick={() => rejectRequest(req.id)}
                        className="px-10 sm:px-3 py-1.5 bg-red-600 cursor-pointer hover:bg-red-500 text-white text-sm rounded-lg"
                      >
                       {isRejectingRequest ? ('Rejecting...') : (
                          "Reject"
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FriendRequestsModal;
