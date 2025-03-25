import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Plus, Minus } from "lucide-react";

import { Colors } from "@/constants/colors";

const wallet = (
  <svg
    width="20"
    height="18"
    viewBox="0 0 20 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.87433 2.75C2.75669 2.74992 2.64024 2.77357 2.53194 2.81952C2.42364 2.86548 2.32573 2.9328 2.24404 3.01747C2.21436 3.04823 2.18705 3.08105 2.16228 3.11564C2.11889 3.17626 2.08331 3.24232 2.05654 3.31227C2.01454 3.42203 1.99508 3.53912 1.99932 3.65656C2.01607 4.10472 2.40997 4.5 2.92 4.5H16.375C17.1375 4.5 17.8688 4.8029 18.4079 5.34207C18.9471 5.88124 19.25 6.6125 19.25 7.375V14.875C19.25 15.6375 18.9471 16.3688 18.4079 16.9079C17.8688 17.4471 17.1375 17.75 16.375 17.75H2.875C2.1125 17.75 1.38123 17.4471 0.842066 16.9079C0.302899 16.3688 -1.65496e-06 15.6375 -1.65496e-06 14.875V3.70975C-0.0111944 3.33024 0.0528954 2.95219 0.188641 2.59747C0.326792 2.23646 0.536326 1.90701 0.804713 1.62882C1.0731 1.35064 1.39483 1.12944 1.75066 0.978437C2.10629 0.827524 2.48868 0.749833 2.875 0.75H15.25C15.8023 0.75 16.25 1.19772 16.25 1.75C16.25 2.30229 15.8023 2.75 15.25 2.75L2.87433 2.75ZM14.5103 9.5C13.6818 9.5 13.0103 10.1716 13.0103 11C13.0103 11.8284 13.6818 12.5 14.5103 12.5C15.3387 12.5 16.0103 11.8284 16.0103 11C16.0103 10.1716 15.3387 9.5 14.5103 9.5Z"
      fill="white"
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

const Bet = (
  <svg
    width="20"
    height="16"
    viewBox="0 0 20 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_84_1000)">
      <path
        d="M3.76868 11.9485C3.88455 11.833 4.04387 11.7656 4.21284 11.7656H19.5361C19.8162 11.7656 19.9562 12.1025 19.7582 12.2998L16.7312 15.3171C16.6154 15.4326 16.456 15.5 16.2871 15.5H0.963755C0.683745 15.5 0.54374 15.1631 0.741678 14.9658L3.76868 11.9485Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        d="M3.76868 11.9485C3.88455 11.833 4.04387 11.7656 4.21284 11.7656H19.5361C19.8162 11.7656 19.9562 12.1025 19.7582 12.2998L16.7312 15.3171C16.6154 15.4326 16.456 15.5 16.2871 15.5H0.963755C0.683745 15.5 0.54374 15.1631 0.741678 14.9658L3.76868 11.9485Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        d="M16.7312 6.27959C16.6154 6.1641 16.4561 6.09673 16.2871 6.09673H0.963775C0.683765 6.09673 0.54376 6.43359 0.741698 6.63089L3.7687 9.64822C3.88457 9.76371 4.04389 9.83109 4.21286 9.83109H19.5362C19.8162 9.83109 19.9562 9.49422 19.7582 9.29692L16.7312 6.27959Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        d="M16.7312 6.27959C16.6154 6.1641 16.4561 6.09673 16.2871 6.09673H0.963775C0.683765 6.09673 0.54376 6.43359 0.741698 6.63089L3.7687 9.64822C3.88457 9.76371 4.04389 9.83109 4.21286 9.83109H19.5362C19.8162 9.83109 19.9562 9.49422 19.7582 9.29692L16.7312 6.27959Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        d="M3.76846 0.682868C3.88915 0.567372 4.04847 0.5 4.21261 0.5H19.5359C19.8159 0.5 19.9559 0.836862 19.758 1.03417L16.731 4.05149C16.6151 4.16699 16.4558 4.23436 16.2868 4.23436H0.963532C0.683522 4.23436 0.543517 3.8975 0.741455 3.70019L3.76846 0.682868Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
      <path
        d="M3.76846 0.682868C3.88915 0.567372 4.04847 0.5 4.21261 0.5H19.5359C19.8159 0.5 19.9559 0.836862 19.758 1.03417L16.731 4.05149C16.6151 4.16699 16.4558 4.23436 16.2868 4.23436H0.963532C0.683522 4.23436 0.543517 3.8975 0.741455 3.70019L3.76846 0.682868Z"
        fill="white"
        style={{ mixBlendMode: "overlay" }}
      />
    </g>
    <defs>
      <clipPath id="clip0_84_1000">
        <rect
          width="19.2"
          height="15"
          fill="white"
          transform="translate(0.65 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);

interface GameControlsProps {
  demo?: boolean;
  showBonus?: boolean;
  setShowBonus?: (show: boolean) => void;
  fund: boolean;
  isSimulating?: boolean;
  setIsSimulating?: (simulating: boolean) => void;
  activeMode?: "manual" | "auto";
  setActiveMode?: (mode: "manual" | "auto") => void;
  autoCount?: number;
  setAutoCount?: (count: number) => void;
  handlePlaceBet?: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({
  demo,
  showBonus,
  setShowBonus,
  fund,
  isSimulating,
  setIsSimulating,
  activeMode,
  setActiveMode,
  autoCount,
  setAutoCount,
  handlePlaceBet,
}) => {
  const [mode, setMode] = useState<"manual" | "auto">("manual");
  const [showBonusAlert, setShowBonusAlert] = useState(true);

  const navigate = useNavigate();

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
            <div className="grid grid-cols-3 w-full gap-1 bg-black/10 rounded-lg backdrop-blur-xl p-1">
              <button
                className={`rounded-md font-medium transition-colors ${
                  activeMode === "manual"
                    ? `${Colors.pink_bg} shadow-md  ${Colors.pink_button}`
                    : "bg-transparent hover:bg-white/10 text-white"
                }`}
                onClick={() => setActiveMode("manual")}
              >
                Manual
              </button>
              <button
                className={`rounded-md  font-medium transition-colors ${
                  activeMode === "auto"
                    ? `${Colors.pink_bg} shadow-md ${Colors.pink_button}`
                    : "bg-transparent hover:bg-white/10 text-white"
                }`}
                onClick={() => setActiveMode("auto")}
              >
                Auto
              </button>
              <div className="bg-black/10 px-2 mx-auto w-full rounded-xl backdrop-blur-xl  hover:bg-black/40 transition-colors">
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
            <div className="flex items-center w-full gap-2">
              <div className="bg-black/10 px-2 py-1 rounded-xl backdrop-blur-sm border border-white/5">
                <div className="flex justify-between items-center gap-8 px-4">
                  <div className="flex gap-2 items-center">
                    <div>{Bet}</div>
                    <div>
                      <div className="text-white text-lg md:text-xl font-medium">
                        0
                      </div>
                      <div className="text-xs text-gray-300">Ballence : 0</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-black/25 text-white text-xs px-2 py-2 rounded-md hover:bg-white/30 transition-colors">
                      1/2
                    </button>
                    <button className="bg-black/25 text-white text-xs px-2 py-2 rounded-md hover:bg-white/30 transition-colors">
                      2x
                    </button>
                    <button className="bg-black/25 text-white text-xs px-2 py-2 rounded-md hover:bg-white/30 transition-colors">
                      MAX
                    </button>
                  </div>
                </div>
              </div>
              <div className="bg-black/10 p-1 mx-auto  rounded-xl backdrop-blur-xl  hover:bg-black/40 transition-colors">
                <div className="flex items-center gap-2 ">
                  <div className=" p-1.5 rounded-md">{wallet}</div>
                </div>
              </div>
            </div>
          </div>
          {/* Fund Wallet Button */}
          <Button
            onClick={() => setShowBonus(true)}
            className={`w-full ${Colors.pink_bg} backdrop-blur-sm ${Colors.pink_button} py-3 rounded-xl border border-pink-400/30 shadow-lg hover:bg-pink-400/90 transition-colors font-medium`}
          >
            Get Deposite Bonus
          </Button>
        </div>
      ) : (
        <div className="h-[22%] md:h-[20%] ">
          <div className="space-y-3 relative mb-8 mt-8 h-[80%] items-center flex-col justify-center flex">
            {/* Mode Selector */}
            <div className="grid grid-cols-2 w-full gap-1 bg-black/10 rounded-lg backdrop-blur-xl p-1">
              <button
                className={`rounded-md font-medium transition-colors p-2 ${
                  activeMode === "manual"
                    ? `${Colors.pink_bg} shadow-md ${Colors.pink_button}`
                    : "bg-transparent hover:bg-white/10 text-white"
                }`}
                onClick={() => setActiveMode("manual")}
              >
                Manual
              </button>
              <div
                className={`py-3 flex items-center justify-center rounded-md ${
                  activeMode === "auto"
                    ? `${Colors.pink_bg} shadow-md ${Colors.pink_button}`
                    : "bg-transparent hover:bg-white/10 text-white"
                }`}
              >
                {activeMode === "auto" ? (
                  <div className="flex items-center justify-between w-full px-4">
                    <button
                      onClick={() => setAutoCount(Math.max(1, autoCount - 1))}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">Auto ({autoCount})</span>
                    <button onClick={() => setAutoCount(autoCount + 1)}>
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full text-center"
                    onClick={() => setActiveMode("auto")}
                  >
                    Auto
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-2 flex-1 w-full">
              <div className="bg-black/10 p-1 mx-auto w-1/2 rounded-xl backdrop-blur-xl  hover:bg-black/40 transition-colors">
                <div className="flex items-center gap-2 ">
                  <div className=" p-1.5 rounded-md">{wallet}</div>
                  <div>
                    <div className="text-md text-gray-300">Wallet</div>
                    <div className="text-white text-sm md:text-base">
                      Ballence: 0
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-black/10 p-1 mx-auto w-1/2 rounded-xl backdrop-blur-xl  hover:bg-black/40 transition-colors">
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
            <div
              className={`bg-black/10 px-2 py-1 w-full rounded-xl backdrop-blur-xl ${
                !fund ? "border-2 border-pink-400/50" : ""
              }`}
            >
              <div className={`flex justify-between items-center `}>
                <div className="flex gap-2 items-center">
                  <div>{Bet}</div>
                  <div>
                    <div className="text-white text-lg md:text-xl font-medium">
                      0.0015
                    </div>
                    <div
                      className={`text-xs text-gray-300 ${
                        !fund ? "text-pink-400" : ""
                      }`}
                    >
                      {fund ? "Bet Amount" : "No enough balance"}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ">
                  <button
                    className={`bg-black/25 text-white text-xl px-2 py-1 rounded-md transition-colors ${
                      !fund
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-white/30"
                    }`}
                    disabled={!fund}
                  >
                    1/2
                  </button>
                  <button
                    className={`bg-black/25 text-white text-xl px-2 py-1 rounded-md transition-colors ${
                      !fund
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-white/30"
                    }`}
                    disabled={!fund}
                  >
                    2x
                  </button>
                  <button
                    className={`bg-black/25 text-white text-xl px-2 py-1 rounded-md transition-colors ${
                      !fund
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-white/30"
                    }`}
                    disabled={!fund}
                  >
                    MAX
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Fund Wallet Button */}
          <Button
            onClick={() => {
              if (fund) {
                // Handle place bet logic here
                if (activeMode === "manual") {
                  // Place manual bet logic
                  handlePlaceBet();
                } else {
                  // Start auto bet logic
                  setIsSimulating(true);
                }
              } else {
                navigate("/wallet");
              }
            }}
            className={`w-full ${
              fund
                ? `${Colors.pink_bg} ${Colors.pink_button} text-xl`
                : "bg-[#FFFFFF]/30 text-white/30 "
            } backdrop-blur-sm  py-3 rounded-xl shadow-lg hover:bg-pink-400/90 transition-colors font-medium`}
          >
            {!fund
              ? "Please fund your wallet"
              : activeMode === "manual"
              ? "Place Bet"
              : isSimulating
              ? "Running..."
              : "Start Autobet"}
          </Button>
        </div>
      )}
    </>
  );
};

export default GameControls;
