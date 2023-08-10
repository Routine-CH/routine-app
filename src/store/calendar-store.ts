import { create } from "zustand";
import { CalendarDataTypes } from "../utils/types/calendar/types";
import { UserTodo } from "../utils/types/types";

type CalendarStates = {
  selectedDate: Date;
  isModalVisible: boolean;
  selectedChip: CalendarDataTypes | undefined;
  selectedTodo: UserTodo | null;
  isTodoModalVisible: boolean;
  calendarDataUpdated: boolean;
};

type CalendarActions = {
  setSelectedDate: (date: Date) => void;
  toggleModalVisibility: () => void;
  setSelectedChip: (chip: CalendarDataTypes | undefined) => void;
  setSelectedTodo: (todo: UserTodo | null) => void;
  toggleTodoModalVisibility: () => void;
  setCalendarDataUpdated: (updated: boolean) => void;
};

export const useCalendarStore = create<CalendarStates & CalendarActions>(
  (set) => ({
    selectedDate: new Date(),
    isModalVisible: false,
    selectedChip: undefined,
    selectedTodo: null,
    isTodoModalVisible: false,
    calendarDataUpdated: false,

    setSelectedDate: (date) => set({ selectedDate: date }),
    toggleModalVisibility: () =>
      set((state) => ({ isModalVisible: !state.isModalVisible })),
    setSelectedChip: (chip) => set({ selectedChip: chip }),
    setSelectedTodo: (todo) => set({ selectedTodo: todo }),
    toggleTodoModalVisibility: () =>
      set((state) => ({ isTodoModalVisible: !state.isTodoModalVisible })),
    setCalendarDataUpdated: (updated) => set({ calendarDataUpdated: updated }),
  })
);
