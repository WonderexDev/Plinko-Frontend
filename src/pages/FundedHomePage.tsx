import { useState, useEffect, useRef, useCallback } from "react";
import { MessageSquare, Music, MoreVertical, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type Matter from "matter-js";
import {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  type IEventCollision,
  Render,
  Runner,
  World,
} from "matter-js";

import Header from "@/components/Header";
import GameFundBoard from "@/components/GameFundBoard";
import GameControls from "@/components/GameControls";

type ModeType = "manual" | "auto";

// Game configuration with updated dimensions for smaller game
const config = {
  pins: {
    startPins: 3,
    pinSize: 4, // Reduced pin size
    pinGap: 30, // Reduced gap between pins
  },
  ball: {
    ballSize: 8, // Reduced ball size
  },
  engine: {
    engineGravity: 1,
  },
  world: {
    width: 400, // Reduced width
    height: 500, // Reduced height
  },
  colors: {
    background: "transparent", // Let the gradient background show through
    pin: "#FFFFFF", // White pins with opacity applied in render
    ball: "#FFFFFF",
    multiplierZone: "#FF69B4", // Pink multiplier zone matching HomePage
  },
};

const FundedHomePage = () => {
  const [activeMode, setActiveMode] = useState<ModeType>("manual");
  const [betAmount, setBetAmount] = useState("0.0015");
  const [autoCount, setAutoCount] = useState(99);
  const [isSimulating, setIsSimulating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [lastMultipliers, setLastMultipliers] = useState<string[]>([]);
  const [inGameBallsCount, setInGameBallsCount] = useState(0);

  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine>();

  const handleCollision = useCallback((event: IEventCollision<Engine>) => {
    const pairs = event.pairs;

    for (let i = 0; i < pairs.length; i++) {
      const pair = pairs[i];

      if (
        (pair.bodyA.label.includes("ball-") &&
          pair.bodyB.label.includes("multiplier-")) ||
        (pair.bodyB.label.includes("ball-") &&
          pair.bodyA.label.includes("multiplier-"))
      ) {
        const ball = pair.bodyA.label.includes("ball-")
          ? pair.bodyA
          : pair.bodyB;
        const multiplier = pair.bodyA.label.includes("multiplier-")
          ? pair.bodyA
          : pair.bodyB;

        if (ball.collisionFilter.group === 2) continue;

        const ballValue = Number.parseFloat(ball.label.split("-")[1]);
        const multiplierValue = multiplier.label.split("-")[1];

        if (engineRef.current) {
          ball.collisionFilter.group = 2;
          Body.setVelocity(ball, { x: 0, y: 0 });
          Body.setAngularVelocity(ball, 0);
          Body.setStatic(ball, true);
          const multiplierPos = multiplier.position;
          Body.setPosition(ball, {
            x: multiplierPos.x,
            y: multiplierPos.y - 10,
          });

          setTimeout(() => {
            if (engineRef.current) {
              World.remove(engineRef.current.world, ball);
              setInGameBallsCount((prev) => Math.max(0, prev - 1));
            }
          }, 500);

          setResult(multiplierValue);
          setLastMultipliers((prev) => [multiplierValue, ...prev.slice(0, 9)]);

          if (ballValue > 0) {
            const winAmount = ballValue * Number.parseFloat(multiplierValue);
            console.log(`Won ${winAmount} from bet of ${ballValue}`);
          }
        }
      }
    }
  }, []);

  const dropBall = useCallback(() => {
    if (!engineRef.current || !sceneRef.current || inGameBallsCount > 15)
      return;

    setIsSimulating(true);
    setInGameBallsCount((prev) => prev + 1);

    const containerWidth = sceneRef.current.clientWidth;
    const scale = containerWidth / config.world.width;
    const scaledBallSize = config.ball.ballSize * scale;
    const minBallX = containerWidth / 2 - 20;
    const maxBallX = containerWidth / 2 + 20;
    const ballX = minBallX + Math.random() * (maxBallX - minBallX);

    const ball = Bodies.circle(ballX, 20, scaledBallSize, {
      restitution: 0.8 + Math.random() * 0.4,
      friction: 0.6 + Math.random() * 0.2,
      frictionAir: 0.02 + Math.random() * 0.04,
      label: `ball-${Number.parseFloat(betAmount)}`,
      render: {
        fillStyle: config.colors.ball,
      },
    });

    if (engineRef.current) {
      Composite.add(engineRef.current.world, ball);
    }
  }, [betAmount, inGameBallsCount]);

  const handlePlaceBet = useCallback(() => {
    if (activeMode === "manual") {
      dropBall();
    } else {
      if (isSimulating) {
        setIsSimulating(false);
      } else {
        setIsSimulating(true);
        let count = 0;

        const autoDrop = () => {
          if (count < autoCount && isSimulating) {
            dropBall();
            count++;
            setTimeout(autoDrop, 1000);
          } else {
            setIsSimulating(false);
          }
        };

        autoDrop();
      }
    }
  }, [activeMode, autoCount, dropBall, isSimulating]);

  const handleIncreaseBet = () => {
    const currentBet = Number.parseFloat(betAmount);
    setBetAmount((currentBet + 0.0005).toFixed(4));
  };

  const handleDecreaseBet = () => {
    const currentBet = Number.parseFloat(betAmount);
    if (currentBet > 0.0005) {
      setBetAmount((currentBet - 0.0005).toFixed(4));
    }
  };

  const handleHalfBet = () => {
    const currentBet = Number.parseFloat(betAmount);
    setBetAmount((currentBet / 2).toFixed(4));
  };

  const handleDoubleBet = () => {
    const currentBet = Number.parseFloat(betAmount);
    setBetAmount((currentBet * 2).toFixed(4));
  };

  const handleMaxBet = () => {
    setBetAmount("0.01");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-500 to-purple-900 bg-cover bg-center flex flex-col p-4">
      {/* [url('/plinko.webp')] */}
      <Header demo={false} auth={true} />
      <GameFundBoard
        handleCollision={handleCollision}
        sceneRef={sceneRef}
        engineRef={engineRef}
      />
      <GameControls
        demo={false}
        showBonus={false}
        setShowBonus={() => {}}
        fund={true}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        autoCount={autoCount}
        setAutoCount={setAutoCount}
        handlePlaceBet={handlePlaceBet}
      />
    </div>
  );
};

export default FundedHomePage;
