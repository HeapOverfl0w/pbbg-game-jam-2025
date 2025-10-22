import { Container } from "pixi.js";
import { Actor, ActorTeamType } from "./actor";
import { TILES_X, TILES_X_PER_SIDE, TILES_Y } from "./constants";
import { TeamData } from "../redux/actor-data";
import { Projectile } from "./projectile";
import { DATA } from "./data";

export type Tile = {
    passable: boolean;
    actor?: Actor;
}

export class GameMap {
    public tiles: Tile[][];
    public projectiles: Projectile[] = [];
    private playerTeam: TeamData;
    private enemyTeam: TeamData;
    private stage: Container;

    constructor(stage: Container, playerTeam: TeamData, enemyTeam: TeamData) {
        this.playerTeam = playerTeam;
        this.enemyTeam = enemyTeam;
        this.stage = stage;
        this.init()
        stage.removeChildren();
    }

    private init() {
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
                        this.tiles[x][y] = { passable: true, actor: new Actor(this.playerTeam.actors[x][y]!, x, y, ActorTeamType.FRIENDLY, animation) };
                        this.tiles[x][y].actor!.addTeamStats(this.playerTeam.teamStats);
                        this.stage.addChild(animation);
                    }                    
                } else if (x >= TILES_X - TILES_X_PER_SIDE && 
                    (TILES_X - x) < this.enemyTeam.actors.length && 
                    y < this.enemyTeam.actors[(TILES_X - x)].length && 
                    this.enemyTeam.actors[(TILES_X - x)][y]
                ) {
                    const actorData = this.enemyTeam.actors[(TILES_X - x)][y]!;
                    const animation = DATA.getUnitAnimation(actorData.color, actorData.name.toLowerCase());
                    if (animation) {
                        animation.scale.x = -1; // flip for enemy
                        this.tiles[x][y] = { passable: true, actor: new Actor(actorData, x, y, ActorTeamType.ENEMY, animation) };
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

    isPlayerTeamDefeated(): boolean {
        for (let x = 0; x < this.playerTeam.actors.length; x++) {
            for (let y = 0; y < this.playerTeam.actors[x].length; y++) {
                if (this.playerTeam.actors[x][y]) {
                    return false;
                }
            }
        }
        return true;
    }

    isEnemyTeamDefeated(): boolean {
        for (let x = 0; x < this.enemyTeam.actors.length; x++) {
            for (let y = 0; y < this.enemyTeam.actors[x].length; y++) {
                if (this.enemyTeam.actors[x][y]) {
                    return false;
                }
            }
        }
        return true;
    }

    update() {
        for (let x = 0; x < TILES_X; x++) {
            for (let y = 0; y < TILES_Y; y++) {
                const tile = this.tiles[x][y];
                if (tile.actor) {
                    tile.actor.update(this);

                    if (!tile.actor.isAlive()) {
                        if (tile.actor.teamType === ActorTeamType.FRIENDLY) {
                            for (let x = 0; x < this.playerTeam.actors.length; x++) {
                                for (let y = 0; y < this.playerTeam.actors[x].length; y++) {
                                    if (this.playerTeam.actors[x][y] === tile.actor.data) {
                                        this.playerTeam.actors[x][y] = undefined;
                                    }
                                }
                            } 
                        } else if (tile.actor.teamType === ActorTeamType.ENEMY) {
                            for (let x = 0; x < this.enemyTeam.actors.length; x++) {
                                for (let y = 0; y < this.enemyTeam.actors[x].length; y++) {
                                    if (this.enemyTeam.actors[x][y] === tile.actor.data) {
                                        this.enemyTeam.actors[x][y] = undefined;
                                    }
                                }
                            }
                        }
                        tile.actor = undefined;
                    }
                }
            }
        }

        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            const projectile = this.projectiles[i];
            projectile.update(this);

            if (projectile.destroyed) {
                this.projectiles.splice(i, 1);
                this.stage.removeChild(projectile.animation);
            }
        }
    }
}