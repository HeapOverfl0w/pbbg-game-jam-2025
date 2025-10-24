import { AnimatedSprite } from "pixi.js";
import { ActorActionType, ActorData, ActorStats, ActorStatType } from "../redux/actor-data";
import { aStar, Position } from "./astar";
import { ACTION_TARGETS_TYPE_TO_TILE_OFFSETS, CANVAS_BORDER_HEIGHT, CANVAS_BORDER_WIDTH, DEFAULT_EFFECT_DURATION, distanceFormula, MOVEMENT_TICKS_PER_TILE, TILE_HEIGHT, TILE_WIDTH } from "./constants";
import { GameMap } from "./game-map";
import { ProjectileFactory } from "./projectile";
import { EffectFactory } from "./effect";

export enum ActorStateType {
    MOVING,
    ACTIONING,
    IDLE,
}

export enum ActorTeamType {
    FRIENDLY,
    ENEMY
}


export class Actor {
    public data: ActorData;
    private health: number;
    private maxHealth: number;
    private pierceResist: number;
    private pierceDamage: number;
    private bluntResist: number;
    private bluntDamage: number;
    private magicResist: number;
    private magicDamage: number;
    private actionSpeed: number;

    public teamType: ActorTeamType;

    public x: number;
    public y: number;
    public tileX: number;
    public tileY: number;
    public target: Actor | undefined = undefined;

    private state: ActorStateType = ActorStateType.IDLE;
    private waitTime: number = 0;
    private waitStart: number = 0;
    private actionWalkBounceStart: number = 0;
    private actionStart: number = 0;
    private tintChangeStart: number = 0;
    private path: Position[] = [];
    private animation: AnimatedSprite;

    constructor(data: ActorData, tileX: number, tileY: number, teamType: ActorTeamType, animation: AnimatedSprite) {
        this.data = data;
        this.tileX = tileX;
        this.tileY = tileY;
        this.x = tileX * TILE_WIDTH;
        this.y = tileY * TILE_HEIGHT;

        this.teamType = teamType;
        this.animation = animation;
        this.animation.x = this.x + CANVAS_BORDER_WIDTH;
        this.animation.y = this.y + CANVAS_BORDER_HEIGHT;

        if (teamType == ActorTeamType.FRIENDLY) {
            /* this.animation.anchor.x = -0.5;
            this.animation.x -= Math.floor(this.animation.width * 0.5); */
        } else {
            //this.animation.anchor.set(0.5, 0);
            animation.scale.x = -1; // flip for enemy
            this.animation.x += this.animation.width;//Math.floor(this.animation.width * 0.5);
        }
        
        this.animation.zIndex = this.y;

        this.setStatsFromData();
    }

    private setStatsFromData() {
        this.health = this.data.stats.maxHealth;
        this.maxHealth = this.data.stats.maxHealth;
        this.pierceResist = this.data.stats.pierceResist;
        this.pierceDamage = this.data.stats.pierceDamage;
        this.bluntResist = this.data.stats.bluntResist;
        this.bluntDamage = this.data.stats.bluntDamage;
        this.magicResist = this.data.stats.magicResist;
        this.magicDamage = this.data.stats.magicDamage;
        this.actionSpeed = this.data.stats.actionSpeed;
    }

    isAlive(): boolean {
        return this.health > 0;
    }

    damage(pierceDamage: number, bluntDamage: number, magicDamage: number) {
        const totalDamage = Math.max(0, pierceDamage * (1 - Math.min(0.8, this.pierceResist))) +
                            Math.max(0, bluntDamage * (1 - Math.min(0.8, this.bluntResist))) +
                            Math.max(0, magicDamage * (1 - Math.min(0.8, this.magicResist)));
        this.health -= totalDamage;
        this.setTint(0x8b3d3d); //red
    }

    heal(amount: number) {
        this.health = Math.min(this.maxHealth, this.health + amount);
        this.setTint(0x3d9155); //green
    }

    buff(stat: ActorStatType, amount: number) {
        switch (stat) {
            case 'pierceResist':
                this.pierceResist *= (1 + amount);
                break;
            case 'bluntResist':
                this.bluntResist *= (1 + amount);
                break;
            case 'magicResist':
                this.magicResist *= (1 + amount);
                break;
            case 'allResists':
                this.pierceResist *= (1 + amount);
                this.bluntResist *= (1 + amount);
                this.magicResist *= (1 + amount);
                break;
            case 'pierceDamage':
                this.pierceDamage *= (1 + amount);
                break;
            case 'bluntDamage':
                this.bluntDamage *= (1 + amount);
                break;
            case 'magicDamage':
                this.magicDamage *= (1 + amount);
                break;
            case 'actionSpeed':
                this.actionSpeed /= (1 + amount);
                break;
        }

        this.setTint(0x3d9155); //green
    }

