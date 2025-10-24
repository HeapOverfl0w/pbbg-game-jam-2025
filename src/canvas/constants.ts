import { ActorActionTargetsType, ActorActionType, ActorColorType, ActorData, TeamData } from "../redux/actor-data";

export type UnitColor = 'green' | 'blue' | 'purple';
export type ProjectileType = 'magic' | 'blunt' | 'pierce';
export type EffectType = 'magic' | 'blunt' | 'pierce' | 'curse' | 'heal' | 'buff';

export const TILE_WIDTH = 24;
export const TILE_HEIGHT = 24;
export const CANVAS_BORDER_WIDTH = 40;
export const CANVAS_BORDER_HEIGHT = 40;
export const TILES_X_NO_MANS_LAND = 2;
export const TILES_X_PER_SIDE = 4;
export const TILES_X = TILES_X_PER_SIDE * 2 + TILES_X_NO_MANS_LAND;
export const TILES_Y = 5;
export const CANVAS_WIDTH = (TILES_X * TILE_WIDTH) + (CANVAS_BORDER_WIDTH * 2);
export const CANVAS_HEIGHT = (TILES_Y * TILE_HEIGHT) + (CANVAS_BORDER_HEIGHT * 2);
export const TICK_RATE = 30; // 30 ticks per second
export const MS_PER_TICK = 1000 / TICK_RATE;
export const MOVEMENT_SPEED = 1; // tiles per second
export const MOVEMENT_TICKS_PER_TILE = MOVEMENT_SPEED / TICK_RATE;
export const PROJECTILE_SPEED = 3; // tiles per second
export const PROJECTILE_TICKS_PER_TILE = PROJECTILE_SPEED / TICK_RATE;

export const MAX_ROUND_TIME_MS = 60000; // 1 minute per round

export const ACTION_TARGETS_TYPE_TO_TILE_OFFSETS: Record<ActorActionTargetsType, {x: number, y: number}[]> = {
    [ActorActionTargetsType.SINGLE]: [{ x: 0, y: 0 }],
    [ActorActionTargetsType.SMALL_AOE]: [{ x: 0, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
    [ActorActionTargetsType.LARGE_AOE]: [{ x: 0, y: 0 }, { x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 },
        { x: -2, y: -2 }, { x: -1, y: -2 }, { x: 0, y: -2 }, { x: 1, y: -2 }, { x: 2, y: -2 },
        { x: -2, y: -1 }, { x: 2, y: -1 },
        { x: -2, y: 0 }, { x: 2, y: 0 },
        { x: -2, y: 1 }, { x: 2, y: 1 },
        { x: -2, y: 2 }, { x: -1, y: 2 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
    [ActorActionTargetsType.CROSS]: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
    [ActorActionTargetsType.LARGE_CROSS]: [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 },
        { x: -2, y: 0 }, { x: 2, y: 0 },
        { x: 0, y: -2 }, { x: 0, y: 2 }],
    [ActorActionTargetsType.ONE_PIERCE]: [{ x: 0, y: 0 }, { x: 1, y: 0 }],
    [ActorActionTargetsType.TWO_PIERCE]: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }],
    [ActorActionTargetsType.THREE_PIERCE]: [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }],
    [ActorActionTargetsType.CLEAVE]: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }],
    [ActorActionTargetsType.LARGE_CLEAVE]: [{ x: 0, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }, { x: 0, y: -2 }, { x: 0, y: 2 }],
}

export const distanceFormula = (x1: number, y1: number, x2: number, y2: number): number => {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

export const createTestTeamData = (): TeamData => {
    const actors2dArray: (ActorData | undefined)[][] = [];
    for (let x = 0; x < 4; x++) {
        actors2dArray.push([]);
        for (let y = 0; y < 5; y++) {
            if (x == 0 || x == 4) {
                actors2dArray[x].push({
                    id: `actor-${x}-${y}`,
                    name: `Knight`,
                    description: "",
                    color: Math.random() > 0.5 ? ActorColorType.GREEN : ActorColorType.BLUE,
                    stats: {
                        maxHealth: 10,
                        pierceResist: 0.5,
                        pierceDamage: 2,
                        bluntResist: 0,
                        bluntDamage: 0,
                        magicResist: 0,
                        magicDamage: 0,
                        actionSpeed: 1500
                    },
                    action: {
                        type: ActorActionType.ATTACK,
                        range: 1,
                        targets: ActorActionTargetsType.SINGLE,
                        buffCurseStatType: undefined
                    }
                });
            } else {
                actors2dArray[x].push(undefined);
            }
        }
    }

    return {
        actors: actors2dArray,
        teamStats: {
            maxHealth: 0,
            pierceResist: 0,
            pierceDamage: 0,
            bluntResist: 0,
            bluntDamage: 0,
            magicResist: 0,
            magicDamage: 0,
            actionSpeed: 0
        }
    };
}