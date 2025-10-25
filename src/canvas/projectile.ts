import { AnimatedSprite } from "pixi.js";
import { Actor, ActorTeamType } from "./actor";
import { CANVAS_BORDER_HEIGHT, CANVAS_BORDER_WIDTH, PROJECTILE_TICKS_PER_TILE, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import { GameMap } from "./game-map";
import { DATA } from "./data";

export class ProjectileFactory {
    static createProjectile(owner: Actor): Projectile | undefined {
        //TODO: Add in projectile sprite creation.
        let animation: AnimatedSprite | undefined;

        if (owner.data.stats.pierceDamage > owner.data.stats.bluntDamage &&
            owner.data.stats.pierceDamage > owner.data.stats.magicDamage) {
            animation = DATA.cloneAnimation('pierce_projectile');
        } else if (owner.data.stats.bluntDamage > owner.data.stats.pierceDamage &&
                   owner.data.stats.bluntDamage > owner.data.stats.magicDamage) {
            animation = DATA.cloneAnimation('blunt_projectile');
        } else {
            animation = DATA.cloneAnimation('magic_projectile');
        }

        if (animation) {
            const startX = owner.x;
            const startY = owner.y;
            if (owner.target) {
                const endX = owner.target.x;
                const endY = owner.target.y;
                const direction = Math.atan2(endY - startY, endX - startX);
                animation.rotation = direction;
                return new Projectile(owner, startX, startY, direction, animation);
            }
            return new Projectile(owner, startX, startY, 0, animation);
        }        
    }
}

export class Projectile {
    private x: number;
    private y: number;
    private direction: number;
    private owner: Actor;
    private distanceTraveled: number = 0;
    public destroyed: boolean = false;
    public animation: AnimatedSprite;

    constructor(owner: Actor, x: number, y: number, direction: number, animation: AnimatedSprite) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.owner = owner;
        this.animation = animation;
        this.animation.x = this.x + CANVAS_BORDER_WIDTH + (owner.teamType == ActorTeamType.ENEMY ? animation.width : 0);
        this.animation.y = this.y + CANVAS_BORDER_HEIGHT + (animation.height);
        this.animation.zIndex = 100;
    }

    update(map: GameMap) {
        if (this.destroyed) {
            return;
        }

        const changeX = Math.cos(this.direction) * PROJECTILE_TICKS_PER_TILE;
        const changeY = Math.sin(this.direction) * PROJECTILE_TICKS_PER_TILE;
        this.x += changeX;
        this.y += changeY;
        this.distanceTraveled += PROJECTILE_TICKS_PER_TILE;

        this.animation.x += changeX;
        this.animation.y += changeY;

        // Check for collisions with the map
        const collisionChecks = [];
        collisionChecks.push(Math.floor(this.x / TILE_WIDTH));
        collisionChecks.push(Math.floor(this.y / TILE_HEIGHT));
        collisionChecks.push(Math.ceil(this.x / TILE_WIDTH));
        collisionChecks.push(Math.ceil(this.y / TILE_HEIGHT));

        for (let i = 0; i < collisionChecks.length; i += 2) {
            const tileX = collisionChecks[i];
            const tileY = collisionChecks[i+1];

            if (tileX != undefined && tileY != undefined) {
                const tile = map.tiles[tileX]?.[tileY];

                if (tile && ((tile.actor && tile.actor !== this.owner && tile.actor.teamType == this.owner.getTargetType()) || !tile.passable)) {
                    // If the tile has an actor, deal damage
                    this.owner.act(tileX, tileY, map);
                    this.destroyed = true;
                    return;
                }
            }            
        }
        
        if (this.distanceTraveled > (this.owner.data.action.range + 0.5) * TILE_WIDTH) {
            this.animation.destroy();
            this.destroyed = true;
        }
    }
}