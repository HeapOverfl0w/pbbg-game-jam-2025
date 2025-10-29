export type ActorData = {
    id: string;
    name: string;
    description: string;
    rarity: ActorRarityType;
    color: ActorColorType;
    stats: ActorStats;
    action: ActorActionData;
}

export type ActorStats = {
    level: number;
    maxHealth: number;
    pierceResist: number;
    pierceDamage: number;
    bluntResist: number;
    bluntDamage: number;
    magicResist: number;
    magicDamage: number;
    actionSpeed: number;
    critChance: number;
}

export enum ActorActionType {
    ATTACK,
    BUFF,
    HEAL,
    CURSE
}

export enum ActorColorType {
    GREEN,
    BLUE,
    PURPLE
}

export enum ActorRarityType {
    COMMON,
    UNCOMMON,
    RARE
}

export type ActorStatType = keyof ActorStats | 'allResists';

export enum ActorActionTargetsType {
    SINGLE, // single target
    SMALL_AOE, // 3x3 area with target in middle
    LARGE_AOE, // 5x5 area with target in middle
    CROSS, // adjacent tiles sans diagonals with target in middle
    LARGE_CROSS, // adjacent tiles + 1 sans diagonals with target in middle
    ONE_PIERCE, // target and one behind
    TWO_PIERCE, // target and two behind
    THREE_PIERCE, // target and three behind
    CLEAVE, // target and y - 1 and y + 1
    LARGE_CLEAVE, // target and y - 2 and y + 2
}

export enum ActorOtherEffectsType {
    LIFESTEAL,
    DODGE,
    AOE,
    DEFENSIVE,
    FAST
}

export type ActorActionData = {
    type: ActorActionType;
    range: number;
    targets: ActorActionTargetsType;
    buffCurseStatType?: ActorStatType;
    otherActionEffect?: ActorOtherEffectsType;
}

export type TeamData = {
    actors: (ActorData | undefined)[][];
    teamStats: ActorStats;
}

export type StoreData = {
    playerTeam: TeamData;
    npcTeam: TeamData;
    inventory: ActorData[];
    buildings: BuildingData[];
    gold: number;
}

export type BuildingData = {
    name: string;
    description: string;
    level: number;
    statType: ActorStatType;
    value: number;
    increasePerLevel: number;
    image: string;
}

export const getInitialState = (): StoreData => {
    const inventory: ActorData[] = [];
    inventory.push({
        id: "",
        name: "",
        description: "",
        color: ActorColorType.GREEN,
        rarity: ActorRarityType.COMMON,
        stats: {
            level: 1,
            maxHealth: 0,
            pierceResist: 0,
            pierceDamage: 0,
            bluntResist: 0,
            bluntDamage: 0,
            magicResist: 0,
            magicDamage: 0,
            actionSpeed: 0,
            critChance: 0,
        },
        action: {
            type: ActorActionType.ATTACK,
            range: 0,
            targets: ActorActionTargetsType.SINGLE,
            buffCurseStatType: undefined
        }
    });

    return {
        playerTeam: {
            actors: Array.from({ length: 4 }, () => Array(5).fill(undefined)),
            teamStats: {
                level: 1,
                maxHealth: 0,
                pierceResist: 0,
                pierceDamage: 0,
                bluntResist: 0,
                bluntDamage: 0,
                magicResist: 0,
                magicDamage: 0,
                actionSpeed: 0,
                critChance: 0,
            }
        },
        npcTeam: {
            actors: Array.from({ length: 4 }, () => Array(5).fill(undefined)),
            teamStats: {
                level: 1,
                maxHealth: 0,
                pierceResist: 0,
                pierceDamage: 0,
                bluntResist: 0,
                bluntDamage: 0,
                magicResist: 0,
                magicDamage: 0,
                actionSpeed: 0,
                critChance: 0,
            }
        },
        inventory: inventory,
        buildings: [],
        gold: 0
    }
}