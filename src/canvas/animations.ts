import { EffectType, ProjectileType, UnitColor } from "./constants";

/**
 * Base Animation Class
 */
class Animation {
  public name: string;
  public textureName: string;
  public frameX: number;
  public frameY: number;
  public frameWidth: number;
  public frameHeight: number;
  public frameSpeed: number;
  public frameCount: number;
  public loop: boolean;
  public offsetX: number;
  public offsetY: number;

  /**
   * Constructor
   */
  constructor() {
  }
}

/**
 * Knight Animation Class
 */
class KnightAnimation extends Animation {
  /**
   * Constructor
   */
  constructor(color: UnitColor) {
    super();
    this.name = `${color}_knight`;
    this.textureName = "units";
    this.frameX = this.getFrameX(color);
    this.frameY = 0;
    this.frameWidth = 24;
    this.frameHeight = 36;
    this.frameSpeed = 0;
    this.frameCount = 0;
    this.loop = false;
    this.offsetX = 0;
    this.offsetY = 24;
  }

  private getFrameX(color: UnitColor): number {
    switch (color) {
      case 'blue':
        return 24;
      case 'purple':
        return 48;
      case 'green':
      default:
        return 0;
    }
  }
}

/**
 * Projectile Animation Class
 */
class ProjectileAnimation extends Animation {
  constructor(type: ProjectileType) {
    super();
    this.setSpecifics(type);
    this.name = `projectile_${type}`;
    this.textureName = "other";
    this.frameY = 0;
    this.frameSpeed = 0;
    this.frameCount = 0;
    this.loop = false;
  }

  private setSpecifics(type: ProjectileType): void {
    switch (type) {
      case 'blunt':
        this.frameX = 16;
        this.frameWidth = 17;
        this.frameHeight = 15;
        this.offsetX = -9;
        this.offsetY = 8;
        return;
      case 'pierce':
        this.frameX = 33;
        this.frameWidth = 18;
        this.frameHeight = 7;
        this.offsetX = -9;
        this.offsetY = 4;
        return;
      case 'magic':
      default:
        this.frameX = 0;
        this.frameWidth = 16;
        this.frameHeight = 10;
        this.offsetX = -5;
        this.offsetY = 8;
        return;
    }
  }
}

/**
 * Effect Animation Class
 */
class EffectAnimation extends Animation {
  constructor(type: EffectType) {
    super();
    this.setSpecifics(type);
    this.name = `effect_${type}`;
    this.textureName = "other";
    this.frameWidth = 24;
    this.frameHeight = 24;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  private setSpecifics(type: EffectType): void {
    switch (type) {
      case 'blunt':
        this.frameX = 48;
        this.frameY = 48;
        this.frameSpeed = 45;
        this.frameCount = 5;
        this.loop = false;
        return;
      case 'pierce':
        this.frameX = 48;
        this.frameY = 24;
        this.frameSpeed = 35;
        this.frameCount = 7;
        this.loop = false;
        return;
      case 'curse':
        this.frameX = 0;
        this.frameY = 24;
        this.frameSpeed = 50;
        this.frameCount = 2;
        this.loop = true;
        return;
      case 'heal':
        this.frameX = 0;
        this.frameY = 48;
        this.frameSpeed = 50;
        this.frameCount = 2;
        this.loop = true;
        return;
      case 'buff':
        this.frameX = 0;
        this.frameY = 48;
        this.frameSpeed = 50;
        this.frameCount = 2;
        this.loop = true;
        return;
      case 'magic':
      default:
        this.frameX = 72;
        this.frameY = 0;
        this.frameSpeed = 45;
        this.frameCount = 5;
        this.loop = false;
        return;
    }
  }
}

const background1 = {
  name: "background1",
  textureName: "backdrops",
  frameX: 0,
  frameY: 0,
  frameWidth: 320,
  frameHeight: 200,
  frameSpeed: 0,
  frameCount: 0,
  loop: false,
  offsetX: 0,
  offsetY: 0
};

export const animations: Animation[] = [
  background1,
  new KnightAnimation('green'),
  new KnightAnimation('blue'),
  new KnightAnimation('purple'),
  new ProjectileAnimation('magic'),
  new ProjectileAnimation('blunt'),
  new ProjectileAnimation('pierce'),
  new EffectAnimation('magic'),
  new EffectAnimation('blunt'),
  new EffectAnimation('pierce'),
  new EffectAnimation('curse'),
  new EffectAnimation('heal'),
  new EffectAnimation('buff')
];
