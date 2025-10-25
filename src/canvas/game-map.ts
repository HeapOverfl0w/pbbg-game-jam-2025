import { Container } from "pixi.js";
import { Actor, ActorTeamType } from "./actor";
import { TILES_X, TILES_X_PER_SIDE, TILES_Y } from "./constants";
import { TeamData } from "../redux/actor-data";
import { Projectile } from "./projectile";
import { DATA } from "./data";
import { Effect } from "./effect";

export type Tile = {
    passable: boolean;
    actor?: Actor;
}

export class GameMap {
    public tiles: Tile[][];
    public projectiles: Projectile[] = [];
    public effects: Effect[] = [];
    private playerTeam: TeamData;
    private enemyTeam: TeamData;
    private playerActors: Actor[] = [];
    private enemyActors: Actor[] = [];
    private stage: Container;

    constructor(stage: Container, playerTeam: TeamData, enemyTeam: TeamData) {
        this.playerTeam = playerTeam;
        this.enemyTeam = enemyTeam;
        this.stage = stage;
        this.init()
    }

    private init() {
        this.stage.removeChildren();
        const backdrop = DATA.cloneAnimation('background1');
        if (backdrop) {
            this.stage.addChild(backdrop);
        }

        this.tiles = [];
        for (let x = 0; x < TILES_X; x++) {
            this.tiles[x] = [];
            for (let y = 0; y < TILES_Y; y++) {

                if (x < TILES_X_PER_SIDE && 
                    x < this.playerTeam.actors.length && 
                    y < this.playerTeam.actors[x].length && 
                    this.playerTeam.actors[x][y]
                ) {
                    const actorData = this.playerTeam.actors[x][y]!;
                    const animation = DATA.getUnitAnimation(actorData.color, actorData.name.toLowerCase());
                    if (animation) {
                        const actor = new Actor(this.playerTeam.actors[x][y]!, x, y, ActorTeamType.FRIENDLY, animation);
                        this.playerActors.push(actor);
                        this.tiles[x][y] = { passable: true, actor};
                        this.tiles[x][y].actor!.addTeamStats(this.playerTeam.teamStats);
                        this.stage.addChild(animation);
                    }                    
                } else if (x >= TILES_X - TILES_X_PER_SIDE && 
                    (x - TILES_X + TILES_X_PER_SIDE) < this.enemyTeam.actors.length && 
                    y < this.enemyTeam.actors[(x - TILES_X + TILES_X_PER_SIDE)].length && 
                    this.enemyTeam.actors[(x - TILES_X + TILES_X_PER_SIDE)][y]
                ) {
                    const actorData = this.enemyTeam.actors[(x - TILES_X + TILES_X_PER_SIDE)][y]!;
                    const animation = DATA.getUnitAnimation(actorData.color, actorData.name.toLowerCase());
                    if (animation) {    
                        const actor = new Actor(actorData, x, y, ActorTeamType.ENEMY, animation);    
                        this.enemyActors.push(actor);                
                        this.tiles[x][y] = { passable: true, actor };
                        this.tiles[x][y].actor!.addTeamStats(this.enemyTeam.teamStats);
                        this.stage.addChild(animation);
                    }
                } else {
                    this.tiles[x][y] = { passable: true };
                }
            }
        }
    }

    addProjectile(projectile: Projectile) {
        this.stage.addChild(projectile.animation);
        this.projectiles.push(projectile);
    }

    addEffect(effect: Effect) {
        this.stage.addChild(effect.animation);
        this.effects.push(effect);
    }

    isPlayerTeamDefeated(): boolean {
        for (let x = 0; x < TILES_X; x++) {
            for (let y = 0; y < TILES_Y; y++) {
                const tile = this.tiles[x][y];
                if (tile && tile.actor?.teamType == ActorTeamType.FRIENDLY) {
                    return false;
                }
            }
        }
        return true;
    }

    isEnemyTeamDefeated(): boolean {
        for (let x = 0; x < TILES_X; x++) {
            for (let y = 0; y < TILES_Y; y++) {
                const tile = this.tiles[x][y];
                if (tile && tile.actor?.teamType == ActorTeamType.ENEMY) {
                    return false;
                }
            }
        }
        return true;
    }

    update() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(this);

            if (projectile.destroyed) {
                projectile.animation.stop();
                this.projectiles.splice(i, 1);
                this.stage.removeChild(projectile.animation);
            }
        }
        
        for (let i = this.playerActors.length - 1; i >= 0; i--) {
            const actor = this.playerActors[i];
            actor.update(this);

            if (actor && !actor.isAlive()) {
                actor.destroyAnimation();
                this.stage.removeChild(actor.animation);
                this.playerActors.splice(i, 1);
                this.tiles[actor.tileX][actor.tileY].actor = undefined;
            }
        }

        for (let i = this.enemyActors.length - 1; i >= 0; i--) {
            const actor = this.enemyActors[i];
            actor.update(this);

            if (actor && !actor.isAlive()) {
                actor.destroyAnimation();
                this.stage.removeChild(actor.animation);
                this.enemyActors.splice(i, 1);
                this.tiles[actor.tileX][actor.tileY].actor = undefined;
            }
        }

        for (let i = this.effects.length - 1; i >= 0; i--) {
            const effect = this.effects[i];
            effect.update();

            if (effect.destroyed) {
                effect.animation.stop();
                this.effects.splice(i, 1);
                this.stage.removeChild(effect.animation);
            }
        }
    }
}