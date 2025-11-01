//this file will have all base unit data and functions to create random units

import { roundValue2Decimals } from "./canvas/constants";
import { ActorActionTargetsType, ActorActionType, ActorColorType, ActorData, ActorOtherEffectsType, ActorRarityType } from "./redux/actor-data";
import { v4 as uuidv4 } from "uuid";


export function createRandomUnit(currentLevel: number, isDemon: boolean) {
    const randomRarity = Math.random();
    const randomType = Math.random();
    let rarity = ActorRarityType.COMMON;
    let type = ActorActionType.ATTACK;

    const currentLevelRandomModifier = (currentLevel - 1) * 0.01;
    if (randomRarity > 0.9 - currentLevelRandomModifier) {
        rarity = ActorRarityType.RARE;
    } else if (randomRarity > 0.7 - currentLevelRandomModifier) {
        rarity = ActorRarityType.UNCOMMON;
    }

    if (randomType > 0.9) {
        if (Math.random() < 0.5) {
            type = ActorActionType.BUFF;
        } else {
            type = ActorActionType.CURSE;
        }        
    } else if (randomType > 0.8) {
        type = ActorActionType.HEAL;
    }

    return createUnit(currentLevel, isDemon, rarity, type);
}

export function createUnit(currentLevel: number, isDemon: boolean, rarity: ActorRarityType, type: ActorActionType) {
    const unitLevel = 1 + Math.round(Math.random() * (currentLevel / 5));
    const units = isDemon ? ALL_DEMONS : ALL_ANGELS;
    let unitOptions = [];

    if (type == ActorActionType.ATTACK) {
        unitOptions = units.filter((unit) => unit.rarity == rarity && unit.action.type == ActorActionType.ATTACK);
    } else if (type == ActorActionType.BUFF || type == ActorActionType.CURSE) {
        unitOptions = units.filter((unit) => unit.action.type == ActorActionType.BUFF || unit.action.type == ActorActionType.CURSE);
    } else {
        unitOptions = units.filter((unit) => unit.action.type == ActorActionType.HEAL);
    }

    let returnValue = structuredClone(unitOptions[Math.round(Math.random() * (unitOptions.length - 1))]);

    if (!returnValue) {
        console.log('here');
    }

    if (type == ActorActionType.BUFF || type == ActorActionType.CURSE) {
        randomizeBuffCurseUnit(returnValue, type);
    }

    modifyStatsForLevel(returnValue, unitLevel);
    addInRandomUnitEffect(returnValue);
    randomizeColor(returnValue);

    returnValue.id = uuidv4();

    return returnValue;
}

function randomizeBuffCurseUnit(unit: ActorData, type: ActorActionType) {
    unit.action.type = type;
    const randomStatType = Math.random();

    if (randomStatType > 0.95) {
        unit.action.buffCurseStatType = 'actionSpeed';
        unit.stats.magicDamage = roundValue2Decimals(100 + Math.round(Math.random() * 200));
    } else if (randomStatType > 0.85) {
        unit.action.buffCurseStatType = 'pierceResist';
        unit.stats.magicDamage = roundValue2Decimals(0.05 + Math.random() * 0.1);
    } else if (randomStatType > 0.75) {
        unit.action.buffCurseStatType = 'bluntResist';
        unit.stats.magicDamage = roundValue2Decimals(0.05 + Math.random() * 0.1);
    } else if (randomStatType > 0.65) {
        unit.action.buffCurseStatType = 'magicResist';
        unit.stats.magicDamage = roundValue2Decimals(0.05 + Math.random() * 0.1);
    } else if (randomStatType > 0.55) {
        unit.action.buffCurseStatType = 'pierceDamage';
        unit.stats.magicDamage = roundValue2Decimals(1 + Math.round(Math.random() * 2));
    } else if (randomStatType > 0.45) {
        unit.action.buffCurseStatType = 'bluntDamage';
        unit.stats.magicDamage = roundValue2Decimals(1 + Math.round(Math.random() * 2));
    } else if (randomStatType > 0.35) {
        unit.action.buffCurseStatType = 'magicDamage';
        unit.stats.magicDamage = roundValue2Decimals(1 + Math.round(Math.random() * 2));
    } else if (randomStatType > 0.25) {
        unit.action.buffCurseStatType = 'critChance';
        unit.stats.magicDamage = roundValue2Decimals(0.05 + Math.random() * 0.1);
    } else {
        unit.action.buffCurseStatType = 'allResists';
        unit.stats.magicDamage = roundValue2Decimals(0.05 + Math.random() * 0.1);
    }
}

