import { UserPlus } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";

const LearnerCard = ({ learner }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
      className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#0f0f0f]/90 
                 backdrop-blur-md rounded-2xl p-3 shadow-lg 
                 border border-green-800/40 flex flex-col justify-between
                 hover:shadow-green-500/20 transition-shadow"
    >
      <div>
        <div className="flex items-center gap-4">
          <img
            src={learner?.profilePic}
            alt={learner.name}
            className="w-14 h-14 rounded-full border-2 border-green-500 shadow-md"
          />
          <div>
            <h2 className="text-white font-bold text-lg">{learner.name}</h2>
            <p className="text-xs text-gray-400">{learner?.location}</p>
          </div>
        </div>

        <div className="flex gap-3 mt-4">
          <span className="px-3 py-1 text-[10px] font-medium rounded-lg 
                           bg-green-900/40 text-green-400 border border-green-600/30">
            🌐 Native: {learner?.nativeLanguage}
          </span>
          <span className="px-3 py-1 text-[10px] font-medium rounded-lg 
                           bg-gray-800/50 text-gray-200 border border-gray-600/30">
            🎯 Learning: {learner?.learningLanguage}
          </span>
        </div>

        <p className="text-gray-300 text-[10px] sm:text-sm mt-4 leading-relaxed line-clamp-3">
          {learner?.bio}
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full flex justify-center items-center gap-2 
                   bg-green-600/90 hover:bg-green-500 text-white cursor-pointer
                   py-2.5 rounded-xl font-semibold tracking-wide 
                   shadow-md shadow-green-900/40 transition-colors"
      >
        <UserPlus className="w-5 h-5" />
        Send Friend Request
      </motion.button>
    </motion.div>
  );
};

export default LearnerCard;
