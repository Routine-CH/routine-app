import { create } from "zustand";
import { combine } from "zustand/middleware";

export enum TimerSlide {
  Start = "start",
  Running = "running",
  Pause = "pause",
  Break = "break",
}

type PomodoroTimerState = {
  timeRemaining: Record<TimerSlide, number>;
  spentTime: number;
};

type PomodoroTimerActions = {
  setTimeRemaining: (slide: TimerSlide, newTime: number) => void;
  adjustTime: (slide: TimerSlide, newTime: number) => void;
  setSpentTime: (newTime: number) => void;
};

export const usePomodoroTimerStore = create(
  combine(
    {
      timeRemaining: {
        [TimerSlide.Start]: 25 * 60,
        [TimerSlide.Break]: 5 * 60,
      },
      spentTime: 0,
    },
    (set) => ({
      setTimeRemaining: (slide: TimerSlide, newTime: number) =>
        set((state) => ({
          ...state,
          timeRemaining: {
            ...state.timeRemaining,
            [slide]: newTime,
          },
        })),
      adjustTime: (slide: TimerSlide, newTime: number) =>
        set((state) => ({
          ...state,
          timeRemaining: {
            ...state.timeRemaining,
            [slide]: newTime * 60,
          },
        })),
      setSpentTime: (newTime: number) =>
        set((state) => ({ ...state, spentTime: newTime })),
    })
  )
);
