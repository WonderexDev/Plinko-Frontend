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

const BonusIcon = (
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
  </svg>);

const wallet = (
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
  </svg>);

const Risk = (
<svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fillRule="evenodd" clipRule="evenodd" d="M9.70179 0.28468C10.0157 0.1998 10.3513 0.272852 10.6015 0.480536C11.6506 1.35131 13.356 2.91795 14.8062 4.96311C16.2517 7.00172 17.5 9.59584 17.5 12.5C17.5 14.7544 16.6045 16.9164 15.0104 18.5104C13.4163 20.1045 11.2543 21 9 21C6.74566 21 4.58365 20.1045 2.98959 18.5104C1.39553 16.9164 0.5 14.7544 0.5 12.5C0.5 9.32301 1.99319 6.51503 3.6111 4.39359C3.78442 4.16634 4.04669 4.0241 4.3317 4.00279C4.61671 3.98149 4.89722 4.08315 5.1024 4.28211L7.08912 6.20863L9.02339 0.907253C9.13485 0.601772 9.38788 0.36956 9.70179 0.28468ZM13.9694 13.5053C14.1357 12.9787 13.8436 12.4169 13.3169 12.2506C12.7903 12.0843 12.2285 12.3764 12.0622 12.9031C11.9287 13.3258 11.6954 13.7102 11.3819 14.0237C11.0684 14.3372 10.684 14.5705 10.2612 14.704C9.7346 14.8704 9.44249 15.4321 9.60879 15.9588C9.7751 16.4854 10.3369 16.7775 10.8635 16.6112C11.5926 16.381 12.2555 15.9785 12.7961 15.4379C13.3367 14.8973 13.7392 14.2344 13.9694 13.5053Z" fill="white" style={{mixBlendMode:"overlay"}}/>
<path fillRule="evenodd" clipRule="evenodd" d="M9.70179 0.28468C10.0157 0.1998 10.3513 0.272852 10.6015 0.480536C11.6506 1.35131 13.356 2.91795 14.8062 4.96311C16.2517 7.00172 17.5 9.59584 17.5 12.5C17.5 14.7544 16.6045 16.9164 15.0104 18.5104C13.4163 20.1045 11.2543 21 9 21C6.74566 21 4.58365 20.1045 2.98959 18.5104C1.39553 16.9164 0.5 14.7544 0.5 12.5C0.5 9.32301 1.99319 6.51503 3.6111 4.39359C3.78442 4.16634 4.04669 4.0241 4.3317 4.00279C4.61671 3.98149 4.89722 4.08315 5.1024 4.28211L7.08912 6.20863L9.02339 0.907253C9.13485 0.601772 9.38788 0.36956 9.70179 0.28468ZM13.9694 13.5053C14.1357 12.9787 13.8436 12.4169 13.3169 12.2506C12.7903 12.0843 12.2285 12.3764 12.0622 12.9031C11.9287 13.3258 11.6954 13.7102 11.3819 14.0237C11.0684 14.3372 10.684 14.5705 10.2612 14.704C9.7346 14.8704 9.44249 15.4321 9.60879 15.9588C9.7751 16.4854 10.3369 16.7775 10.8635 16.6112C11.5926 16.381 12.2555 15.9785 12.7961 15.4379C13.3367 14.8973 13.7392 14.2344 13.9694 13.5053Z" fill="white" style={{mixBlendMode:"overlay"}}/>
</svg>
);



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
  const [showBonusAlert, setShowBonusAlert] = useState(true)

  // Generate dots for the Plinko board with exact arrangement from the image
  const renderPlinkoBoard = () => {
    // The image shows a triangular pattern with increasing dots per row
    // Starting with 3 dots in the first row and ending with 14 dots in the last row
    const dotsByRow = [
      {
        show: 3,
        hide: 2
      },
      {
        show: 4,
        hide: 2
      },
      {
        show: 5,
        hide: 3
      },
      {
        show: 6,
        hide: 3
      },
      {
        show: 7,
        hide: 2
      },
      {
        show: 8,
        hide: 2
      },
      {
        show: 9,
        hide: 1
      },
      {
        show: 10,
        hide: 1
      },
      {
        show: 11,
        hide: 1
      },
    ]

    return dotsByRow.map((dotsInRow, rowIndex) => {
      const dots = []

      const w = window.innerWidth / 100 * 80 / (dotsByRow[dotsByRow.length - 1].show + dotsByRow[dotsByRow.length - 1].hide);

      for (let i = 0; i < dotsInRow.hide; i++) {
        dots.push(
          <div style={{ width: `${w}px` }} className="flex items-center justify-center">         
          <div key={`dot-${rowIndex}-${i}`} className="w-2 h-2 md:w-3 md:h-3 bg-gray-300/20 rounded-full opacity-70" />
          </div>,
        )
      }
      for (let j = 0; j < dotsInRow.show; j++) {
        dots.push(
          <div style={{ width: `${w}px` }} className="flex items-center justify-center">  
          <div key={`dot-${rowIndex}-${j+dotsInRow.hide}`} className="w-2 h-2 md:w-3 md:h-3 bg-white rounded-full opacity-70" />
          </div>,
        )
      }
      for (let i = 0; i < dotsInRow.hide; i++) {
        dots.push(
          <div style={{ width: `${w}px` }} className="flex items-center justify-center">  
          <div key={`dot-${rowIndex}-${i+dotsInRow.hide+dotsInRow.show}`} className="w-2 h-2 md:w-3 md:h-3 bg-gray-300/20 rounded-full opacity-70" />
          </div>,
        )
      }

      const height = window.innerHeight;

      return (
        <div
          key={`row-${rowIndex}`}
          className="flex justify-between items-center"
          style={{
            // width: `${(dotsInRow.show / dotsByRow[dotsByRow.length - 1].show) * 100}%`,
            height: `${ 20 / [dotsByRow.length - 1]}vh`,
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
    if (password.length >= 8) {
      setShowLogin(false);
      navigate("/home");
    } else {
      toast({
        title: "Invalid Password",
        description: "Please enter at least 8 characters",
        variant: "destructive",
      });
      setPassword("")
      return;
    }
  };

  const handleBack = () => {
    setEmail("");
    setPassword("");
    setShowLogin(false);
    setShowBonus(true);
  }

  return (
    <div className="bg-gradient-to-b from-pink-500 to-purple-900 flex justify-center items-center">
      {/* Main container with 80% width */}
      <div className="w-[90%] max-w-md h-[100vh]" style={{display: `${showBonus || showLogin ? 'none' : 'block'}`}}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6 h-[10%]">
          <h1 className="text-3xl font-bold text-white">Plinko!</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white text-lg">
              Chat
              <span className="bg-white text-black bg-opacity-40 text-md px-2 rounded-full">
                14
              </span>
            </div>
            <button
              onClick={() => navigate("/music")}
              className="text-white bg-opacity-10 p-2 text-lg rounded-full"
            >
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
        <div className="bg-[#540059]/30 backdrop-blur-lg rounded-2xl mb-4 border border-white/10 shadow-lg h-[48%] md:h-[50%] pt-2 md:pt-1 px-2">
          <div className="grid gap-3 md:gap-4 py-3">
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
        <div className="h-[22%] md:h-[20%] ">       
          <div className="space-y-3 relative mb-8 h-[80%] items-center flex-col justify-center flex">
            {showBonusAlert && (
              <div onClick={() => setShowBonusAlert(false)} className="absolute w-[105%] h-[105%] rounded-xl bg-opacity-70 font-bold z-50 left-1/2 -translate-x-1/2 bg-black text-white text-xl px-4 py-2 rounded shadow-md items-center justify-center flex flex-col">
                Win a bonus first
              </div>
            )}   
            {/* Mode Selector */}
            <div className="grid grid-cols-3 w-full gap-1 bg-black/20 rounded-lg backdrop-blur-sm p-1">
              <button
                className={`rounded-md text-white font-medium transition-colors ${
                  activeMode === "manual"
                    ? "bg-pink-400 shadow-md"
                    : "bg-transparent hover:bg-white/10"
                }`}
                onClick={() => setActiveMode("manual")}
              >
              Manual
              </button>
              <button
                className={`rounded-md text-white font-medium transition-colors ${
                  activeMode === "auto"
                    ? "bg-pink-400 shadow-md"
                    : "bg-transparent hover:bg-white/10"
                }`}
                onClick={() => setActiveMode("auto")}
              >
                Auto
              </button>
              <div className="bg-black/30 px-2 mx-auto w-full rounded-xl backdrop-blur-sm  hover:bg-black/40 transition-colors">
                <div className="flex items-center gap-2 mx-auto justify-center">
                  <div className=" p-1.5 rounded-md">
                    {Risk}
                  </div>
                  <div>
                    <div className="text-md text-gray-300">High</div>
                    <div className="text-white text-sm md:text-base">
                      Risk
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Betting Controls */}
            <div className="bg-black/30 px-2 py-1 w-full rounded-xl backdrop-blur-sm border border-white/5">
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
          </div>
          {/* Fund Wallet Button */}
          <Button
              onClick={() => setShowBonus(true)}
              className="w-full bg-pink-400/70 backdrop-blur-sm text-darkgray py-3 rounded-xl border border-pink-400/30 shadow-lg hover:bg-pink-400/90 transition-colors font-medium"
            >
              Get Deposite Bonus
            </Button>
        </div>
      </div>

      {/* Bonus Dialog */}
      <div className='min-h-screen w-[100vw] bg-gradient-to-b from-[#3a2a40] to-[#2a1a30] border-none p-0 mx-auto overflow-hidden' 
        style={{display: `${showBonus ? 'block' : 'none'}`}} >
        <div className="flex flex-col items-center justify-center p-8 h-[90vh]">
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

      { /* Login Dialog */ }
      <div className="min-h-screen w-full bg-gradient-to-b from-plinko-background to-black p-6" 
        style={{display: `${showLogin ? 'block' : 'none'}`}} >
          <div className="h-[85vh] items-center justify-center flex flex-col">
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
                  <div className="text-center">
                    <label className="text-white/90 mb-2 block font-medium">
                      Create your password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-white/5 text-center text-white p-4 rounded-xl border border-white/10 focus:border-plinko-accent focus:ring-1 focus:ring-plinko-accent transition-all"
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

          <div className="h-[10vh] w-full flex justify-center gap-4 ">
            <Button
              onClick={handleBack}
              variant="outline"
              className="px-6 py-5 w-[30%] rounded-xl bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all"
            >
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Button>

            <Button
              onClick={handleLogin}
              className="px-8 py-5 w-[80%] rounded-xl bg-plinko-accent text-white hover:bg-plinko-accent/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-plinko-accent/20"
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
  );
};

export default DemoMode;
