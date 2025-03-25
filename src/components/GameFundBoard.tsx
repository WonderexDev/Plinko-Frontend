import React, { useRef, useEffect, useCallback } from "react";
import Matter, {
  Bodies,
  Body,
  Composite,
  Engine,
  Events,
  Render,
  Runner,
  World,
} from "matter-js";

const config = {
  pins: {
    startPins: 3,
    pinSize: 4,
    pinGap: 30,
  },
  ball: {
    ballSize: 8,
  },
  engine: {
    engineGravity: 1,
  },
  world: {
    width: 400,
    height: 500,
  },
  colors: {
    background: "transparent",
    pin: "#FFFFFF",
    ball: "#FFFFFF",
    multiplierZone: "#FF69B4",
  },
};

const multipliers = [
  "10x",
  "5x",
  "2x",
  "1.5",
  "0.9",
  "0.7",
  "0.9",
  "1.5",
  "2x",
  "5x",
  "10x",
];

const GameFundBoard = ({ handleCollision, sceneRef, engineRef }) => {
  const renderRef = useRef<Matter.Render>();
  const runnerRef = useRef<Matter.Runner>();
  const pinsRef = useRef<Matter.Body[]>([]);
  const wallsRef = useRef<Matter.Body[]>([]);
  const multiplierZonesRef = useRef<Matter.Body[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Engine.create();
    engine.gravity.y = config.engine.engineGravity;
    engineRef.current = engine;

    const containerWidth = sceneRef.current.clientWidth * 0.95;
    const containerHeight = sceneRef.current.clientHeight;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: containerWidth,
        height: containerHeight,
        wireframes: false,
        background: "transparent",
        showAngleIndicator: false,
      },
    });
    renderRef.current = render;

    const runner = Runner.create();
    runnerRef.current = runner;

    const scaleX = containerWidth / config.world.width;
    const scaleY = containerHeight / config.world.height;
    const scale = Math.min(scaleX, scaleY);

    const walls = [
      Bodies.rectangle(0, containerHeight / 2, 10, containerHeight, {
        isStatic: true,
        render: { fillStyle: "transparent" },
      }),
      Bodies.rectangle(
        containerWidth,
        containerHeight / 2,
        10,
        containerHeight,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
      Bodies.rectangle(
        containerWidth / 2,
        containerHeight,
        containerWidth,
        10,
        {
          isStatic: true,
          render: { fillStyle: "transparent" },
        }
      ),
    ];
    wallsRef.current = walls;

    const pins: Body[] = [];
    const lines = 12;
    const scaledPinSize = config.pins.pinSize * scale;
    const scaledPinGap = config.pins.pinGap * scale;

    for (let l = 0; l < lines; l++) {
      const linePins = config.pins.startPins + l;
      const lineWidth = linePins * scaledPinGap;

      for (let i = 0; i < linePins; i++) {
        const pinX =
          containerWidth / 2 -
          lineWidth / 2 +
          i * scaledPinGap +
          scaledPinGap / 2;
        const pinY =
          containerWidth / (lines * 1.5) + l * scaledPinGap + scaledPinGap;

        const pin = Bodies.circle(pinX, pinY, scaledPinSize, {
          label: `pin-${l}-${i}`,
          render: {
            fillStyle: "rgba(255, 255, 255, 0.7)",
          },
          isStatic: true,
        });
        pins.push(pin);
      }
    }
    pinsRef.current = pins;

    const multiplierZones: Body[] = [];
    const zoneWidth = containerWidth / multipliers.length;
    const zoneHeight = 30 * scale;
    const zoneY = containerHeight - zoneHeight / 2 - 5;

    multipliers.forEach((multiplier, index) => {
      const zoneX = zoneWidth * index + zoneWidth / 2;
      let fillColor;
      if (multiplier === "0.7" || multiplier === "0.9") {
        fillColor = "#8B3F63";
      } else {
        fillColor = "#F8B4E3";
      }

      const zone = Bodies.rectangle(zoneX, zoneY, zoneWidth - 1, zoneHeight, {
        label: `multiplier-${index === 0 ? "999" : multiplier}`,
        isStatic: true,
        render: {
          fillStyle: fillColor,
          lineWidth: 1,
          strokeStyle: "#FFFFFF33",
        },
        chamfer: {
          radius:
            index === 0
              ? [12, 6, 6, 12]
              : index === multipliers.length - 1
              ? [6, 12, 12, 6]
              : 6,
        },
      });
      multiplierZones.push(zone);
    });
    multiplierZonesRef.current = multiplierZones;

    World.add(engine.world, [...pins, ...walls, ...multiplierZones]);

    Render.run(render);
    Runner.run(runner, engine);

    const canvas = render.canvas;
    const context = canvas.getContext("2d");

    if (context) {
      Events.on(render, "afterRender", () => {
        multipliers.forEach((multiplier, index) => {
          const zoneX = zoneWidth * index + zoneWidth / 2;
          const fontSize = multiplier.length > 3 ? 10 : 14;
          context.font = `bold ${fontSize}px Arial`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle =
            multiplier === "0.7" || multiplier === "0.9"
              ? "#FFFFFF"
              : "#C23D82";
          context.fillText(multiplier, zoneX, zoneY);
        });
      });
    }

    Events.on(engine, "collisionActive", handleCollision);

    return () => {
      Events.off(engine, "collisionActive", handleCollision);
      World.clear(engine.world, true);
      Engine.clear(engine);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) {
        render.canvas.remove();
      }
      render.textures = {};
    };
  }, [handleCollision, sceneRef, engineRef]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div ref={containerRef} className="w-full max-w-md mx-auto">
        <div
          ref={sceneRef}
          className="w-full aspect-[4/5] bg-pink-500/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg items-center justify-center flex"
        >
          {/* Matter.js will render here */}
        </div>
      </div>
    </div>
  );
};

export default GameFundBoard;
