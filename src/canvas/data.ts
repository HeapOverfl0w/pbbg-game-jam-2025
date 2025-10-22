import { Rectangle, Texture, Assets, AnimatedSprite } from "pixi.js";
import { ActorColorType } from "../redux/actor-data";

//texture list
const TEXTURES = [
    "backdrops",
    "units",
    "projectiles",
]

class DataLoader {
    public textures: Record<string, Texture> = {};
    public animations: Record<string, AnimatedSprite> = {};

    constructor() {
        
    }

    async load() {
        try {
            await this.loadTextures();
            await this.loadAnimations();
            console.log("Data loaded successfully");
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    async loadTextures() {
        for (const textureName of TEXTURES) {
            this.textures[textureName] = await Assets.load("./img/" + textureName + ".png");
            this.textures[textureName].source.scaleMode = "nearest"; // Set scale mode to nearest for pixel art
        }
    }

    async loadAnimations() {
        this.createAnimation({
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
        });

        this.createAnimation({
            name: "green_knight",
            textureName: "units",
            frameX: 0,
            frameY: 0,
            frameWidth: 24,
            frameHeight: 36,
            frameSpeed: 0,
            frameCount: 0,
            loop: false,
            offsetX: 0,
            offsetY: 24
        });

        this.createAnimation({
            name: "blue_knight",
            textureName: "units",
            frameX: 24,
            frameY: 0,
            frameWidth: 24,
            frameHeight: 36,
            frameSpeed: 0,
            frameCount: 0,
            loop: false,
            offsetX: 0,
            offsetY: 24
        });

        this.createAnimation({
            name: "purple_knight",
            textureName: "units",
            frameX: 48,
            frameY: 0,
            frameWidth: 24,
            frameHeight: 36,
            frameSpeed: 0,
            frameCount: 0,
            loop: false,
            offsetX: 0,
            offsetY: 24
        });

        this.createAnimation({
            name: "magic_projectile",
            textureName: "projectiles",
            frameX: 0,
            frameY: 0,
            frameWidth: 16,
            frameHeight: 10,
            frameSpeed: 0,
            frameCount: 0,
            loop: false,
            offsetX: -5,
            offsetY: 8
        });

        this.createAnimation({
            name: "blunt_projectile",
            textureName: "projectiles",
            frameX: 16,
            frameY: 0,
            frameWidth: 17,
            frameHeight: 15,
            frameSpeed: 0,
            frameCount: 0,
            loop: false,
            offsetX: -9,
            offsetY: 8
        });

        this.createAnimation({
            name: "pierce_projectile",
            textureName: "projectiles",
            frameX: 33,
            frameY: 0,
            frameWidth: 18,
            frameHeight: 7,
            frameSpeed: 0,
            frameCount: 0,
            loop: false,
            offsetX: -9,
            offsetY: 4
        });
    }

    private createAnimation(options: {
        name: string; 
        textureName: string; 
        frameX: number; 
        frameY: number; 
        frameWidth: number; 
        frameHeight: number; 
        frameSpeed: number; 
        frameCount: number; 
        loop: boolean; 
        offsetX: number; 
        offsetY: number
    }): void {
        const frames = [];
        const texture = this.textures[options.textureName];
        if (texture) {
            for (let i = 0; i < options.frameCount; i++) {
                frames.push(
                    new Texture({ source: texture.source, frame: new Rectangle(options.frameX + i * options.frameWidth, options.frameY, options.frameWidth, options.frameHeight) }),
                );
            }
        }

        const animatedSprite = new AnimatedSprite(frames);
        if (options.offsetX == 0 && options.offsetY == 0) {
            animatedSprite.anchor.set(0.5, 0);
        } else {
            animatedSprite.anchor.set(options.offsetX / options.frameWidth, options.offsetY / options.frameHeight);
        }
        animatedSprite.animationSpeed = options.frameSpeed;
        animatedSprite.loop = options.loop;
        this.animations[options.name] = animatedSprite;
    }

    public cloneAnimation(name: string): AnimatedSprite | undefined {
        const animation = this.animations[name];
        if (!animation) {
            console.warn(`Animation ${name} not found`);
            return undefined;
        }

        const sprite = new AnimatedSprite(animation.textures);
        sprite.anchor.set(animation.anchor.x, animation.anchor.y);
        sprite.animationSpeed = 0.1;
        sprite.loop = animation.loop;
        return sprite;
    }

    public getUnitAnimation(color: ActorColorType, name: string) {
        const colorPrefix = ActorColorType[color].toLowerCase();
        return this.cloneAnimation(colorPrefix + '_' + name);
    }

}

export const DATA = new DataLoader();