import * as PIXI from "pixi.js";
import { useStore } from "../store";
import type { ZoneId } from "../store";
import {
  WORLD_WIDTH,
  WORLD_HEIGHT,
  ZONES,
  PLAYER_START_X,
  PLAYER_START_Y,
  PROXIMITY,
} from "./zones";
import type { ZoneConfig } from "./zones";
import { buildWorld } from "./world";
import { Player } from "./player";

const SPEED = 4.5;
const RIPPLE_INTERVAL = 10;
const RIPPLE_LIFE = 24;
const RIPPLE_COLOR = "#06b6d4";

const ARROW_ORBIT = 52;
const ARROW_SIZE = 10;
const ARROW_FADE_START = 280;

interface Ripple {
  gfx: PIXI.Graphics;
  age: number;
}
interface ZoneArrow {
  gfx: PIXI.Graphics;
  zone: ZoneConfig;
}

export class GameEngine {
  private app: PIXI.Application;
  private worldContainer: PIXI.Container;
  private rippleContainer: PIXI.Container;
  private arrowContainer: PIXI.Container;
  private player: Player;
  private keys: Set<string> = new Set();
  private boundUpdate: (delta: number) => void;
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;
  private ripples: Ripple[] = [];
  private rippleTimer = 0;
  private zoneArrows: ZoneArrow[] = [];
  private tick = 0;

  constructor(app: PIXI.Application) {
    this.app = app;
    this.worldContainer = new PIXI.Container();
    app.stage.addChild(this.worldContainer);

    buildWorld(this.worldContainer);

    this.rippleContainer = new PIXI.Container();
    this.worldContainer.addChild(this.rippleContainer);

    this.player = new Player(
      PLAYER_START_X,
      PLAYER_START_Y,
      this.worldContainer,
    );

    this.arrowContainer = new PIXI.Container();
    //this.worldContainer.addChild(this.arrowContainer);

    for (const zone of ZONES) {
      const gfx = new PIXI.Graphics();
      this.arrowContainer.addChild(gfx);
      this.zoneArrows.push({ gfx, zone });
    }

    this.boundUpdate = this.update.bind(this);
    this.boundKeyDown = (e) => {
      this.keys.add(e.key);
    };
    this.boundKeyUp = (e) => {
      this.keys.delete(e.key);
      if (e.key === "e" || e.key === "E") {
        const { nearZone, openZone, isOverlayOpen, closeOverlay } =
          useStore.getState();
        if (isOverlayOpen) closeOverlay();
        else if (nearZone) openZone(nearZone);
      }
      if (e.key === "Escape") useStore.getState().closeOverlay();
    };

    window.addEventListener("keydown", this.boundKeyDown);
    window.addEventListener("keyup", this.boundKeyUp);
    app.ticker.add(this.boundUpdate);
  }

  private spawnRipple(x: number, y: number) {
    const gfx = new PIXI.Graphics();
    gfx.position.set(x, y);
    this.rippleContainer.addChild(gfx);
    this.ripples.push({ gfx, age: 0 });
  }

