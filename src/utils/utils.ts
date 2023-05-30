import GoalsIcon from "../components/card/tools/tools-svg/goals-icon";
import JournalIcon from "../components/card/tools/tools-svg/journal-icon";
import NotesIcon from "../components/card/tools/tools-svg/notes-icon";
import TimerIcon from "../components/card/tools/tools-svg/timer-icon";
import TodoIcon from "../components/card/tools/tools-svg/todo-icon";

export const routineTools = [
  {
    titleKey: "tool-cards.timer",
    screenName: "Timer",
    IconComponent: TimerIcon,
  },
  {
    titleKey: "tool-cards.journal",
    screenName: "Journals",
    IconComponent: JournalIcon,
  },
  {
    titleKey: "tool-cards.todos",
    screenName: "Todos",
    IconComponent: TodoIcon,
  },
  {
    titleKey: "tool-cards.notes",
    screenName: "Notes",
    IconComponent: NotesIcon,
  },
  {
    titleKey: "tool-cards.goals",
    screenName: "Goals",
    IconComponent: GoalsIcon,
  },
];
