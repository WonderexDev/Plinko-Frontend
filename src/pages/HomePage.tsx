import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";

import backgroundImage from "/background.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<"manual" | "auto">("manual");

  return (
    <div
      className=" flex justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main container with 80% width */}
      <div className="w-[90%] max-w-md h-[100vh]">
        {/* Header */}
        <Header demo={true} auth={true} />

        {/* Game Board */}
        <GameBoard />

        {/* Game Controls */}
        <GameControls
          demo={false}
          showBonus={false}
          setShowBonus={() => {}}
          fund={false}
          isSimulating={false}
          setIsSimulating={() => {}}
          activeMode={activeMode}
          setActiveMode={setActiveMode}
          autoCount={0}
          setAutoCount={() => {}}
          handlePlaceBet={() => {}}
        />
      </div>
    </div>
  );
};

export default HomePage;
