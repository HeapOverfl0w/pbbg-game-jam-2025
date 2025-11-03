import { configureStore } from '@reduxjs/toolkit';
import StoreReducer from './store-slice';

export const store = configureStore({
    reducer: StoreReducer,
});

//save and load state from local storage
const KEY = "bloodmoonstore";
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export async function saveState(state: any) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

export function clearState() {
    try {
        localStorage.removeItem(KEY);
    } catch (e) {
        console.log('Cannot clear state, no state exists.');
    }
}

export function doesStateExist() {
    try {
        const serializedState = localStorage.getItem(KEY);
        return serializedState != undefined && serializedState != null;
    } catch (e) {
        return false;
    }
}