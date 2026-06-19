import * as PIXI from "pixi.js";
import { ZONES, HUB, WORLD_WIDTH, WORLD_HEIGHT } from "./zones";

export function buildWorld(container: PIXI.Container) {
  drawGround(container);
  drawHub(container);
  drawZones(container);
}

// ── Ground ─────────────────────────────────────────────────────────────────

function drawGround(c: PIXI.Container) {
  const g = new PIXI.Graphics();

  // Base grass fill
  g.beginFill("1e3a0e", 1);
  g.drawRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
  g.endFill();

  // Subtle variation patches — seeded so they're stable across renders
  const rng = lcg(7);
  for (let i = 0; i < 260; i++) {
    const px = rng() * WORLD_WIDTH;
    const py = rng() * WORLD_HEIGHT;
    const r = 6 + rng() * 18;
    const bright = rng() > 0.5;
    g.beginFill(bright ? "#274d10" : "#172e09", 0.18 + rng() * 0.18);
    g.drawEllipse(px, py, r, r * 0.65);
    g.endFill();
  }

  c.addChild(g);
}

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

// ── Hub ────────────────────────────────────────────────────────────────────

function drawHub(c: PIXI.Container) {
  const g = new PIXI.Graphics();
  g.beginFill(0x1e2146);
  g.drawRoundedRect(HUB.x, HUB.y, HUB.w, HUB.h, 14);
  g.endFill();

  g.lineStyle(2, "#06b6d4", 0.35);
  g.drawRoundedRect(HUB.x, HUB.y, HUB.w, HUB.h, 14);
  g.lineStyle(0);
  //c.addChild(g);

  const label = new PIXI.Text(
    "Hello there, my name is",
    new PIXI.TextStyle({
      fontFamily: "monospace",
      fontSize: 13,
      fill: "#eee",
      letterSpacing: 3,
    }),
  );
  label.alpha = 0.45;
  label.anchor.set(0.5);
  label.position.set(HUB.x + HUB.w / 2, HUB.y + HUB.h / 2 - 16);
  c.addChild(label);

  const name = new PIXI.Text(
    "Ricardo Barros",
    new PIXI.TextStyle({
      fontFamily: "monospace",
      fontSize: 15,
      fill: "#eee",
      fontWeight: "bold",
    }),
  );
  const profession = new PIXI.Text(
    "I'm a Software Engineer :)",
    new PIXI.TextStyle({
      fontFamily: "monospace",
      fontSize: 15,
      fill: "#eee",
      fontWeight: "bold",
    }),
  );
  name.anchor.set(0.5);
  name.position.set(HUB.x + HUB.w / 2, HUB.y + HUB.h / 2 + 8);
  profession.anchor.set(0.5);
  profession.position.set(HUB.x + HUB.w / 2, HUB.y + HUB.h / 2 + 28);
  c.addChild(name);
  c.addChild(profession);
}

// ── Zones ──────────────────────────────────────────────────────────────────

function drawZones(c: PIXI.Container) {
  for (const zone of ZONES) {
    const g = new PIXI.Graphics();

    // filled bg
    g.beginFill(zone.color, 0.07);
    g.drawRoundedRect(zone.x, zone.y, zone.width, zone.height, 18);
    g.endFill();

    // outer glow border
    g.lineStyle(5, zone.color, 0.55);
    g.drawRoundedRect(zone.x, zone.y, zone.width, zone.height, 18);

    // inner accent line
    g.lineStyle(1, zone.color, 0.2);
    g.drawRoundedRect(
      zone.x + 6,
      zone.y + 6,
      zone.width - 12,
      zone.height - 12,
      14,
    );
    g.lineStyle(0);

    //c.addChild(g);

    const cx = zone.x + zone.width / 2;
    const cy = zone.y + zone.height / 2;

    const title = new PIXI.Text(
      zone.name.toUpperCase(),
      new PIXI.TextStyle({
        fontFamily: "monospace",
        fontSize: 20,
        fill: zone.color,
        letterSpacing: 5,
        fontWeight: "bold",
      }),
    );
    title.anchor.set(0.5);
    title.position.set(cx, zone.y + 36);
    c.addChild(title);

    const hint = new PIXI.Text(
      "Press E to explore",
      new PIXI.TextStyle({
        fontFamily: "monospace",
        fontSize: 12,
        fill: "#fff",
        letterSpacing: 1,
      }),
    );
    hint.anchor.set(0.5);
    hint.position.set(cx, zone.y + 62);
    c.addChild(hint);

    // Single pillar in the center of the zone
    drawIsoPillar(c, cx, cy, zone.color);
  }
}

// ── Isometric Pillar ───────────────────────────────────────────────────────

function scaleRGB(hex: string, factor: number): number {
  const c = parseInt(hex.slice(1), 16);
  const clamp = (v: number) => Math.min(255, Math.round(v));
  const r = clamp(((c >> 16) & 0xff) * factor);
  const g = clamp(((c >> 8) & 0xff) * factor);
  const b = clamp((c & 0xff) * factor);
  return (r << 16) | (g << 8) | b;
}

function drawIsoPillar(
  c: PIXI.Container,
  cx: number,
  cy: number,
  zoneColor: string,
) {
  // cx/cy = center of top face
  const S = 18; // half-width of iso diamond (horizontal reach)
  const hh = 9; // half-height of iso diamond (S / 2 for 2:1 ratio)
  const H = 52; // pillar body height (downward)

  const topColor = scaleRGB(zoneColor, 1.55);
  const leftColor = scaleRGB(zoneColor, 0.8);
  const rightColor = scaleRGB(zoneColor, 0.45);

  const g = new PIXI.Graphics();

  // Draw back faces first (painter's order)

  // Left face
  g.beginFill(leftColor, 0.9);
  g.drawPolygon([cx - S, cy, cx, cy + hh, cx, cy + hh + H, cx - S, cy + H]);
  g.endFill();

  // Right face
  g.beginFill(rightColor, 0.9);
  g.drawPolygon([cx + S, cy, cx, cy + hh, cx, cy + hh + H, cx + S, cy + H]);
  g.endFill();

  // Top face (drawn last = on top)
  g.beginFill(topColor, 0.95);
  g.drawPolygon([
    cx,
    cy - hh, // N
    cx + S,
    cy, // E
    cx,
    cy + hh, // S
    cx - S,
    cy, // W
  ]);
  g.endFill();

  // Subtle top-edge highlight
  g.lineStyle(1, "#ffffff", 0.18);
  g.moveTo(cx - S, cy);
  g.lineTo(cx, cy - hh);
  g.lineTo(cx + S, cy);
  g.lineStyle(0);

  c.addChild(g);
}
