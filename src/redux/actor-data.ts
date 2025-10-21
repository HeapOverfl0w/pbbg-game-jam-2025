export type ActorData = {
    id: string;
    name: string;
    description: string;
    stats: ActorStats;
    actionType: ActorActionData;
}

export type ActorStats = {
    maxHealth: number;
    pierceResist: number;
    slashDamage: number;
    bluntResist: number;
    bluntDamage: number;
    magicResist: number;
    magicDamage: number;
    actionSpeed: number;
}

export enum ActorActionType {
    ATTACK,
    BUFF,
    HEAL,
    CURSE
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

export type ActorActionData = {
    type: ActorActionType;
    range: number;
    targets: ActorActionTargetsType;
    buffCurseStatType?: ActorStatType;
}

export type TeamData = {
    actors: (ActorData | undefined)[][];
    teamStats: ActorStats;
}