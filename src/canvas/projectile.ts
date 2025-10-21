import { Actor } from "./actor";
import { PROJECTILE_TICKS_PER_TILE, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import { GameMap } from "./game-map";

export class ProjectileFactory {
    static createProjectile(owner: Actor): Projectile {
        //TODO: Add in projectile sprite creation.
        const startX = owner.tileX * TILE_WIDTH + TILE_WIDTH / 2;
        const startY = owner.tileY * TILE_HEIGHT + TILE_HEIGHT / 2;
        if (owner.target) {
            const endX = owner.target.tileX * TILE_WIDTH + TILE_WIDTH / 2;
            const endY = owner.target.tileY * TILE_HEIGHT + TILE_HEIGHT / 2;
            const direction = Math.atan2(endY - startY, endX - startX);
            return new Projectile(owner, startX, startY, direction);
        }
        return new Projectile(owner, startX, startY, 0);
    }
}

export class Projectile {
    private x: number;
    private y: number;
    private direction: number;
    private owner: Actor;
    private distanceTraveled: number = 0;
    public destroyed: boolean = false;

    constructor(owner: Actor, x: number, y: number, direction: number) {
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.owner = owner;
    }

    update(map: GameMap) {
        if (this.destroyed) {
            return;
        }

        this.x += Math.cos(this.direction) * PROJECTILE_TICKS_PER_TILE;
        this.y += Math.sin(this.direction) * PROJECTILE_TICKS_PER_TILE;
        this.distanceTraveled += PROJECTILE_TICKS_PER_TILE;

        // Check for collisions with the map
        const tileX = Math.floor(this.x / TILE_WIDTH);
        const tileY = Math.floor(this.y / TILE_HEIGHT);
        const tile = map.tiles[tileX]?.[tileY];

        if (tile && ((tile.actor && tile.actor !== this.owner && tile.actor.teamType == this.owner.getTargetType()) || !tile.passable)) {
            // If the tile has an actor, deal damage
            this.owner.act(tileX, tileY, map);
            this.destroyed = true;
            return;
        }

        if (this.distanceTraveled >= this.owner.data.actionType.range) {
            this.destroyed = true;
            return;
        }
    }
}