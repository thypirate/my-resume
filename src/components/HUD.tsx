import { useStore } from "../store";

const ZONE_COLOR: Record<string, string> = {
  experience: "#f59e0b",
  education: "#6366f1",
  skills: "#10b981",
  projects: "#ec4899",
};

export function HUD() {
  const nearZone = useStore((s) => s.nearZone);
  const isOverlayOpen = useStore((s) => s.isOverlayOpen);

  if (isOverlayOpen) return null;

  return (
    <div className="hud" aria-hidden="true">
      <div className="hud-controls">
        <span className="hud-key">WASD</span>
        <span className="hud-sep">or</span>
        <span className="hud-key">Arrow Keys</span>
        <span className="hud-label">to move</span>
        {nearZone && (
          <>
            <span className="hud-div" />
            <span className="hud-key" style={{ color: ZONE_COLOR[nearZone] }}>
              E
            </span>
            <span className="hud-label">to explore</span>
          </>
        )}
      </div>

      {nearZone && (
        <div
          className="hud-zone-badge"
          style={{
            borderColor: ZONE_COLOR[nearZone],
          }}
        >
          {nearZone.charAt(0).toUpperCase() + nearZone.slice(1)}
        </div>
      )}
    </div>
  );
}
