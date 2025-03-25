import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import Header from "@/components/Header";
import GameBoard from "@/components/GameBoard";
import GameControls from "@/components/GameControls";
import BonusDialog from "@/components/demo/BonusDialog";
import CreatePasswordDialog from "@/components/demo/CreatePasswordDialog";
import RegionBlock from "@/components/RegionBlock";
import AddHome from "@/components/demo/AddHome";

import backgroundImage from "/background.png";

const DemoMode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [email, setEmail] = useState("");
  const regionRef = useRef<HTMLDivElement>(null);
  const [showRegionBlock, setShowRegionBlock] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showTap, setShowTap] = useState(false);
  const [showBonus, setShowBonus] = useState(false);
  const [activeMode, setActiveMode] = useState<"manual" | "auto">("manual");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        regionRef.current &&
        !regionRef.current.contains(event.target as Node)
      ) {
        setShowRegionBlock(false);
      }
    };

    if (showRegionBlock) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRegionBlock]);

  const handleLogin = () => {
    setShowBonus(false);
    setShowLogin(false);
    navigate("/home");
  };

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length >= 8) {
      setShowLogin(false);
      setShowTap(true);
    } else {
      toast({
        title: "Invalid Password",
        description: "Please enter at least 8 characters",
        variant: "destructive",
      });
      setPassword("");
      return;
    }
  };

  const handleBack = () => {
    setEmail("");
    setPassword("");
    setShowLogin(false);
    setShowBonus(true);
  };

  return (
    <div
      className="flex justify-center items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Main container with 80% width */}
      <div
        className="w-[90%] max-w-md h-[100vh]"
        style={{
          display: `${showBonus || showLogin ? "none" : "block"}`,
        }}
      >
        {/* Header */}
        <Header demo={true} auth={false} />

        {/* Game Board */}
        <GameBoard demo={true} />

        {/* Game Controls */}
        <GameControls
          demo={true}
          showBonus={showBonus}
          setShowBonus={setShowBonus}
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

      {/* Bonus Dialog */}
      <BonusDialog
        showBonus={showBonus}
        setShowBonus={setShowBonus}
        email={email}
        setEmail={setEmail}
        setShowLogin={setShowLogin}
      />

      {/* Login Dialog */}
      <CreatePasswordDialog
        showLogin={showLogin}
        email={email}
        password={password}
        setPassword={setPassword}
        error={error}
        handleStart={handleStart}
        handleBack={handleBack}
      />

      {/* Add to Home Screen Dialog */}
      <AddHome handleLogin={handleLogin} showTap={showTap} />

      {/* Region Block Dialog */}
      <RegionBlock showRegionBlock={showRegionBlock} />
    </div>
  );
};

export default DemoMode;
