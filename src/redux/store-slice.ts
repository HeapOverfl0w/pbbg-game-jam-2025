import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActorData, ActorStats, getInitialState } from "./actor-data";

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
                    building.value = building.level * building.increasePerLevel;
                    state.gold -= cost;
                    state.buildings = newBuildings;

                    const teamStatsKey = building.statType as keyof ActorStats;
                    if (teamStatsKey) {
                        state.playerTeam.teamStats[teamStatsKey] = building.value;
                    }                    
                }                
            }
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

            
            /* let ii = -1;
            let jj = -1;

            ii = state.inventory.findIndex(_ => _?.id === action.payload.id);
            if (ii === -1) {
                state.playerTeam.actors.forEach((_, i) => {
                    let j = _.findIndex(__ => __?.id === action.payload.id)
                    if (j !== -1) {
                        jj = j;
                        ii = i;
                    }
                });
            }

            let temp: ActorData | undefined = undefined
            // Get ActorData for moved Actor
            if (ii === -1) {
                return;
            }
            else if (jj === -1) {
                temp = state.inventory[ii];
            } else {
                temp = state.playerTeam.actors[ii][jj];
            }

            // Update Inventory
            state.inventory = state.inventory.map((_, i) => {
                if (i === action.payload.x && action.payload.y === -1) {
                    return temp;
                } else if (i === ii && jj === -1) {
                    return undefined;
                } else {
                    return _;
                }
            });

            // Update Actor Grid
            state.playerTeam.actors = state.playerTeam.actors.map((_, i) => {
                return _.map((__, j) => {
                    if (i === action.payload.x && j === action.payload.y) {
                        return temp;
                    } else if (i === ii && j === jj) {
                        return undefined;
                    } else {
                        return __;
                    }
                });
            }); */
        },
    }
});

export function getBuildingCost(level: number) {
    return level * 10;
}

export const { moveActor, addActor, levelUpBuilding } = storeSlice.actions

export default storeSlice.reducer;