import * as PIXI from "pixi.js";
import { WORLD_WIDTH, WORLD_HEIGHT } from "./zones";

const BOUNDS = 20;

export class Player {
  x: number;
  y: number;
  private container: PIXI.Container;

  constructor(startX: number, startY: number, parent: PIXI.Container) {
    this.x = startX;
    this.y = startY;

    this.container = new PIXI.Container();
    parent.addChild(this.container);

    // Ground shadow at feet (y=0 of container)
    const shadow = new PIXI.Graphics();
    shadow.beginFill("#000000", 0.28);
    shadow.drawEllipse(0, 2, 16, 6);
    shadow.endFill();
    this.container.addChild(shadow);

    // The player: a dot with a soft halo
    const dot = new PIXI.Graphics();
    dot.beginFill("#06b6d4", 0.15);
    dot.drawCircle(0, -18, 24);
    dot.endFill();
    dot.beginFill("#06b6d4");
    dot.drawCircle(0, -18, 14);
    dot.endFill();
    this.container.addChild(dot);

    this.container.position.set(this.x, this.y);
  }

  move(dx: number, dy: number) {
    this.x = Math.max(BOUNDS, Math.min(WORLD_WIDTH - BOUNDS, this.x + dx));
    this.y = Math.max(BOUNDS, Math.min(WORLD_HEIGHT - BOUNDS, this.y + dy));
    this.container.position.set(this.x, this.y);
  }

  destroy() {
    this.container.destroy({ children: true });
  }
}
