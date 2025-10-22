import { createSlice } from "@reduxjs/toolkit";
import { ActorData, getInitialState } from "./actor-data";

const storeSlice = createSlice({
    name: 'store',
    initialState: getInitialState(),
    reducers: {
        moveActor: (state, action: any) => {
            let ii = -1;
            let jj = -1;

            ii = state.inventory.findIndex(_ => _?.id === action.payload.id);
            if (ii === -1) {
                state.actors.forEach((_, i) => {
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
                temp = state.actors[ii][jj];
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
            state.actors = state.actors.map((_, i) => {
                return _.map((__, j) => {
                    if (i === action.payload.x && j === action.payload.y) {
                        return temp;
                    } else if (i === ii && j === jj) {
                        return undefined;
                    } else {
                        return __;
                    }
                });
            });
        },
    }
});

export const { moveActor } = storeSlice.actions

export default storeSlice.reducer;