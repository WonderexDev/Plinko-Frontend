import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Music,
  MessageSquare,
  MoreVertical,
  MoreHorizontal,
} from "lucide-react";
import { ChevronLeft, Lock, ArrowRight, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const BonusIcon = 
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 12V22H4V12"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 7H2V12H22V7Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 22V7"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7H7.5C6.83696 7 6.20107 6.73661 5.73223 6.26777C5.26339 5.79893 5 5.16304 5 4.5C5 3.83696 5.26339 3.20107 5.73223 2.73223C6.20107 2.26339 6.83696 2 7.5 2C11 2 12 7 12 7Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 7H16.5C17.163 7 17.7989 6.73661 18.2678 6.26777C18.7366 5.79893 19 5.16304 19 4.5C19 3.83696 18.7366 3.20107 18.2678 2.73223C17.7989 2.26339 17.163 2 16.5 2C13 2 12 7 12 7Z"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>;

const DemoMode = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showBonus, setShowBonus] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [email, setEmail] = useState("");
  const [activeMode, setActiveMode] = useState<"manual" | "auto">("manual");
  const menuRef = useRef<HTMLDivElement>(null);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Generate dots for the Plinko board with exact arrangement from the image
  const renderPlinkoBoard = () => {
    // The image shows a triangular pattern with increasing dots per row
    // Starting with 3 dots in the first row and ending with 14 dots in the last row
    const dotsByRow = [
      3, // Row 1 (top)
      4, // Row 2
      5, // Row 3
      6, // Row 4
      7, // Row 5
      8, // Row 6
      9, // Row 7
      10, // Row 8
      11, // Row 9
    ]

    return dotsByRow.map((dotsInRow, rowIndex) => {
      const dots = []

      for (let j = 0; j < dotsInRow; j++) {
        dots.push(
          <div key={`dot-${rowIndex}-${j}`} className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-70" />,
        )
      }

      return (
        <div
          key={`row-${rowIndex}`}
          className="flex justify-between items-center"
          style={{
            width: `${(dotsInRow / dotsByRow[dotsByRow.length - 1]) * 100}%`,
            height: `${24 / [dotsByRow.length - 1]}vh`,
            margin: "0 auto",
          }}
        >
          {dots}
        </div>
      )
    })
  };

  // Multipliers
  const multipliers = [
    {
      label: "500%",
      width: "16%"
    },
    {
      label: "250%",
      width: "14%"
    },
    {
      label: "100%",
      width: "13%"
    },
    {
      label: "50%",
      width: "12%"
    },
    {
      label: "100%",
      width: "13%"
    },
    {
      label: "250%",
      width: "14%"
    },
    {
      label: "500%",
      width: "16%"
    }
  ];

  const handleBonusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Store the email in localStorage to use on the next page
    localStorage.setItem("userEmail", email);
    setEmail(email)

    // Close the dialog and navigate to password creation
    setShowBonus(false);
    setShowLogin(true);
    // navigate("/create-password");
  };

  const menuItems = [
    {
      label: "Twitter",
      onClick: () => window.open("https://twitter.com", "_blank"),
    },
    {
      label: "Discord",
      onClick: () => window.open("https://discord.com", "_blank"),
    },
    { label: "How to play", onClick: () => {} },
    { label: "AML", onClick: () => {} },
    { label: "KYC", onClick: () => {} },
    { label: "Terms & Conditions", onClick: () => {} },
    { label: "Privacy Policy", onClick: () => {} },
    { label: "Responsible Gaming", onClick: () => {} },
    { label: "Customer Support", onClick: () => {} },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleLogin = () => {
      setShowLogin(false);
      navigate("/home");
  }

  const handleBack = () => {
    setShowLogin(false);
    setShowBonus(true);
  }

  return (
    <div className="bg-gradient-to-b from-pink-500 to-purple-900 flex justify-center items-center">
      {/* Main container with 80% width */}
      <div className="w-[80%] max-w-md" style={{display: `${showBonus ? 'none' : 'block'}`}}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 h-[10vh]">
          <h1 className="text-3xl font-bold text-white">Plinko!</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white text-lg">
              {/* <MessageSquare className="w-5 h-5" /> */}
              Chat
              <span className="bg-white text-black bg-opacity-40 px-2 rounded-full">
                14
              </span>
            </div>
            <button
              onClick={() => navigate("/music")}
              className="text-white bg-opacity-10 p-2 text-lg rounded-full"
            >
              {/* <Music className="w-5 h-5" /> */}
              Music
            </button>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowMenu(true)}
              className="text-white bg-opacity-10 rounded-full relative border border-white border-[2px] cursor-pointer"
            >
              <MoreHorizontal className="w-5 h-5" />
              {showMenu && (
                <div
                  ref={menuRef}
                  className="absolute right-0 mt-2 w-48 bg-white bg-opacity-30 backdrop-blur-lg rounded-md shadow-lg z-10"
                >
                  {menuItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        item.onClick();
                        setShowMenu(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-white hover:bg-gray-100 ${
                        index === 1
                          ? "border-b border-gray-300 border-opacity-30"
                          : ""
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="bg-pink-500/30 backdrop-blur-md rounded-2xl  mb-4 border border-white/10 shadow-lg h-[48vh] md:h-[50vh] pt-2 md:pt-1 px-2">
          <div className="grid gap-3 md:gap-4 py-3 px-8">
            {renderPlinkoBoard()}
          </div>

          {/* Multipliers */}
          <div className="flex justify-between mb-4 overflow-x-auto mt-2 w-full">
            {multipliers.map((multiplier, index) => (
              <button
              key={index}
              className={cn(
                "bg-plinko-accent text-white px-1 py-1 text-sm md:px-3",
                `w-[${multiplier.width}]`,
                index === 0 && "rounded-r-md",
                index === 0 && "rounded-l-full",
                index === multipliers.length - 1 && "rounded-r-full rounded-l-md",
                index !== 0 && index !== multipliers.length - 1 && "rounded-md"
              )}
            >
              {multiplier.label}
            </button>
            ))}
          </div>
        </div>

        {/* Game Controls */}
        <div className="space-y-3 h-[42vh] md:h-[40vh]">
          {/* Mode Selector */}
          <div className="grid grid-cols-2 gap-1 bg-black/20 p-1 rounded-lg backdrop-blur-sm border border-white/5">
            <button
              className={`py-2 rounded-md text-white font-medium transition-colors ${
                activeMode === "manual"
                  ? "bg-pink-400 shadow-md"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => setActiveMode("manual")}
            >
              Manual
            </button>
            <button
              className={`py-2 rounded-md text-white font-medium transition-colors ${
                activeMode === "auto"
                  ? "bg-pink-400 shadow-md"
                  : "bg-transparent hover:bg-white/10"
              }`}
              onClick={() => setActiveMode("auto")}
            >
              Auto
            </button>
          </div>

          {/* Wallet and Risk */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-black/30 p-3 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-black/40 transition-colors">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-md">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 12V7H3V19H21V14"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 14C17.1046 14 18 13.1046 18 12C18 10.8954 17.1046 10 16 10C14.8954 10 14 10.8954 14 12C14 13.1046 14.8954 14 16 14Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-300">Wallet</div>
                  <div className="text-white text-sm md:text-base font-medium">
                    Balance: 0
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 p-3 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-black/40 transition-colors">
              <div className="flex items-center gap-2">
                <div className="bg-pink-400/20 p-1.5 rounded-md">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 17L12 11M12 7L12 7.01"
                      stroke="#FF69B4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#FF69B4"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-gray-300">High</div>
                  <div className="text-white text-sm md:text-base font-medium">
                    Risk
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Betting Controls */}
          <div className="bg-black/30 p-3 rounded-xl backdrop-blur-sm border border-white/5">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-white text-lg md:text-xl font-medium">
                  0
                </div>
                <div className="text-xs text-gray-300">Balance: 0</div>
              </div>
              <div className="flex gap-2">
                <button className="bg-white/20 text-white text-xs px-2 py-1 rounded-md hover:bg-white/30 transition-colors">
                  1/2
                </button>
                <button className="bg-white/20 text-white text-xs px-2 py-1 rounded-md hover:bg-white/30 transition-colors">
                  2x
                </button>
                <button className="bg-white/20 text-white text-xs px-2 py-1 rounded-md hover:bg-white/30 transition-colors">
                  MAX
                </button>
              </div>
            </div>
          </div>

          {/* Fund Wallet Button */}
          <Button
            onClick={() => setShowBonus(true)}
            className="w-full bg-pink-400/70 backdrop-blur-sm text-white py-3 rounded-xl border border-pink-400/30 shadow-lg hover:bg-pink-400/90 transition-colors font-medium"
          >
            Get Deposite Bonus
          </Button>
        </div>
      </div>

      {/* Bonus Dialog */}
      <div className='h-[100vh] w-[100vw] bg-gradient-to-b from-[#3a2a40] to-[#2a1a30] border-none p-0 mx-auto overflow-hidden' style={{display: `${showBonus ? 'block' : 'none'}`}} >
        <div className="flex flex-col items-center p-8 h-[90vh]">
          {/* Bonus Icon */}
          <div className="bg-pink-400 w-20 h-20 rounded-2xl flex items-center justify-center mb-6">
            {BonusIcon}
          </div>

          {/* Title and Description */}
          <h2 className="text-white text-2xl font-bold text-center mb-2">
            You won 150% deposit bonus
          </h2>
          <p className="text-gray-300 text-center mb-6">
            Register with your email to use it
          </p>

          {/* Form */}
          <div className="w-full space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@provider.com"
                className="w-full bg-white/10 text-white p-4 rounded-xl border border-white/10 focus:border-pink-400 focus:ring-1 focus:ring-pink-400 transition-all"
              />
            </div>
          </div>
        </div>
        <div className='h-[10vh] px-4'>
          <Button
            onClick={handleBonusSubmit}
            type="submit"
            className="w-full bg-pink-400 hover:bg-pink-500 text-white py-4 rounded-xl font-medium transition-all"
          >
            Continue
          </Button>
        </div>
      </div>

      <div style={{display: `${showLogin ? 'block' : 'none'}`}} >
        <div className="min-h-screen bg-gradient-to-b from-plinko-background to-black flex flex-col justify-between p-6">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-plinko-accent opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center relative z-10">
            <div className="w-full max-w-md text-center mb-8">
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">
                  Welcome,
                </h1>
                <p className="text-2xl text-white/80 font-light">{email}</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-xl">
                <div className="inline-flex justify-center items-center bg-plinko-accent/20 p-3 rounded-full mb-6">
                  <Lock className="w-6 h-6 text-plinko-accent" />
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="text-left">
                    <label className="text-white/90 mb-2 block font-medium">
                      Create your password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 text-white p-4 rounded-xl border border-white/10 focus:border-plinko-accent focus:ring-1 focus:ring-plinko-accent transition-all"
                      placeholder="****************"
                      required
                    />
                    {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                  </div>

                  <p className="text-white/60 text-sm">
                    Password must be at least 8 characters
                  </p>
                </form>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8 relative z-10">
            <Button
              onClick={handleBack}
              variant="outline"
              className="px-6 py-5 rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <Button
              onClick={handleLogin}
              className="px-8 py-5 rounded-xl bg-plinko-accent text-white hover:bg-plinko-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-plinko-accent/20"
            >
              Start Playing <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Add to Home Screen Modal */}
          {/* {showModal && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
              <div className="bg-[#2a2230] rounded-2xl max-w-sm w-full overflow-hidden">
                <div className="p-8 flex flex-col items-center">
                  <div className="bg-pink-400 w-16 h-16 rounded-2xl mb-6"></div>

                  <h2 className="text-white text-2xl font-medium text-center mb-2">
                    Add to your home screen to play
                  </h2>

                  <p className="text-gray-400 text-center mb-6">
                    You must do this from the sharing menu in Safari in order to
                    play Plinko
                  </p>

                  <div className="flex items-center text-gray-300 mb-6">
                    <span>Tap</span>
                    <Share2 className="mx-2 w-5 h-5" />
                    <span>then tap "Add on the home screen"</span>
                  </div>

                  <Button
                    onClick={handleContinue}
                    className="w-full bg-pink-400 text-white hover:bg-pink-500 py-3 rounded-xl"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>

    </div>
  );
};

export default DemoMode;
