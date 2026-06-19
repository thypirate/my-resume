import type { ZoneId } from "../store";

export interface ZoneConfig {
  id: ZoneId;
  name: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const WORLD_WIDTH = 2400;
export const WORLD_HEIGHT = 1800;

export const PLAYER_START_X = 1200;
export const PLAYER_START_Y = 900;

export const HUB = { x: 1050, y: 800, w: 300, h: 200 };

// Hub edges: left=1050, right=1350, top=800, bottom=1000
// Each zone sits ~100px from the nearest hub edge.
export const ZONES: ZoneConfig[] = [
  {
    id: "experience",
    name: "Experience",
    color: "#f59e0b",
    x: 450,   // right edge = 950 (hub left 1050 - 100)
    y: 360,   // bottom edge = 700 (hub top 800 - 100)
    width: 500,
    height: 340,
  },
  {
    id: "education",
    name: "Education",
    color: "#6366f1",
    x: 1450,  // left edge = 1450 (hub right 1350 + 100)
    y: 360,
    width: 500,
    height: 340,
  },
  {
    id: "skills",
    name: "Skills",
    color: "#10b981",
    x: 450,
    y: 1100,  // top edge = 1100 (hub bottom 1000 + 100)
    width: 500,
    height: 340,
  },
  {
    id: "projects",
    name: "Projects",
    color: "#ec4899",
    x: 1450,
    y: 1100,
    width: 500,
    height: 340,
  },
];

export const PROXIMITY = 90;
