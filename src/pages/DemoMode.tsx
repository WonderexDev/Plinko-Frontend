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
    <div className="bg-gradient-to-b from-pink-500 to-purple-900 flex justify-center items-center">
      {/* Main container with 80% width */}
      <div
        className="w-[90%] max-w-md h-[100vh]"
        style={{
          display: `${showBonus || showLogin ? "none" : "block"}`,
        }}
      >
        {/* Header */}
        <Header />

        {/* Game Board */}
        <GameBoard />

        {/* Game Controls */}
        <GameControls
          demo={true}
          showBonus={showBonus}
          setShowBonus={setShowBonus}
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
