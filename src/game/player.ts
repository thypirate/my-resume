import * as PIXI from "pixi.js";
import { WORLD_WIDTH, WORLD_HEIGHT } from "./zones";

const FRAME_W = 32;
const FRAME_H = 32;
const SCALE = 2.5;
const IDLE_COLS = 2;
const WALK_COLS = 4;
const ROWS = 3;
const BOUNDS = 20;

// Sprite rows: 0 = down · 1 = left (flip for right) · 2 = up
// Pixels occupy rows 9-22 within each 32px frame; anchor at 22/32 grounds the sprite.
const FEET_ANCHOR = 22 / 32;

interface DirConfig {
  row: number;
  flipX: boolean;
}

function dirConfig(dx: number, dy: number): DirConfig {
  if (Math.abs(dx) >= Math.abs(dy)) {
    if (dx < 0) return { row: 1, flipX: true }; // left = flipped right
    if (dx > 0) return { row: 1, flipX: false }; // right
  }
  if (dy < 0) return { row: 2, flipX: false }; // up
  return { row: 0, flipX: false }; // down
}

type AnimState = "idle" | "walk";

export class Player {
  x: number;
  y: number;
  private container: PIXI.Container;
  private shadow: PIXI.Graphics;
  private fallback: PIXI.Graphics;
  private sprite: PIXI.AnimatedSprite | null = null;
  private idleFrames: PIXI.Texture[][] = [];
  private walkFrames: PIXI.Texture[][] = [];
  private loaded = false;
  private currentAnim: AnimState = "idle";
  private currentRow = 0;
  private currentFlipX = false;

  constructor(startX: number, startY: number, parent: PIXI.Container) {
    this.x = startX;
    this.y = startY;

    this.container = new PIXI.Container();
    parent.addChild(this.container);

    // Ground shadow at feet (y=0 of container)
    this.shadow = new PIXI.Graphics();
    this.shadow.beginFill("#000000", 0.28);
    this.shadow.drawEllipse(0, 2, 16, 6);
    this.shadow.endFill();
    this.container.addChild(this.shadow);

    // Fallback dot shown while sprites load
    this.fallback = new PIXI.Graphics();
    this.fallback.beginFill("#06b6d4", 0.15);
    this.fallback.drawCircle(0, -18, 24);
    this.fallback.endFill();
    this.fallback.beginFill("#06b6d4");
    this.fallback.drawCircle(0, -18, 14);
    this.fallback.endFill();
    this.container.addChild(this.fallback);

    this.container.position.set(this.x, this.y);
    void this.loadSprites();
  }

  private async loadSprites() {
    try {
      const [idleTex, walkTex] = await Promise.all([
        PIXI.Assets.load<PIXI.Texture>("/characters/idle.png"),
        PIXI.Assets.load<PIXI.Texture>("/characters/walk.png"),
      ]);

      for (let row = 0; row < ROWS; row++) {
        this.idleFrames[row] = Array.from(
          { length: IDLE_COLS },
          (_, col) =>
            new PIXI.Texture(
              idleTex.baseTexture,
              new PIXI.Rectangle(
                col * FRAME_W,
                row * FRAME_H,
                FRAME_W,
                FRAME_H,
              ),
            ),
        );
        this.walkFrames[row] = Array.from(
          { length: WALK_COLS },
          (_, col) =>
            new PIXI.Texture(
              walkTex.baseTexture,
              new PIXI.Rectangle(
                col * FRAME_W,
                row * FRAME_H,
                FRAME_W,
                FRAME_H,
              ),
            ),
        );
      }

      this.loaded = true;
      this.fallback.visible = false;
      this.applySprite("idle", 0, false);
    } catch (err) {
      console.warn("Character sprites failed to load, using fallback:", err);
    }
  }

  private applySprite(anim: AnimState, row: number, flipX: boolean) {
    if (!this.loaded) return;

    if (
      this.sprite &&
      this.currentAnim === anim &&
      this.currentRow === row &&
      this.currentFlipX === flipX
    )
      return;

    if (this.sprite) {
      this.sprite.stop();
      this.container.removeChild(this.sprite);
      this.sprite.destroy({ texture: false, baseTexture: false });
    }

    this.currentAnim = anim;
    this.currentRow = row;
    this.currentFlipX = flipX;

    const frames =
      anim === "idle" ? this.idleFrames[row] : this.walkFrames[row];
    const s = new PIXI.AnimatedSprite(frames);
    s.animationSpeed = anim === "walk" ? 0.14 : 0.07;
    // Anchor at the character's actual feet (row 22 of 32 in each frame)
    s.anchor.set(0.5, FEET_ANCHOR);
    s.scale.set(flipX ? -SCALE : SCALE, SCALE);
    s.play();

    this.sprite = s;
    this.container.addChild(s);
  }

  move(dx: number, dy: number) {
    const moving = Math.abs(dx) > 0.01 || Math.abs(dy) > 0.01;
    const { row, flipX } = moving
      ? dirConfig(dx, dy)
      : { row: this.currentRow, flipX: this.currentFlipX };

    if (this.loaded) {
      this.applySprite(moving ? "walk" : "idle", row, flipX);
    }

    this.x = Math.max(BOUNDS, Math.min(WORLD_WIDTH - BOUNDS, this.x + dx));
    this.y = Math.max(BOUNDS, Math.min(WORLD_HEIGHT - BOUNDS, this.y + dy));
    this.container.position.set(this.x, this.y);
  }

  destroy() {
    this.sprite?.stop();
    this.container.destroy({ children: true });
  }
}