function randomizeColor(unit: ActorData) {
    const enumValues = Object.values(ActorColorType).filter(e => typeof e === "number");
    unit.color = enumValues[Math.floor(Math.random() * enumValues.length)];
}

function modifyStatsForLevel(unit: ActorData, level: number) {
    if (level > 1) {
        const levelModifier = Math.pow(0.2 * (level - 1), 1.2);
        unit.stats.level = level;
        unit.stats.maxHealth = Math.round(unit.stats.maxHealth * (1 + levelModifier - (Math.random() * 0.1)));
        unit.stats.pierceDamage = Math.round(unit.stats.pierceDamage * (1 + levelModifier - (Math.random() * 0.1)));
        unit.stats.bluntDamage = Math.round(unit.stats.bluntDamage * (1 + levelModifier - (Math.random() * 0.1)));
        unit.stats.magicDamage = unit.action.type == ActorActionType.BUFF || unit.action.type == ActorActionType.CURSE ? roundValue2Decimals(unit.stats.magicDamage * (1 + levelModifier - (Math.random() * 0.1))) : Math.round(unit.stats.magicDamage * (1 + levelModifier - (Math.random() * 0.1)));
        unit.stats.pierceResist = roundValue2Decimals(unit.stats.pierceResist * (1 + levelModifier - (Math.random() * 0.1)));
        unit.stats.bluntResist = roundValue2Decimals(unit.stats.bluntResist * (1 + levelModifier - (Math.random() * 0.1)));
        unit.stats.magicResist = roundValue2Decimals(unit.stats.magicResist * (1 + levelModifier - (Math.random() * 0.1)));
        unit.stats.critChance = roundValue2Decimals(unit.stats.critChance * (1 + levelModifier - (Math.random() * 0.1)));
    }  
}

function addInRandomUnitEffect(unit: ActorData) {
    if (Math.random() > 0.90) {
        const enumValues = Object.values(ActorOtherEffectsType).filter(e => typeof e === "number");
        unit.action.otherActionEffect = enumValues[Math.floor(Math.random() * enumValues.length)];

        if (unit.action.otherActionEffect == ActorOtherEffectsType.AOE) {
            unit.action.targets = ActorActionTargetsType.SMALL_AOE;
        } else if (unit.action.otherActionEffect == ActorOtherEffectsType.DEFENSIVE) {
            unit.stats.bluntResist += 0.1;
            unit.stats.pierceResist += 0.1;
            unit.stats.magicResist += 0.1;
        }
    }
}

// #region ANGELS
const Knight: ActorData = {
    id: "knight-data",
    name: "Knight",
    description: "Devout melee combatant whose oath to righteousness is unwaivering.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 10,
        pierceResist: 0.3,
        pierceDamage: 2,
        bluntResist: 0.3,
        bluntDamage: 0,
        magicResist: 0,
        magicDamage: 0,
        actionSpeed: 1500,
        critChance: 0.1
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 1,
        targets: ActorActionTargetsType.SINGLE,
        buffCurseStatType: undefined
    }
}

const Ranger: ActorData = {
    id: "ranger-data",
    name: "Ranger",
    description: "A reclusive ranged combatant always prepared to strike unsuspecting demons.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 6,
        pierceResist: 0.2,
        pierceDamage: 2,
        bluntResist: 0.2,
        bluntDamage: 0,
        magicResist: 0.2,
        magicDamage: 0,
        actionSpeed: 2000,
        critChance: 0.3
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 4,
        targets: ActorActionTargetsType.SINGLE,
        buffCurseStatType: undefined
    }
}

const SinSlayer: ActorData = {
    id: "sinslayer-data",
    name: "Sin Slayer",
    description: "Piercing sword attacks wielded by one with unwaivering devotion.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 13,
        pierceResist: 0.2,
        pierceDamage: 4,
        bluntResist: 0.2,
        bluntDamage: 0,
        magicResist: 0.5,
        magicDamage: 0,
        actionSpeed: 1000,
        critChance: 0.3
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 1,
        targets: ActorActionTargetsType.ONE_PIERCE,
        buffCurseStatType: undefined
    }
}

const Monk: ActorData = {
    id: "monk-data",
    name: "Monk",
    description: "The monks of the realm have dedicated their life to the study of arcane arts.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 8,
        pierceResist: 0,
        pierceDamage: 0,
        bluntResist: 0,
        bluntDamage: 0,
        magicResist: 0.3,
        magicDamage: 3,
        actionSpeed: 1500,
        critChance: 0.2
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 3,
        targets: ActorActionTargetsType.SINGLE,
        buffCurseStatType: undefined
    }
}

