import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActorData, ActorStats, getInitialState, StoreData } from "./actor-data";
import { createRandomUnit, getEnemyArmy, getEnemyStarterArmy, getStarterArmy } from '../units';
import { UnitSelection } from "./unit-selection";

const storeSlice = createSlice({
    name: 'store',
    initialState: getInitialState(),
    reducers: {
        loadStoreState: (state, action: PayloadAction<StoreData>) => {
            state.buildings = action.payload.buildings;
            state.currentRound = action.payload.currentRound;
            state.gold = action.payload.gold;
            state.inventory = action.payload.inventory;
            state.maxReinforcements = action.payload.maxReinforcements;
            state.npcTeam = action.payload.npcTeam;
            state.playerIsDemon = action.payload.playerIsDemon;
            state.playerTeam = action.payload.playerTeam;
        },
        addActor: (state, action: PayloadAction<ActorData>) => {
            const newInventory = [...state.inventory];
            newInventory.push(action.payload);
            state.inventory = newInventory;
        },
        levelUpBuilding: (state, action: PayloadAction<string>) => {
            const newBuildings = [...state.buildings];
            const building = newBuildings.find((building) => building.name == action.payload);
            if (building && building.level < 5) {
                const cost = getBuildingCost(building.level + 1);
                if (cost <= state.gold) {
                    building.level++;
                    building.value += building.increasePerLevel;
                    state.gold -= cost;
                    state.buildings = newBuildings;

                    if (building.statType == 'maxReinforcements') {
                        state.maxReinforcements += building.increasePerLevel;
                    } else {
                        const teamStatsKey = building.statType as keyof ActorStats;
                        if (teamStatsKey) {
                            state.playerTeam.teamStats[teamStatsKey] = building.value;
                        } 
                    }
                                       
                }                
            }
        },
        newGame: (state, action: PayloadAction<boolean>) => {
            state.playerIsDemon = action.payload;
            state.maxReinforcements = 2;
            state.currentRound = 1;
            state.gold = 0;
            state.buildings = [
                {
                    name: "Swordsmith",
                    description: "Increases pierce damage of all units.",
                    level: 0,
                    statType: "pierceDamage",
                    value: 0,
                    increasePerLevel: 0.05,
                    image: "./img/icons/swordsmith.png"
                },
                {
                    name: "Mallet Maker",
                    description: "Increases blunt damage of all units.",
                    level: 0,
                    statType: "bluntDamage",
                    value: 0,
                    increasePerLevel: 0.05,
                    image: "./img/icons/malletmaker.png"
                },
                {
                    name: "Mystic Hut",
                    description: "Increases magic damage of all units.",
                    level: 0,
                    statType: "magicDamage",
                    value: 0,
                    increasePerLevel: 0.05,
                    image: "./img/icons/mystichut.png"
                },
                {
                    name: "Armorsmith",
                    description: "Increases pierce resist of all units.",
                    level: 0,
                    statType: "pierceResist",
                    value: 0,
                    increasePerLevel: 0.05,
                    image: "./img/icons/armorsmith.png"
                },
                {
                    name: "Shieldsmith",
                    description: "Increases blunt resist of all units.",
                    level: 0,
                    statType: "bluntResist",
                    value: 0,
                    increasePerLevel: 0.05,
                    image: "./img/icons/malletmaker.png"
                },
                {
                    name: "Cathedral",
                    description: "Increases magic resist of all units.",
                    level: 0,
                    statType: "magicResist",
                    value: 0,
                    increasePerLevel: 0.05,
                    image: "./img/icons/mystichut.png"
                },
                {
                    name: "Barracks",
                    description: "Increases maximum reinforcements on loss.",
                    level: 0,
                    statType: "maxReinforcements",
                    value: 2,
                    increasePerLevel: 3,
                    image: "./img/icons/barracks.png"
                },
                {
                    name: "Training Ground",
                    description: "Increases critical chance of all units.",
                    level: 0,
                    statType: "critChance",
                    value: 0,
                    increasePerLevel: 0.03,
                    image: "./img/icons/trainingground.png"
                },
            ];

            state.playerTeam = {
                actors: getStarterArmy(state.playerIsDemon),
                teamStats: {
                    level: 0,
                    maxHealth: 0,
                    pierceResist: 0,
                    pierceDamage: 0,
                    bluntResist: 0,
                    bluntDamage: 0,
                    magicResist: 0,
                    magicDamage: 0,
                    actionSpeed: 0,
                    critChance: 0
                }
            };

            state.npcTeam = {
                actors: getEnemyStarterArmy(!state.playerIsDemon),
                teamStats: {
                    level: 0,
                    maxHealth: 0,
                    pierceResist: 0,
                    pierceDamage: 0,
                    bluntResist: 0,
                    bluntDamage: 0,
                    magicResist: 0,
                    magicDamage: 0,
                    actionSpeed: 0,
                    critChance: 0
                }
            };
            
        },
        victory: (state, action: PayloadAction<UnitSelection>) => {
            const newInventory = [...state.inventory];
            action.payload.units.forEach((_, i) => {
                if (action.payload.selections.includes(i)) {
                    newInventory.push(_);
                } else {
                    // Add to enemy force
                }
            });

            state.inventory = newInventory;
            state.gold += state.currentRound * 5;

            state.currentRound++;

            state.npcTeam = {
                actors: getEnemyArmy(state.currentRound, !state.playerIsDemon),
                teamStats: {
                    level: 0,
                    maxHealth: 0,
                    pierceResist: 0,
                    pierceDamage: 0,
                    bluntResist: 0,
                    bluntDamage: 0,
                    magicResist: 0,
                    magicDamage: 0,
                    actionSpeed: 0,
                    critChance: 0
                }
            };
        },
        lose: (state) => {
            state.currentRound = 1;

            state.playerTeam = {
                actors: getStarterArmy(state.playerIsDemon),
                teamStats: {
                    level: 0,
                    maxHealth: 0,
                    pierceResist: 0,
                    pierceDamage: 0,
                    bluntResist: 0,
                    bluntDamage: 0,
                    magicResist: 0,
                    magicDamage: 0,
                    actionSpeed: 0,
                    critChance: 0
                }
            };

            state.npcTeam = {
                actors: getEnemyStarterArmy(!state.playerIsDemon),
                teamStats: {
                    level: 0,
                    maxHealth: 0,
                    pierceResist: 0,
                    pierceDamage: 0,
                    bluntResist: 0,
                    bluntDamage: 0,
                    magicResist: 0,
                    magicDamage: 0,
                    actionSpeed: 0,
                    critChance: 0
                }
            };

            const newInventory = [...state.inventory];
            newInventory.sort((item1, item2) => (item2.stats.level + (item2.action.otherActionEffect ? 1 : 0)) - (item1.stats.level + (item1.action.otherActionEffect ? 1 : 0)));
            newInventory.sort((item1, item2) => item2.rarity - item1.rarity);
            if (newInventory.length > state.maxReinforcements) {
                newInventory.splice(state.maxReinforcements, newInventory.length - state.maxReinforcements);
            } 

            state.inventory = newInventory;
        },
        moveActor: (state, action: any) => {
            const newPlayerTeam = Object.assign({}, state.playerTeam);
            const newInventory = [...state.inventory];

            //move from grid to inventory
            if (action.payload.x == -1 || action.payload.y == -1) {
                let itemInGrid = undefined;

                for(let x = 0; x < newPlayerTeam.actors.length; x++){
                    for (let y = 0; y < newPlayerTeam.actors[x].length; y++) {
                        const actor = newPlayerTeam.actors[x][y];
                        if (actor && actor.id == action.payload.id) {
                            itemInGrid = actor;
                            newPlayerTeam.actors[x][y] = undefined;
                            break;
                        }
                    }
                }

                if (itemInGrid) {
                    newInventory.push(itemInGrid);
                    state.inventory = newInventory;
                    state.playerTeam = newPlayerTeam;
                }                
            } else { 
                //move from inventory to grid
                const index = newInventory.findIndex((actor) => actor.id == action.payload.id);
                if (index > -1) {
                    const actor = newInventory[index];
                    newInventory.splice(index, 1);
                    const actorCurrentlyAtLocation = newPlayerTeam.actors[action.payload.x][action.payload.y];
                    newPlayerTeam.actors[action.payload.x][action.payload.y] = actor;

                    if (actorCurrentlyAtLocation) {
                        newInventory.push(actorCurrentlyAtLocation);
                    }

                    state.inventory = newInventory;
                    state.playerTeam = newPlayerTeam;
                } else {
                    //if it's not in inventory then it's in the grid moving from one location to another
                    let itemInGrid = undefined;
                    let locationX = 0;
                    let locationY = 0;

                    for(let x = 0; x < newPlayerTeam.actors.length; x++){
                        for (let y = 0; y < newPlayerTeam.actors[x].length; y++) {
                            const actor = newPlayerTeam.actors[x][y];
                            if (actor && actor.id == action.payload.id) {
                                itemInGrid = actor;
                                newPlayerTeam.actors[x][y] = undefined;
                                locationX = x;
                                locationY = y;
                                break;
                            }
                        }
                    }

                    if (itemInGrid) {
                        newPlayerTeam.actors[locationX][locationY] = newPlayerTeam.actors[action.payload.x][action.payload.y];
                        newPlayerTeam.actors[action.payload.x][action.payload.y] = itemInGrid;
                        state.playerTeam = newPlayerTeam;
                    } 
                }
            }
        },
    }
});

export function getBuildingCost(level: number) {
    return level * level * 10;
}

export const { loadStoreState, moveActor, addActor, levelUpBuilding, newGame, victory, lose } = storeSlice.actions

export default storeSlice.reducer;