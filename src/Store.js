import { create } from "zustand";

export const useCheckerStore = create((set) => ({
    selectedChecker: { 
        row: 5,
        col: 3,
        type: 'white' 
    },
    selectChecker: (checker) => set((state) => ({
        selectedChecker: { ...state.selectedChecker, ...checker }
    }))
}))