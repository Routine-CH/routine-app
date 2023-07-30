import { eachDayOfInterval, format, isSameDay } from "date-fns";
import { de } from "date-fns/locale";
import { UserTodo } from "../../utils/types/types";

export function getDatesOfWeek(start: Date, end: Date) {
  return eachDayOfInterval({
    start: start,
    end: end,
  });
}

export function getFormattedWeekStart(date: Date) {
  return format(date, "dd. MMMM", { locale: de });
}

export function getFormattedWeekEnd(date: Date) {
  return format(date, "dd MMMM yyyy", { locale: de });
}

export function getTodaysTodos(userTodos: UserTodo[]) {
  return userTodos.filter((todo) => {
    const todoDate = new Date(todo.plannedDate);
    const today = new Date();
    return isSameDay(new Date(todoDate), new Date(today));
  });
}

export const filterAndFormatUpcomingTodos = (todos: { [date: string]: UserTodo[] }, dates: Date[]) => {
      const filteredTodos: { [date: string]: UserTodo[] } = {};
    
      dates.forEach((date) => {
        const dateString = format(date, "yyyy-MM-dd");
        const todosForDate = todos[dateString] || [];
        if (todosForDate.length > 0) {
          filteredTodos[dateString] = todosForDate;
        }
      });
    
      return filteredTodos;
    };
    