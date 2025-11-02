import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActorData, ActorStats, getInitialState } from "./actor-data";
import { createRandomUnit, getEnemyArmy, getEnemyStarterArmy, getStarterArmy } from '../units';

const storeSlice = createSlice({
    name: 'store',
    initialState: getInitialState(),
    reducers: {
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

                    const teamStatsKey = building.statType as keyof ActorStats;
                    if (teamStatsKey) {
                        state.playerTeam.teamStats[teamStatsKey] = building.value;
                    }                    
                }                
            }
        },
        newGame: (state, action: PayloadAction<boolean>) => {
            state.playerIsDemon = action.payload;

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
        victory: (state) => {
            state.currentRound++;

            const newInventory = [...state.inventory];
            newInventory.push(createRandomUnit(state.currentRound, state.playerIsDemon));
            newInventory.push(createRandomUnit(state.currentRound, state.playerIsDemon));
            state.inventory = newInventory;

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
            newInventory.sort(() => Math.random() - 0.5);
            if (newInventory.length > state.maxReinforcements)
            newInventory.splice(state.maxReinforcements, newInventory.length - state.maxReinforcements);

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
            } else { //move from inventory to grid
                const index = newInventory.findIndex((actor) => actor.id == action.payload.id);
                if (index > -1) {
                    const actor = newInventory[index];
                    newInventory.splice(index, 1);
                    newPlayerTeam.actors[action.payload.x][action.payload.y] = actor;

                    state.inventory = newInventory;
                    state.playerTeam = newPlayerTeam;
                }
            }
        },
    }
});

export function getBuildingCost(level: number) {
    return level * 10;
}

export const { moveActor, addActor, levelUpBuilding } = storeSlice.actions

export default storeSlice.reducer;