const HealMonk: ActorData = {
    id: "healmonk-data",
    name: "Monk",
    description: "The monks of the realm have dedicated their life to the study of arcane arts.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 8,
        pierceResist: 0,
        pierceDamage: 0,
        bluntResist: 0,
        bluntDamage: 0,
        magicResist: 0.3,
        magicDamage: 3,
        actionSpeed: 3000,
        critChance: 0.2
    },
    action: {
        type: ActorActionType.HEAL,
        range: 3,
        targets: ActorActionTargetsType.CLEAVE,
        buffCurseStatType: undefined
    }
}

const Valkyrie: ActorData = {
    id: "valkyrie-data",
    name: "Valkyrie",
    description: "Hammer throwing angelic maiden - smiting all who defy good.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 12,
        pierceResist: 0.4,
        pierceDamage: 0,
        bluntResist: 0.4,
        bluntDamage: 4,
        magicResist: 0.3,
        magicDamage: 0,
        actionSpeed: 1000,
        critChance: 0.2
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 2,
        targets: ActorActionTargetsType.ONE_PIERCE,
        buffCurseStatType: undefined
    }
}

const Penitent: ActorData = {
    id: "penitent-data",
    name: "Penitent",
    description: "A sorrowful soul for previous transgresions that curses the damned.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 6,
        pierceResist: 0.2,
        pierceDamage: 0,
        bluntResist: 0.2,
        bluntDamage: 0,
        magicResist: 0.3,
        magicDamage: 0.1,
        actionSpeed: 10000,
        critChance: 0
    },
    action: {
        type: ActorActionType.CURSE,
        range: 4,
        targets: ActorActionTargetsType.SMALL_AOE,
        buffCurseStatType: 'allResists'
    }
}

const Bugler: ActorData = {
    id: "bugler-data",
    name: "Bugler",
    description: "The buglers of the realm blow their trumpets to rouse the enemies of darkness to battle.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 6,
        pierceResist: 0.2,
        pierceDamage: 0,
        bluntResist: 0.2,
        bluntDamage: 0,
        magicResist: 0.3,
        magicDamage: 0.1,
        actionSpeed: 10000,
        critChance: 0
    },
    action: {
        type: ActorActionType.BUFF,
        range: 4,
        targets: ActorActionTargetsType.SMALL_AOE,
        buffCurseStatType: 'allResists'
    }
}

const Eagle: ActorData = {
    id: "bugler-data",
    name: "Eagle",
    description: "The soaring eyes of the righteous - the eagle is the standard companion of the angels.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 6,
        pierceResist: 0,
        pierceDamage: 3,
        bluntResist: 0,
        bluntDamage: 0,
        magicResist: 0,
        magicDamage: 0,
        actionSpeed: 1000,
        critChance: 0.4
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 1,
        targets: ActorActionTargetsType.SINGLE,
    }
}

const Seraphim: ActorData = {
    id: "seraphim-data",
    name: "Seraphim",
    description: "With its unwaivering glare, the Seraphim makes the strongest evil fall to its knees.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.RARE,
    stats: {
        level: 1,
        maxHealth: 15,
        pierceResist: 0.3,
        pierceDamage: 0,
        bluntResist: 0.3,
        bluntDamage: 0,
        magicResist: 0.6,
        magicDamage: 5,
        actionSpeed: 1500,
        critChance: 0.2
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 3,
        targets: ActorActionTargetsType.CLEAVE,
    }
}

const ALL_ANGELS = [Knight, Ranger, SinSlayer, Monk, HealMonk, Valkyrie, Penitent, Bugler, Eagle, Seraphim];
// #endregion

// #region DEMONS
const Dominator: ActorData = {
    id: "dominator-data",
    name: "Dominator",
    description: "Behold! The axe wielding executioner of the damned.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 13,
        pierceResist: 0.3,
        pierceDamage: 4,
        bluntResist: 0.3,
        bluntDamage: 0,
        magicResist: 0.1,
        magicDamage: 0,
        actionSpeed: 1500,
        critChance: 0
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 1,
        targets: ActorActionTargetsType.CLEAVE,
    }
}

const Hellhound: ActorData = {
    id: "hellhound-data",
    name: "Hellhound",
    description: "With a broken chained leash, the hunger of hell's beasts is never satiated.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 7,
        pierceResist: 0,
        pierceDamage: 1,
        bluntResist: 0.2,
        bluntDamage: 0,
        magicResist: 0.2,
        magicDamage: 0,
        actionSpeed: 800,
        critChance: 0.2
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 1,
        targets: ActorActionTargetsType.SINGLE,
    }
}

