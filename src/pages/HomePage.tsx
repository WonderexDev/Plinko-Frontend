import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Music, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "@/components/Header";
import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";

const HomePage = () => {
  const navigate = useNavigate();
  const [activeMode, setActiveMode] = useState<"manual" | "auto">("manual");

  return (
    <div className="bg-gradient-to-b from-pink-500 to-purple-900 flex justify-center items-center">
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
