import { useState } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { HUD } from "./components/HUD";
import { ZoneOverlay } from "./components/ZoneOverlay";

export default function App() {
  const [ready, setReady] = useState(false);
  const [loaderMounted, setLoaderMounted] = useState(true);

  const handleReady = () => {
    setReady(true);
    setTimeout(() => setLoaderMounted(false), 450);
  };

  return (
    <div className="game-root">
      <GameCanvas onReady={handleReady} />
      <HUD />
      <ZoneOverlay />
      {loaderMounted && (
        <div className={`loader${ready ? " loader--out" : ""}`} aria-hidden="true">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>
      )}
    </div>
  );
}
