import { create } from "zustand";
import { getUserGoals } from "../data/goal/fetch-request";
import { AllUserGoals, UserGoals } from "../utils/types/types";

export type GoalsState = {
  userGoals: AllUserGoals;
  isLoading: boolean;
  dataUpdated: boolean;
};

type GoalsAction = {
  setUserGoals: (goals: AllUserGoals) => void;
  loadUserGoals: () => Promise<void>;
  setDataUpdated: (updated: boolean) => void;
  getGoalById: (id: string) => UserGoals | undefined;
};

export const useGoalStore = create<GoalsState & GoalsAction>((set, get) => ({
  userGoals: [],
  isLoading: false,
  dataUpdated: false,
  setUserGoals: (goals) => set({ userGoals: goals }),
  setDataUpdated: (updated) => set({ dataUpdated: updated }),
  loadUserGoals: async () => {
    set({ isLoading: true });
    try {
      const goals = await getUserGoals();
      set({ userGoals: goals, dataUpdated: false });
    } catch (error) {
      console.error("Failed to get user goals", error);
    } finally {
      set({ isLoading: false });
    }
  },
  getGoalById: (id: string) => {
    const goals = get().userGoals;
    return goals.find((goal) => goal.id === id);
  },
}));