  private updateRipples() {
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.age++;
      const t = r.age / RIPPLE_LIFE;
      const rx = 5 + t * 22;
      const alpha = (1 - t) * 0.5;
      r.gfx.clear();
      r.gfx.lineStyle(1.5, RIPPLE_COLOR, alpha);
      r.gfx.drawEllipse(0, 0, rx, rx * 0.38);
      if (r.age >= RIPPLE_LIFE) {
        this.rippleContainer.removeChild(r.gfx);
        r.gfx.destroy();
        this.ripples.splice(i, 1);
      }
    }
  }

  private updateZoneArrows() {
    const px = this.player.x;
    const py = this.player.y;

    this.arrowContainer.position.set(px, py);

    const pulse = 0.55 + Math.sin(this.tick * 0.07) * 0.18;

    for (const { gfx, zone } of this.zoneArrows) {
      const cx = zone.x + zone.width / 2;
      const cy = zone.y + zone.height / 2;
      const angle = Math.atan2(cy - py, cx - px);
      const dist = Math.hypot(cx - px, cy - py);
      const proximity = Math.max(
        0,
        Math.min(1, (dist - PROXIMITY) / ARROW_FADE_START),
      );
      const alpha = pulse * proximity;

      gfx.clear();
      if (alpha < 0.04) continue;

      const ox = Math.cos(angle) * ARROW_ORBIT;
      const oy = Math.sin(angle) * ARROW_ORBIT;
      const tipX = ox + Math.cos(angle) * ARROW_SIZE;
      const tipY = oy + Math.sin(angle) * ARROW_SIZE;
      const perp = angle + Math.PI / 2;
      const hw = ARROW_SIZE * 0.6;
      const backX = ox - Math.cos(angle) * (ARROW_SIZE * 0.45);
      const backY = oy - Math.sin(angle) * (ARROW_SIZE * 0.45);
      const b1x = backX + Math.cos(perp) * hw;
      const b1y = backY + Math.sin(perp) * hw;
      const b2x = backX - Math.cos(perp) * hw;
      const b2y = backY - Math.sin(perp) * hw;

      const color = parseInt(zone.color.slice(1), 16);
      gfx.beginFill(color, alpha);
      gfx.moveTo(tipX, tipY);
      gfx.lineTo(b1x, b1y);
      gfx.lineTo(b2x, b2y);
      gfx.closePath();
      gfx.endFill();

      gfx.lineStyle(1, color, alpha * 0.4);
      gfx.moveTo(0, 0);
      gfx.lineTo(backX, backY);
    }
  }

  private update(delta: number) {
    if (useStore.getState().isOverlayOpen) return;

    this.tick++;

    let dx = 0;
    let dy = 0;
    if (this.keys.has("ArrowLeft") || this.keys.has("a") || this.keys.has("A"))
      dx -= 1;
    if (this.keys.has("ArrowRight") || this.keys.has("d") || this.keys.has("D"))
      dx += 1;
    if (this.keys.has("ArrowUp") || this.keys.has("w") || this.keys.has("W"))
      dy -= 1;
    if (this.keys.has("ArrowDown") || this.keys.has("s") || this.keys.has("S"))
      dy += 1;

    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    const moving = dx !== 0 || dy !== 0;
    this.player.move(dx * SPEED * delta, dy * SPEED * delta);

    if (moving) {
      this.rippleTimer++;
      if (this.rippleTimer >= RIPPLE_INTERVAL) {
        this.spawnRipple(this.player.x, this.player.y);
        this.rippleTimer = 0;
      }
    } else {
      this.rippleTimer = RIPPLE_INTERVAL;
    }

    this.updateRipples();
    this.updateZoneArrows();
    this.checkZones();
    this.updateCamera();
  }

  private checkZones() {
    const { x, y } = this.player;
    let found: ZoneId | null = null;
    for (const zone of ZONES) {
      const inX =
        x >= zone.x - PROXIMITY && x <= zone.x + zone.width + PROXIMITY;
      const inY =
        y >= zone.y - PROXIMITY && y <= zone.y + zone.height + PROXIMITY;
      if (inX && inY) {
        found = zone.id;
        break;
      }
    }
    const { nearZone, setNearZone } = useStore.getState();
    if (found !== nearZone) setNearZone(found);
  }

  private updateCamera() {
    const sw = window.innerWidth;
    const sh = window.innerHeight;
    const targetX = sw / 2 - this.player.x;
    const targetY = sh / 2 - this.player.y;
    const clampedX = Math.min(0, Math.max(sw - WORLD_WIDTH, targetX));
    const clampedY = Math.min(0, Math.max(sh - WORLD_HEIGHT, targetY));
    this.worldContainer.x += (clampedX - this.worldContainer.x) * 0.1;
    this.worldContainer.y += (clampedY - this.worldContainer.y) * 0.1;
  }

  destroy() {
    this.app.ticker.remove(this.boundUpdate);
    window.removeEventListener("keydown", this.boundKeyDown);
    window.removeEventListener("keyup", this.boundKeyUp);
    this.player.destroy();
    for (const r of this.ripples) r.gfx.destroy();
    this.ripples = [];
    for (const a of this.zoneArrows) a.gfx.destroy();
    this.zoneArrows = [];
  }
}