    curse(stat: ActorStatType, amount: number) {
        switch (stat) {
            case 'pierceResist':
                this.pierceResist /= (1 + amount);
                break;
            case 'bluntResist':
                this.bluntResist /= (1 + amount);
                break;
            case 'magicResist':
                this.magicResist /= (1 + amount);
                break;
            case 'allResists':
                this.pierceResist /= (1 + amount);
                this.bluntResist /= (1 + amount);
                this.magicResist /= (1 + amount);
                break;
            case 'pierceDamage':
                this.pierceDamage /= (1 + amount);
                break;
            case 'bluntDamage':
                this.bluntDamage /= (1 + amount);
                break;
            case 'magicDamage':
                this.magicDamage /= (1 + amount);
                break;
            case 'actionSpeed':
                this.actionSpeed *= (1 + amount);
                break;
        }

        this.setTint(0x4d3e93); //purple
    }

    update(map: GameMap) {
        //If we're dead, don't update
        if (!this.isAlive()) {
            return;
        }
        //If we're waiting, don't update
        if (performance.now() - this.waitStart < this.waitTime) {
            return;
        }

        //modify offset for little bounce animation
        if (performance.now() - this.actionWalkBounceStart < DEFAULT_EFFECT_DURATION) {
            const bounceTime = (performance.now() - this.actionWalkBounceStart) / DEFAULT_EFFECT_DURATION;
            const bounceAmount = Math.sin(bounceTime * Math.PI) * 0.1 * (0.5 - bounceTime);
            this.animation.anchor.y += bounceAmount;
        } else if (this.state === ActorStateType.MOVING) { //if we're still moving after a little bounce then keep animating
            this.startBounce();
        }

        if (this.tintChangeStart != 0 && performance.now() - this.tintChangeStart > DEFAULT_EFFECT_DURATION) {
            this.tintChangeStart = 0;
            this.animation.tint = 0xffffff;
        }

        switch (this.state) {
            case ActorStateType.IDLE:
                this.doIdle(map);
                break;
            case ActorStateType.MOVING:
                this.doMove(map);
                break;
            case ActorStateType.ACTIONING:
                this.doAction(map);
                break;
        }
    }

    destroyAnimation() {
        this.animation.stop();
        this.animation.destroy();
    }

    private setTint(tint: number) {
        this.tintChangeStart = performance.now();
        this.animation.tint = tint;
    }

    private setState(state: ActorStateType) {
        if (state == ActorStateType.IDLE) {
            this.target = undefined;
            this.path = [];
        }
        this.state = state;
    }

    private doAction(map: GameMap) {
        //if our target is dead then switch to idle
        if (!this.target || !this.target.isAlive() || distanceFormula(this.tileX, this.tileY, this.target.tileX, this.target.tileY) > this.data.action.range) {
            this.setState(ActorStateType.IDLE);
            return;
        }

        if (performance.now() - this.actionStart >= this.actionSpeed) {
            this.actionStart = performance.now();

            if (this.data.action.type == ActorActionType.ATTACK) {
                const newProjectile = ProjectileFactory.createProjectile(this);
                if (newProjectile) {
                    map.addProjectile(newProjectile);
                }
            } else {
                this.act(this.target.tileX, this.target.tileY, map);
            }

            this.startBounce();
        }
    }

    act(tileX: number, tileY: number, map: GameMap) {
        if (this.target) {
            for (const offset of ACTION_TARGETS_TYPE_TO_TILE_OFFSETS[this.data.action.targets]) {
                const targetTileX = tileX + offset.x;
                const targetTileY = tileY + offset.y;

                if (targetTileX < 0 || targetTileX >= map.tiles.length ||
                    targetTileY < 0 || targetTileY >= map.tiles[0].length) {
                    continue;
                }

                const targetTile = map.tiles[targetTileX]?.[targetTileY];

                if (targetTile && targetTile.actor) {
                    switch (this.data.action.type) {
                        case ActorActionType.ATTACK:
                            targetTile.actor.damage(this.pierceDamage, this.bluntDamage, this.magicDamage);
                            break;
                        case ActorActionType.HEAL:
                            targetTile.actor.heal(this.magicDamage);
                            break;
                        case ActorActionType.BUFF:
                            targetTile.actor.buff(this.data.action.buffCurseStatType ?? 'allResists', this.magicDamage);
                            break;
                        default:
                            targetTile.actor.curse(this.data.action.buffCurseStatType ?? 'allResists', this.magicDamage);
                            break;
                    }

                    const newEffect = EffectFactory.createEffect(targetTile.actor.animation.x, targetTile.actor.animation.y, this);
                    if (newEffect) {
                        map.addEffect(newEffect);
                    }                    
                }
            }
        }
    }

