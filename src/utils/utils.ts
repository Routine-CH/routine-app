import GoalsIcon from "../components/card/tools/tools-svg/goals-icon";
import JournalIcon from "../components/card/tools/tools-svg/journal-icon";
import NotesIcon from "../components/card/tools/tools-svg/notes-icon";
import TimerIcon from "../components/card/tools/tools-svg/timer-icon";
import TodoIcon from "../components/card/tools/tools-svg/todo-icon";

export const routineTools = [
  {
    titleKey: "tool-cards.timer",
    screenName: "DiscoverTimer",
    IconComponent: TimerIcon,
  },
  {
    titleKey: "tool-cards.journals",
    screenName: "DiscoverJournals",
    IconComponent: JournalIcon,
  },
  {
    titleKey: "tool-cards.todos",
    screenName: "DiscoverTodos",
    IconComponent: TodoIcon,
  },
  {
    titleKey: "tool-cards.notes",
    screenName: "DiscoverNotes",
    IconComponent: NotesIcon,
  },
  {
    titleKey: "tool-cards.goals",
    screenName: "DiscoverGoals",
    IconComponent: GoalsIcon,
  },
];
