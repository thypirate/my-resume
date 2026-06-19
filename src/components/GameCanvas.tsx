import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { GameEngine } from "../game/engine";

export function GameCanvas({ onReady }: { onReady?: () => void }) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = divRef.current;
    if (!container) return;

    const app = new PIXI.Application({
      backgroundColor: "#1e3a0e",
      antialias: true,
      resizeTo: window,
      autoDensity: true,
      resolution: window.devicePixelRatio ?? 1,
    });

    container.appendChild(app.view as HTMLCanvasElement);
    const engine = new GameEngine(app);
    onReady?.();

    return () => {
      engine.destroy();
      try {
        container.removeChild(app.view as HTMLCanvasElement);
      } catch (_) {}
      app.destroy(true);
    };
  }, []);

  return (
    <div
      ref={divRef}
      style={{ position: "absolute", inset: 0, overflow: "hidden" }}
    />
  );
}
