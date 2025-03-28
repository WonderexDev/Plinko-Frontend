import React from "react";
import { cn } from "@/lib/utils";
import { Colors } from "@/constants/colors";

// Generate dots for the Plinko board with exact arrangement from the image
const renderPlinkoBoard = () => {
  // The image shows a triangular pattern with increasing dots per row
  // Starting with 3 dots in the first row and ending with 14 dots in the last row
  const dotsByRow = [
    {
      show: 3,
      hide: 2,
    },
    {
      show: 4,
      hide: 2,
    },
    {
      show: 5,
      hide: 3,
    },
    {
      show: 6,
      hide: 3,
    },
    {
      show: 7,
      hide: 2,
    },
    {
      show: 8,
      hide: 2,
    },
    {
      show: 9,
      hide: 1,
    },
    {
      show: 10,
      hide: 1,
    },
    {
      show: 11,
      hide: 1,
    },
  ];

  return dotsByRow.map((dotsInRow, rowIndex) => {
    const dots = [];

    const width = Math.min(window.innerWidth, 500);

    const w =
      ((width / 100) * 80) /
      (dotsByRow[dotsByRow.length - 1].show +
        dotsByRow[dotsByRow.length - 1].hide);

    const createDots = (count: number, keyPrefix: string, color: string) => {
      return Array.from({ length: count }).map((_, i) => (
        <div
          key={`${keyPrefix}-${rowIndex}-${i}`}
          style={{ width: `${w}px` }}
          className="flex items-center justify-center"
        >
          <div
            className={`w-2 h-2 md:w-3 md:h-3 ${color} rounded-full opacity-70`}
          />
        </div>
      ));
    };

    dots.push(
      ...createDots(dotsInRow.hide, "dot-hide", "bg-gray-300/20"),
      ...createDots(dotsInRow.show, "dot-show", "bg-white"),
      ...createDots(dotsInRow.hide, "dot-hide-end", "bg-gray-300/20")
    );

    return (
      <div
        key={`row-${rowIndex}`}
        className="flex justify-between items-center"
        style={{
          height: `${20 / (dotsByRow.length - 1)}vh`,
          margin: "0 auto",
        }}
      >
        {dots}
      </div>
    );
  });
};

// Multipliers
const demo_multipliers = [
  {
    label: "500%",
    width: "17%",
  },
  {
    label: "250%",
    width: "14%",
  },
  {
    label: "100%",
    width: "13%",
  },
  {
    label: "50%",
    width: "10%",
  },
  {
    label: "100%",
    width: "13%",
  },
  {
    label: "250%",
    width: "14%",
  },
  {
    label: "500%",
    width: "17%",
  },
];

const pwa_multipliers = [
  {
    label: "10x",
    width: "11%",
  },
  {
    label: "5x",
    width: "10%",
  },
  {
    label: "2x",
    width: "9%",
  },
  {
    label: "1.5",
    width: "8%",
  },
  {
    label: "0.9",
    width: "7%",
  },
  {
    label: "0.7",
    width: "6%",
  },
  {
    label: "0.9",
    width: "7%",
  },
  {
    label: "1.5",
    width: "8%",
  },
  {
    label: "2x",
    width: "9%",
  },
  {
    label: "5x",
    width: "10%",
  },
  {
    label: "10x",
    width: "11%",
  },
];

interface GameBoardProps {
  demo?: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ demo }) => {
  const multipliers = demo ? demo_multipliers : pwa_multipliers;
  return (
    <div className="bg-[#540059]/30 backdrop-blur-lg rounded-2xl mb-4 border border-white/10 shadow-lg h-[53%] md:h-[55%] pt-2 md:pt-1 px-2 items-center justify-center flex flex-col">
      <div className="grid gap-3 md:gap-4 py-3">{renderPlinkoBoard()}</div>

      {/* Multipliers */}
      <div className="flex justify-between mb-4 overflow-x-auto mt-2 w-full ">
        {multipliers.map((multiplier, index) => (
          <button
            key={index}
            className={cn(
              `bg-plinko-accent py-1 text-sm ${Colors.pink_bg} ${Colors.pink_button}`,
              index === 0 &&
                "rounded-tl-xl rounded-bl-xl rounded-tr-md rounded-br-md", // Only left side
              index === multipliers.length - 1 &&
                "rounded-tr-xl rounded-br-xl rounded-tl-md rounded-bl-md", // Only right side
              index !== 0 && index !== multipliers.length - 1 && "rounded-md", // Middle items
              demo && "px-1",
              !demo && "px-0"
            )}
            style={{ width: multiplier.width }}
          >
            {multiplier.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
