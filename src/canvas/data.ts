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

        // witch
        this.createAnimation({
            name: 'green_witch',
            textureName: 'units',
            frameX: 0,
            frameY: 36,
            frameWidth: 27,
            frameHeight: 32,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -4
        });
        this.createAnimation({
            name: 'blue_witch',
            textureName: 'units',
            frameX: 27,
            frameY: 36,
            frameWidth: 27,
            frameHeight: 32,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -4
        });
        this.createAnimation({
            name: 'purple_witch',
            textureName: 'units',
            frameX: 54,
            frameY: 36,
            frameWidth: 27,
            frameHeight: 32,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -4
        });

        //dominator
        this.createAnimation({
            name: 'green_dominator',
            textureName: 'units',
            frameX: 81,
            frameY: 0,
            frameWidth: 28,
            frameHeight: 40,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 4
        });
        this.createAnimation({
            name: 'blue_dominator',
            textureName: 'units',
            frameX: 109,
            frameY: 0,
            frameWidth: 28,
            frameHeight: 40,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 4
        });
        this.createAnimation({
            name: 'purple_dominator',
            textureName: 'units',
            frameX: 137,
            frameY: 0,
            frameWidth: 28,
            frameHeight: 40,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 4
        });

        //hellhound
        this.createAnimation({
            name: 'green_hellhound',
            textureName: 'units',
            frameX: 165,
            frameY: 20,
            frameWidth: 34,
            frameHeight: 20,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -16
        });
        this.createAnimation({
            name: 'blue_hellhound',
            textureName: 'units',
            frameX: 199,
            frameY: 20,
            frameWidth: 34,
            frameHeight: 20,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -16
        });
        this.createAnimation({
            name: 'purple_hellhound',
            textureName: 'units',
            frameX: 233,
            frameY: 20,
            frameWidth: 34,
            frameHeight: 20,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -16
        });

        //hellraiser
        this.createAnimation({
            name: 'green_hellraiser',
            textureName: 'units',
            frameX: 267,
            frameY: 0,
            frameWidth: 29,
            frameHeight: 41,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 5
        });
        this.createAnimation({
            name: 'blue_hellraiser',
            textureName: 'units',
            frameX: 296,
            frameY: 0,
            frameWidth: 29,
            frameHeight: 41,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 5
        });
        this.createAnimation({
            name: 'purple_hellraiser',
            textureName: 'units',
            frameX: 325,
            frameY: 0,
            frameWidth: 29,
            frameHeight: 41,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 5
        });

        //balrog
        this.createAnimation({
            name: 'green_balrog',
            textureName: 'units',
            frameX: 354,
            frameY: 0,
            frameWidth: 37,
            frameHeight: 47,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 11
        });
        this.createAnimation({
            name: 'blue_balrog',
            textureName: 'units',
            frameX: 391,
            frameY: 0,
            frameWidth: 37,
            frameHeight: 47,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 11
        });
        this.createAnimation({
            name: 'purple_balrog',
            textureName: 'units',
            frameX: 428,
            frameY: 0,
            frameWidth: 37,
            frameHeight: 47,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 11
        });

        //imp soldier
        this.createAnimation({
            name: 'green_imp_soldier',
            textureName: 'units',
            frameX: 81,
            frameY: 40,
            frameWidth: 26,
            frameHeight: 29,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -7
        });
        this.createAnimation({
            name: 'blue_imp_soldier',
            textureName: 'units',
            frameX: 107,
            frameY: 40,
            frameWidth: 26,
            frameHeight: 29,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -7
        });
        this.createAnimation({
            name: 'purple_imp_soldier',
            textureName: 'units',
            frameX: 133,
            frameY: 40,
            frameWidth: 26,
            frameHeight: 29,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -7
        });

        //imp archer
        this.createAnimation({
            name: 'green_imp_archer',
            textureName: 'units',
            frameX: 159,
            frameY: 40,
            frameWidth: 26,
            frameHeight: 29,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -7
        });
        this.createAnimation({
            name: 'blue_imp_archer',
            textureName: 'units',
            frameX: 185,
            frameY: 40,
            frameWidth: 26,
            frameHeight: 29,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -7
        });
        this.createAnimation({
            name: 'purple_imp_archer',
            textureName: 'units',
            frameX: 211,
            frameY: 40,
            frameWidth: 26,
            frameHeight: 29,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -7
        });

        //bugler
        this.createAnimation({
            name: 'green_bugler',
            textureName: 'units',
            frameX: 0,
            frameY: 68,
            frameWidth: 29,
            frameHeight: 34,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -2
        });
        this.createAnimation({
            name: 'blue_bugler',
            textureName: 'units',
            frameX: 29,
            frameY: 68,
            frameWidth: 29,
            frameHeight: 34,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -2
        });
        this.createAnimation({
            name: 'purple_bugler',
            textureName: 'units',
            frameX: 58,
            frameY: 68,
            frameWidth: 29,
            frameHeight: 34,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -2
        });

        //valkyrie
        this.createAnimation({
            name: 'green_valkyrie',
            textureName: 'units',
            frameX: 87,
            frameY: 69,
            frameWidth: 37,
            frameHeight: 42,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 6
        });
        this.createAnimation({
            name: 'blue_valkyrie',
            textureName: 'units',
            frameX: 124,
            frameY: 69,
            frameWidth: 37,
            frameHeight: 42,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 6
        });
        this.createAnimation({
            name: 'purple_valkyrie',
            textureName: 'units',
            frameX: 161,
            frameY: 69,
            frameWidth: 37,
            frameHeight: 42,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 6
        });

        //seraphim
        this.createAnimation({
            name: 'green_seraphim',
            textureName: 'units',
            frameX: 198,
            frameY: 69,
            frameWidth: 43,
            frameHeight: 43,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 7
        });
        this.createAnimation({
            name: 'blue_seraphim',
            textureName: 'units',
            frameX: 241,
            frameY: 69,
            frameWidth: 43,
            frameHeight: 43,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 7
        });
        this.createAnimation({
            name: 'purple_seraphim',
            textureName: 'units',
            frameX: 284,
            frameY: 69,
            frameWidth: 43,
            frameHeight: 43,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 7
        });

        //skeleton king
        this.createAnimation({
            name: 'green_skeleton_king',
            textureName: 'units',
            frameX: 327,
            frameY: 62,
            frameWidth: 38,
            frameHeight: 49,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 13
        });
        this.createAnimation({
            name: 'blue_skeleton_king',
            textureName: 'units',
            frameX: 365,
            frameY: 62,
            frameWidth: 38,
            frameHeight: 49,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 13
        });
        this.createAnimation({
            name: 'purple_skeleton_king',
            textureName: 'units',
            frameX: 404,
            frameY: 62,
            frameWidth: 38,
            frameHeight: 49,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 13
        });

        //skeleton
        this.createAnimation({
            name: 'green_skeleton',
            textureName: 'units',
            frameX: 0,
            frameY: 102,
            frameWidth: 18,
            frameHeight: 30,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -6
        });
        this.createAnimation({
            name: 'blue_skeleton',
            textureName: 'units',
            frameX: 18,
            frameY: 102,
            frameWidth: 18,
            frameHeight: 30,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -6
        });
        this.createAnimation({
            name: 'purple_skeleton',
            textureName: 'units',
            frameX: 36,
            frameY: 102,
            frameWidth: 18,
            frameHeight: 30,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -6
        });

        //monk
        this.createAnimation({
            name: 'green_monk',
            textureName: 'units',
            frameX: 0,
            frameY: 132,
            frameWidth: 27,
            frameHeight: 33,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -3
        });
        this.createAnimation({
            name: 'blue_monk',
            textureName: 'units',
            frameX: 27,
            frameY: 132,
            frameWidth: 27,
            frameHeight: 33,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -3
        });
        this.createAnimation({
            name: 'purple_monk',
            textureName: 'units',
            frameX: 54,
            frameY: 132,
            frameWidth: 27,
            frameHeight: 33,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -3
        });

        //eagle
        this.createAnimation({
            name: 'green_eagle',
            textureName: 'units',
            frameX: 81,
            frameY: 132,
            frameWidth: 30,
            frameHeight: 33,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -3
        });
        this.createAnimation({
            name: 'blue_eagle',
            textureName: 'units',
            frameX: 111,
            frameY: 132,
            frameWidth: 30,
            frameHeight: 33,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -3
        });
        this.createAnimation({
            name: 'purple_eagle',
            textureName: 'units',
            frameX: 141,
            frameY: 132,
            frameWidth: 30,
            frameHeight: 33,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -3
        });

        //sin slayer
        this.createAnimation({
            name: 'green_sin_slayer',
            textureName: 'units',
            frameX: 171,
            frameY: 128,
            frameWidth: 33,
            frameHeight: 37,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 1
        });
        this.createAnimation({
            name: 'blue_sin_slayer',
            textureName: 'units',
            frameX: 204,
            frameY: 128,
            frameWidth: 33,
            frameHeight: 37,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 1
        });
        this.createAnimation({
            name: 'purple_sin_slayer',
            textureName: 'units',
            frameX: 237,
            frameY: 128,
            frameWidth: 33,
            frameHeight: 37,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 1
        });

        //ranger
        this.createAnimation({
            name: 'green_ranger',
            textureName: 'units',
            frameX: 270,
            frameY: 130,
            frameWidth: 28,
            frameHeight: 35,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -1
        });
        this.createAnimation({
            name: 'blue_ranger',
            textureName: 'units',
            frameX: 298,
            frameY: 130,
            frameWidth: 28,
            frameHeight: 35,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -1
        });
        this.createAnimation({
            name: 'purple_ranger',
            textureName: 'units',
            frameX: 326,
            frameY: 130,
            frameWidth: 28,
            frameHeight: 35,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: -1
        });

        //penitent
        this.createAnimation({
            name: 'green_penitent',
            textureName: 'units',
            frameX: 354,
            frameY: 129,
            frameWidth: 21,
            frameHeight: 36,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 0
        });
        this.createAnimation({
            name: 'blue_penitent',
            textureName: 'units',
            frameX: 375,
            frameY: 129,
            frameWidth: 21,
            frameHeight: 36,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 0
        });
        this.createAnimation({
            name: 'purple_penitent',
            textureName: 'units',
            frameX: 396,
            frameY: 129,
            frameWidth: 21,
            frameHeight: 36,
            frameSpeed: 0,
            frameCount: 1,
            loop: false,
            offsetX: 0,
            offsetY: 0
        });
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
            animatedSprite.anchor.set(0, 0);
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
        sprite.play();
        return sprite;
    }

    public getUnitAnimation(color: ActorColorType, name: string) {
        const underscoreName = name.replace(' ', '_');
        const colorPrefix = ActorColorType[color].toLowerCase();
        return this.cloneAnimation(colorPrefix + '_' + underscoreName);
    }

}

export const DATA = new DataLoader();