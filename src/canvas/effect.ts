import { AnimatedSprite } from "pixi.js";
import { CANVAS_BORDER_HEIGHT, CANVAS_BORDER_WIDTH, DEFAULT_EFFECT_DURATION, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import { Actor, ActorTeamType } from "./actor";
import { DATA } from "./data";
import { ActorActionType } from "../redux/actor-data";

export class EffectFactory {
    static createEffect(x: number, y: number, owner: Actor): Effect | undefined {
        let animation: AnimatedSprite | undefined;

        if (owner.data.action.type === ActorActionType.ATTACK) {
            if (owner.data.stats.pierceDamage >= owner.data.stats.bluntDamage &&
                owner.data.stats.pierceDamage >= owner.data.stats.magicDamage) {
                animation = DATA.cloneAnimation("pierce_effect");
            } else if (owner.data.stats.bluntDamage >= owner.data.stats.pierceDamage &&
                owner.data.stats.bluntDamage >= owner.data.stats.magicDamage) {
                animation = DATA.cloneAnimation("blunt_effect");
            } else {
                animation = DATA.cloneAnimation("magic_effect");
            }
        } else if (owner.data.action.type === ActorActionType.HEAL) {
            animation = DATA.cloneAnimation("heal_effect");
        } else if (owner.data.action.type === ActorActionType.BUFF) {
            animation = DATA.cloneAnimation("buff_effect");
        } else {
            animation = DATA.cloneAnimation("curse_effect");
        }

        if (animation) {
            x -= (owner.teamType == ActorTeamType.FRIENDLY ? animation.width : 0);
            return new Effect(x, y, DEFAULT_EFFECT_DURATION, animation);
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
        animation.zIndex = 100;
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