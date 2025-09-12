import React, { useEffect } from "react";
import LearnerCard from "./LearnerCard";
import { userStore } from "../store/userStore";
import { Loader2 } from "lucide-react"; 

const NewLearners = () => {
  const { newLearners, isNewLearnersLoading, getNewLearners } = userStore();

  useEffect(() => {
    getNewLearners();
  }, [getNewLearners]);

  return (
    <div className="px-6 py-10  ">
      <h1 className="text-2xl font-bold text-white">Meet New Learners</h1>
      <p className="text-sm sm:text-md text-gray-400">
        Discover perfect language exchange partners based on your profile
      </p>

      {isNewLearnersLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Loader2 className="w-12 h-12 text-green-400 animate-spin drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
        </div>
      ) : (
        <div className="grid gap-6 mt-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {newLearners.map((learner, idx) => (
            <LearnerCard key={idx} learner={learner} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewLearners;
