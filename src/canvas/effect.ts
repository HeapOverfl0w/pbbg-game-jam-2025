import { AnimatedSprite } from "pixi.js";
import { CANVAS_BORDER_HEIGHT, CANVAS_BORDER_WIDTH, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import { Actor } from "./actor";
import { DATA } from "./data";
import { ActorActionType } from "../redux/actor-data";

export class EffectFactory {
    static createEffect(tileX: number, tileY: number, owner: Actor): Effect | undefined {
        let animation: AnimatedSprite | undefined;

        if (owner.data.action.type === ActorActionType.ATTACK) {
            if (owner.data.stats.pierceDamage >= owner.data.stats.bluntDamage &&
                owner.data.stats.pierceDamage >= owner.data.stats.magicDamage) {
                animation = DATA.cloneAnimation("effect_pierce");
            } else if (owner.data.stats.bluntDamage >= owner.data.stats.pierceDamage &&
                owner.data.stats.bluntDamage >= owner.data.stats.magicDamage) {
                animation = DATA.cloneAnimation("effect_blunt");
            } else {
                animation = DATA.cloneAnimation("effect_magic");
            }
        } else if (owner.data.action.type === ActorActionType.HEAL) {
            animation = DATA.cloneAnimation("effect_heal");
        } else if (owner.data.action.type === ActorActionType.BUFF) {
            animation = DATA.cloneAnimation("effect_buff");
        } else {
            animation = DATA.cloneAnimation("effect_curse");
        }

        if (animation) {
            return new Effect(tileX * TILE_WIDTH + TILE_WIDTH / 2 + CANVAS_BORDER_WIDTH, tileY * TILE_HEIGHT + CANVAS_BORDER_HEIGHT, 250, animation);
        }
    }
}

export class Effect {
    public animation: AnimatedSprite;
    private duration: number;
    private creationTime: number = performance.now();
    public destroyed: boolean = false;

    constructor(x: number, y: number, duration: number, animation: AnimatedSprite) {
        animation.x = x;
        animation.y = y;
        this.animation = animation;
        this.duration = duration;
    }

    update() {
        const elapsed = performance.now() - this.creationTime;
        if (elapsed > this.duration) {
            this.animation.destroy();
            this.destroyed = true;
        }
    }
}