const Hellraiser: ActorData = {
    id: "hellraiser-data",
    name: "Hellraiser",
    description: "Cobbled together of bone and a scant amount of flesh, these spell casters conjure the hottest flames.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 5,
        pierceResist: 0,
        pierceDamage: 0,
        bluntResist: 0,
        bluntDamage: 0,
        magicResist: 0.3,
        magicDamage: 3,
        actionSpeed: 1000,
        critChance: 0.2
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 4,
        targets: ActorActionTargetsType.ONE_PIERCE,
        buffCurseStatType: undefined
    }
}

const Balrog: ActorData = {
    id: "balrog-data",
    name: "Balrog",
    description: "Towering demi-god of evil that smashes the strongest steal with ease.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.RARE,
    stats: {
        level: 1,
        maxHealth: 18,
        pierceResist: 0.2,
        pierceDamage: 0,
        bluntResist: 0.2,
        bluntDamage: 6,
        magicResist: 0.2,
        magicDamage: 0,
        actionSpeed: 2000,
        critChance: 0.2
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 1,
        targets: ActorActionTargetsType.SINGLE,
        buffCurseStatType: undefined
    }
}

const Witch: ActorData = {
    id: "witch-data",
    name: "Witch",
    description: "The brews and concoctions of a vile witch can cause many a disease... or cures.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 8,
        pierceResist: 0.1,
        pierceDamage: 0,
        bluntResist: 0.1,
        bluntDamage: 4,
        magicResist: 0.3,
        magicDamage: 0.1,
        actionSpeed: 10000,
        critChance: 0
    },
    action: {
        type: ActorActionType.BUFF,
        range: 3,
        targets: ActorActionTargetsType.SMALL_AOE,
        buffCurseStatType: undefined
    }
}

const HealWitch: ActorData = {
    id: "healwitch-data",
    name: "Witch",
    description: "The brews and concoctions of a vile witch can cause many a disease... or cures.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 8,
        pierceResist: 0.1,
        pierceDamage: 0,
        bluntResist: 0.1,
        bluntDamage: 4,
        magicResist: 0.3,
        magicDamage: 4,
        actionSpeed: 4000,
        critChance: 0
    },
    action: {
        type: ActorActionType.HEAL,
        range: 3,
        targets: ActorActionTargetsType.CLEAVE,
        buffCurseStatType: undefined
    }
}

const ImpSoldier: ActorData = {
    id: "impsoldier-data",
    name: "Imp Soldier",
    description: "Spear wielding lesser demons of the realm who frequently torment villagers in the dead of night.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 6,
        pierceResist: 0.2,
        pierceDamage: 2,
        bluntResist: 0.2,
        bluntDamage: 0,
        magicResist: 0,
        magicDamage: 0,
        actionSpeed: 1500,
        critChance: 0.1
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 1,
        targets: ActorActionTargetsType.ONE_PIERCE,
        buffCurseStatType: 'allResists'
    }
}

const ImpArcher: ActorData = {
    id: "imparcher-data",
    name: "Imp Archer",
    description: "Bow wielding lesser demon of the realm who cowards behind larger demons.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 6,
        pierceResist: 0,
        pierceDamage: 2,
        bluntResist: 0,
        bluntDamage: 0,
        magicResist: 0,
        magicDamage: 0,
        actionSpeed: 1500,
        critChance: 0.1
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 4,
        targets: ActorActionTargetsType.SINGLE,
    }
}

const Skeleton: ActorData = {
    id: "skeleton-data",
    name: "Skeleton",
    description: "Some rattling bones still animate to the will of evil.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.COMMON,
    stats: {
        level: 1,
        maxHealth: 6,
        pierceResist: 0.3,
        pierceDamage: 1,
        bluntResist: 0,
        bluntDamage: 0,
        magicResist: 0.6,
        magicDamage: 0,
        actionSpeed: 1000,
        critChance: 0
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 2,
        targets: ActorActionTargetsType.SINGLE,
    }
}

const SkeletonKing: ActorData = {
    id: "skeletonking-data",
    name: "Skeleton King",
    description: "In a former life, this armor clad skeletal figure was once a lord of a great castle.",
    color: ActorColorType.GREEN,
    rarity: ActorRarityType.UNCOMMON,
    stats: {
        level: 1,
        maxHealth: 12,
        pierceResist: 0.4,
        pierceDamage: 2,
        bluntResist: 0.4,
        bluntDamage: 0,
        magicResist: 0.3,
        magicDamage: 1,
        actionSpeed: 1500,
        critChance: 0.3
    },
    action: {
        type: ActorActionType.ATTACK,
        range: 2,
        targets: ActorActionTargetsType.ONE_PIERCE,
    }
}

const ALL_DEMONS = [Dominator, Hellhound, Hellraiser, Balrog, Witch, HealWitch, ImpSoldier, ImpArcher, Skeleton, SkeletonKing];
// #endregion