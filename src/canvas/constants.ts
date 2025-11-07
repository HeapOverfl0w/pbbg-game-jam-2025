import { ActorActionTargetsType, ActorActionType, ActorColorType, ActorData, ActorOtherEffectsType, ActorRarityType, ActorStatType, TeamData } from "../redux/actor-data";

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
export const MOVEMENT_SPEED = 10; // tiles per second
export const MOVEMENT_TICKS_PER_TILE = MOVEMENT_SPEED / TICK_RATE;
export const PROJECTILE_SPEED = 30; // tiles per second
export const PROJECTILE_TICKS_PER_TILE = PROJECTILE_SPEED / TICK_RATE;

export const DEFAULT_EFFECT_DURATION = 500;

export const MAX_ROUND_TIME_MS = 100000; // 100 seconds per round

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

export const roundValue2Decimals = (value: number): number => {
    return Math.round(value * 100) / 100;
}

export const getBuffCurseTypeName = (buffCurseType: ActorStatType) => {
    switch (buffCurseType) {
        case 'actionSpeed':
            return 'Action Speed';
        case 'allResists':
            return 'All Resists';
        case 'bluntDamage':
            return 'Blunt Damage';
        case 'bluntResist':
            return 'Blunt Resist';
        case 'critChance':
            return 'Critical Chance';
        case 'magicDamage':
            return 'Magic Damage';
        case 'magicResist':
            return 'Magic Resist';
        case 'maxHealth':
            return 'Health';
        case 'pierceDamage':
            return 'Pierce Damage';
        case 'pierceResist':
            return 'Pierce Resist';
        case 'maxReinforcements':
            return 'Reinforcements';
        default:
            return 'Level';
    }
}

export const getOtherEffectsTypeDescription = (otherActionType: ActorOtherEffectsType) => {
    switch (otherActionType) {
        case ActorOtherEffectsType.LIFESTEAL:
            return 'Lifesteal : Recover 20% of damage dealt as health.';
        case ActorOtherEffectsType.AOE:
            return 'Area of Effect : Action size hits all squares at and around target.';
        case ActorOtherEffectsType.PIERCE:
            return 'Piercing : Action size hits 2 squares behind target.';
        case ActorOtherEffectsType.DODGE:
            return 'Dodge : 30% chance to avoid damage.';
        case ActorOtherEffectsType.DEFENSIVE:
            return 'Defensive : 10% increase to all resistances.';
        case ActorOtherEffectsType.FAST:
            return 'Fast : Doubles movement speed.';
        case ActorOtherEffectsType.REACH:
            return 'Reach : +2 to Range.';
        case ActorOtherEffectsType.ACCURATE:
            return 'Accurate : +30% to Critical Chance.'
        case ActorOtherEffectsType.THORNS:
            return 'Thorns : 30% damage reflected back to attacker.'
        case ActorOtherEffectsType.INSTANT:
            return 'Instant : Damage dealt instantly instead of a projectile.'
        case ActorOtherEffectsType.UNWAIVERING:
            return 'Unwaivering : Unable to be cursed.'
        default:
            return '';
    }
}

export const getColorFromType = (colorType: ActorColorType) => {
    if (colorType == ActorColorType.GREEN) {
        return '#277f47';
    } else if (colorType == ActorColorType.PURPLE) {
        return '#6f4f96';
    } else {
        return '#27547f';
    }
}

export const getRarityNameFromType = (rarity: ActorRarityType) => {
    if (rarity == ActorRarityType.COMMON) {
        return 'Common';
    } else if (rarity == ActorRarityType.UNCOMMON) {
        return 'Uncommon';
    } else {
        return 'Rare';
    }
}

export const getRarityColorFromType = (rarity: ActorRarityType) => {
    if (rarity == ActorRarityType.COMMON) {
        return '#747474';
    } else if (rarity == ActorRarityType.UNCOMMON) {
        return '#0077db';
    } else {
        return '#dfcb00';
    }
}

export const createTestTeamData = (name: string): TeamData => {
    const actors2dArray: (ActorData | undefined)[][] = [];
    for (let x = 0; x < 4; x++) {
        actors2dArray.push([]);
        for (let y = 0; y < 5; y++) {
            if (x == 0 || x == 3 && Math.random() > 0.25) {
                actors2dArray[x].push({
                    id: `${name}-${x}-${y}`,
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
                        actionSpeed: 1500,
                        level: 1,
                        critChance: 0
                    },
                    action: {
                        type: ActorActionType.ATTACK,
                        range: 1,
                        targets: ActorActionTargetsType.SINGLE,
                        buffCurseStatType: undefined
                    },
                    rarity: ActorRarityType.COMMON
                });
            } else if (x == 2 && Math.random() > 0.25) {
                actors2dArray[x].push({
                    id: `${name}-${x}-${y}`,
                    name: `Witch`,
                    description: "",
                    color: Math.random() > 0.5 ? ActorColorType.PURPLE : ActorColorType.BLUE,
                    stats: {
                        maxHealth: 6,
                        pierceResist: 0,
                        pierceDamage: 2,
                        bluntResist: 0,
                        bluntDamage: 0,
                        magicResist: 0.6,
                        magicDamage: 3,
                        actionSpeed: 2500,
                        level: 1,
                        critChance: 0
                    },
                    action: {
                        type: ActorActionType.ATTACK,
                        range: 4,
                        targets: ActorActionTargetsType.CROSS,
                        buffCurseStatType: undefined
                    },
                    rarity: ActorRarityType.COMMON
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
            actionSpeed: 0,
            level: 0,
            critChance: 0
        }
    };
}