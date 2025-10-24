import { Rectangle, Texture, Assets, AnimatedSprite } from "pixi.js";
import { ActorColorType } from "../redux/actor-data";
import { animations } from "./animations";

//texture list
const TEXTURES = [
    "backdrops",
    "units",
    "other",
]

class DataLoader {
    public textures: Record<string, Texture> = {};
    public animations: Record<string, AnimatedSprite> = {};
    private status: Record<string, string> = {};

    constructor() {

    }

    async load() {
        try {
            await this.loadTextures();
            await this.loadAnimations();
            this.status = {
                text: 'Loading Complete...',
                percent: '100'
            };
            console.log("Data loaded successfully");
        } catch (error) {
            this.status = {
                text: 'Loading Complete...',
                percent: '100'
            };
            console.error("Error loading data:", error);
        }
    }

    async loadTextures() {
        for (const textureName of TEXTURES) {
            this.status = {
                text: 'Loading Textures...',
                percent: ((TEXTURES.indexOf(textureName) / (TEXTURES.length + 1)) * 100).toString()
            };
            this.textures[textureName] = await Assets.load("./img/" + textureName + ".png");
            this.textures[textureName].source.scaleMode = "nearest"; // Set scale mode to nearest for pixel art
        }
    }

    async loadAnimations() {
        this.status = {
            text: 'Loading Animations...',
            percent: ((TEXTURES.length / (TEXTURES.length + 1)) * 100).toString()
        };
        for (const animation of animations) {
            this.createAnimation(animation);
        }
    }

    public getStatus() {
        return this.status;
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