    getTargetType(): ActorTeamType {
        return this.teamType === ActorTeamType.FRIENDLY ? ActorTeamType.ENEMY : ActorTeamType.FRIENDLY;
    }

    private doIdle(map: GameMap) {
        //find nearest enemy, make target and attempt to get path
        const nearestEnemy = this.findNearest(map, this.getTargetType());
        if (nearestEnemy) {
            this.target = nearestEnemy;
            this.path = aStar(new Position(this.tileX, this.tileY), new Position(this.target.tileX, this.target.tileY), map.tiles);

            if (!this.path || this.path.length == 0) {
                this.wait(500);
            } else {
                this.setState(ActorStateType.MOVING);
            }
        }
    }


    private wait(ms: number) {
        this.waitTime = ms;
        this.waitStart = performance.now();
    }

    private startBounce() {
        this.actionWalkBounceStart = performance.now();
    }

    private findNearest(map: GameMap, findTeamType: ActorTeamType): Actor | undefined {
        let nearestActor: Actor | undefined = undefined;
        let nearestDistance = Infinity;
        let foundTargetInRow = false;

        for (let x = 0; x < map.tiles.length; x++) {
            for (let y = 0; y < map.tiles[x].length; y++) {
                const tile = map.tiles[x][y];
                if (tile.actor && tile.actor !== this && tile.actor.teamType === findTeamType) {
                    const distance = distanceFormula(this.tileX, this.tileY, tile.actor.tileX, tile.actor.tileY);
                    const isInRow = this.tileY == y;

                    if (!foundTargetInRow && isInRow) { //if we haven't found a target in our row, but we're currently in our row use this as our default target
                        nearestDistance = distance;
                        nearestActor = tile.actor;
                        foundTargetInRow = true;
                    } else if (!foundTargetInRow && distance < nearestDistance) { //if we haven't found a target in our row then use the closest target outside of our row
                        nearestDistance = distance;
                        nearestActor = tile.actor;
                    } else if (foundTargetInRow && isInRow && distance < nearestDistance) { //if we're in our row and we already found a target in our row, but this one is closer then use this target
                        nearestDistance = distance;
                        nearestActor = tile.actor;
                    }
                }
            }
        }
        return nearestActor;
    }

    addTeamStats(teamStats: ActorStats) {
        this.maxHealth += teamStats.maxHealth;
        this.pierceResist += teamStats.pierceResist;
        this.pierceDamage += teamStats.pierceDamage;
        this.bluntResist += teamStats.bluntResist;
        this.bluntDamage += teamStats.bluntDamage;
        this.magicResist += teamStats.magicResist;
        this.magicDamage += teamStats.magicDamage;
        this.actionSpeed += teamStats.actionSpeed;
    }

    private doMove(map: GameMap) {
        //if we're in range then switch to actioning
        if (this.target && distanceFormula(this.tileX, this.tileY, this.target.tileX, this.target.tileY) <= this.data.action.range) {
            this.setState(ActorStateType.ACTIONING);
            return;
        }

        //if we've reached the end of the path then switch to idle
        if (!this.path || this.path.length == 0 || !this.target || !this.target.isAlive()) {
            this.setState(ActorStateType.IDLE);
            return;
        }

        const nextStep = this.path[0];
        if (nextStep) {
            //if the next tile is now blocked then switch to idle
            if (map.tiles[nextStep.x][nextStep.y].actor || !map.tiles[nextStep.x][nextStep.y].passable) {
                this.setState(ActorStateType.IDLE);
                return;
            }

            const stepAngle = Math.atan2(nextStep.y - this.tileY, nextStep.x - this.tileX);
            const changeX = Math.cos(stepAngle) * MOVEMENT_TICKS_PER_TILE;
            const changeY = Math.sin(stepAngle) * MOVEMENT_TICKS_PER_TILE;

            this.x += changeX;
            this.y += changeY;
            this.animation.x += changeX;
            this.animation.y += changeY;

            const newTileX = changeX > 0 ? Math.floor(this.x / TILE_WIDTH) : Math.ceil(this.x / TILE_WIDTH);
            const newTileY = Math.round(this.y / TILE_HEIGHT);

            if (newTileX !== this.tileX || newTileY !== this.tileY) {
                this.path.shift();
                map.tiles[this.tileX][this.tileY].actor = undefined;
                this.tileX = newTileX;
                this.tileY = newTileY;
                map.tiles[this.tileX][this.tileY].actor = this;
                this.animation.zIndex = this.y;
            }
        }
    }
}
