import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Wallet, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  </svg>
);

const Risk = (
  <svg
    width="18"
    height="21"
    viewBox="0 0 18 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.70179 0.28468C10.0157 0.1998 10.3513 0.272852 10.6015 0.480536C11.6506 1.35131 13.356 2.91795 14.8062 4.96311C16.2517 7.00172 17.5 9.59584 17.5 12.5C17.5 14.7544 16.6045 16.9164 15.0104 18.5104C13.4163 20.1045 11.2543 21 9 21C6.74566 21 4.58365 20.1045 2.98959 18.5104C1.39553 16.9164 0.5 14.7544 0.5 12.5C0.5 9.32301 1.99319 6.51503 3.6111 4.39359C3.78442 4.16634 4.04669 4.0241 4.3317 4.00279C4.61671 3.98149 4.89722 4.08315 5.1024 4.28211L7.08912 6.20863L9.02339 0.907253C9.13485 0.601772 9.38788 0.36956 9.70179 0.28468ZM13.9694 13.5053C14.1357 12.9787 13.8436 12.4169 13.3169 12.2506C12.7903 12.0843 12.2285 12.3764 12.0622 12.9031C11.9287 13.3258 11.6954 13.7102 11.3819 14.0237C11.0684 14.3372 10.684 14.5705 10.2612 14.704C9.7346 14.8704 9.44249 15.4321 9.60879 15.9588C9.7751 16.4854 10.3369 16.7775 10.8635 16.6112C11.5926 16.381 12.2555 15.9785 12.7961 15.4379C13.3367 14.8973 13.7392 14.2344 13.9694 13.5053Z"
      fill="white"
      style={{ mixBlendMode: "overlay" }}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.70179 0.28468C10.0157 0.1998 10.3513 0.272852 10.6015 0.480536C11.6506 1.35131 13.356 2.91795 14.8062 4.96311C16.2517 7.00172 17.5 9.59584 17.5 12.5C17.5 14.7544 16.6045 16.9164 15.0104 18.5104C13.4163 20.1045 11.2543 21 9 21C6.74566 21 4.58365 20.1045 2.98959 18.5104C1.39553 16.9164 0.5 14.7544 0.5 12.5C0.5 9.32301 1.99319 6.51503 3.6111 4.39359C3.78442 4.16634 4.04669 4.0241 4.3317 4.00279C4.61671 3.98149 4.89722 4.08315 5.1024 4.28211L7.08912 6.20863L9.02339 0.907253C9.13485 0.601772 9.38788 0.36956 9.70179 0.28468ZM13.9694 13.5053C14.1357 12.9787 13.8436 12.4169 13.3169 12.2506C12.7903 12.0843 12.2285 12.3764 12.0622 12.9031C11.9287 13.3258 11.6954 13.7102 11.3819 14.0237C11.0684 14.3372 10.684 14.5705 10.2612 14.704C9.7346 14.8704 9.44249 15.4321 9.60879 15.9588C9.7751 16.4854 10.3369 16.7775 10.8635 16.6112C11.5926 16.381 12.2555 15.9785 12.7961 15.4379C13.3367 14.8973 13.7392 14.2344 13.9694 13.5053Z"
      fill="white"
      style={{ mixBlendMode: "overlay" }}
    />
  </svg>
);

interface GameControlsProps {
  demo?: boolean;
  showBonus: boolean;
  setShowBonus: (show: boolean) => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  demo,
  showBonus,
  setShowBonus,
}) => {
  const [mode, setMode] = useState<"manual" | "auto">("manual");
  const [showBonusAlert, setShowBonusAlert] = useState(true);
  const [activeMode, setActiveMode] = useState<"manual" | "auto">("manual");

  return (
    <>
      {demo ? (
        <div className="h-[22%] md:h-[20%] ">
          <div className="space-y-3 relative mb-8 h-[80%] items-center flex-col justify-center flex">
            {showBonusAlert && (
              <div
                onClick={() => setShowBonusAlert(false)}
                className="absolute w-[105%] h-[105%] rounded-xl bg-opacity-70 font-bold z-50 left-1/2 -translate-x-1/2 bg-black text-white text-xl px-4 py-2 rounded shadow-md items-center justify-center flex flex-col"
              >
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
                  <div className=" p-1.5 rounded-md">{Risk}</div>
                  <div>
                    <div className="text-md text-gray-300">High</div>
                    <div className="text-white text-sm md:text-base">Risk</div>
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
      ) : (
        <div className={cn("w-full max-w-md mx-auto space-y-4")}>
          <div className="flex rounded-xl overflow-hidden">
            <button
              className={cn(
                "flex-1 text-white py-3 px-6 transition-colors",
                mode === "manual" ? "bg-plinko-accent" : "bg-white bg-opacity-5"
              )}
              onClick={() => setMode("manual")}
            >
              Manual
            </button>
            <button
              className={cn(
                "flex-1 text-white py-3 px-6 transition-colors",
                mode === "auto" ? "bg-plinko-accent" : "bg-white bg-opacity-5"
              )}
              onClick={() => setMode("auto")}
            >
              Auto
            </button>
          </div>

          <div className="flex gap-2">
            <div className="flex-1 bg-white bg-opacity-5 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                <div>
                  <div className="text-sm text-gray-400">Wallet</div>
                  <div className="text-white">Balance: 0</div>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-white bg-opacity-5 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-plinko-accent" />
                <div>
                  <div className="text-sm text-gray-400">High</div>
                  <div className="text-white">Risk</div>
                </div>
              </div>
            </div>
          </div>

          {/* Betting Controls */}
          <div className="flex items-center justify-between bg-white bg-opacity-10 rounded-xl p-3">
            <div className="flex items-center gap-3">
              <span className="text-white text-xl font-medium">0</span>
              <span className="text-gray-400 text-sm">Balance: 0.37</span>
            </div>
            <div className="flex gap-2">
              <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md">
                1/2
              </button>
              <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md">
                2x
              </button>
              <button className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-md">
                MAX
              </button>
              <button className="bg-white bg-opacity-20 text-white p-1 rounded-md">
                <Wallet className="w-5 h-5" />
              </button>
            </div>
          </div>

          <Button
            // onClick={onBonusClick}
            className="w-full bg-plinko-accent text-white py-4 rounded-xl"
          >
            Get Deposit Bonus
          </Button>
        </div>
      )}
    </>
  );
};

export default GameControls;
