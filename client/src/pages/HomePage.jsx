import React from "react";
import NewLearners from "../components/NewLearners";
import Friends from "../components/Friends";

const HomePage = () => {
  return (
    <div
      className="min-h-screen bg-gray-900"
    >
      <Friends/>
      <NewLearners/>
    </div>
  );
};

export default HomePage;
