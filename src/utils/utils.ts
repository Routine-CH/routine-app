import FavGoalsIcon from "../components/card/tools/tools-svg/fav/fav-goals-icon";
import FavJournalIcon from "../components/card/tools/tools-svg/fav/fav-journal-icon";
import FavNotesIcon from "../components/card/tools/tools-svg/fav/fav-notes-icon";
import FavTodoIcon from "../components/card/tools/tools-svg/fav/fav-todo-icon";
import GoalsIcon from "../components/card/tools/tools-svg/goals-icon";
import JournalIcon from "../components/card/tools/tools-svg/journal-icon";
import NotesIcon from "../components/card/tools/tools-svg/notes-icon";
import TodoIcon from "../components/card/tools/tools-svg/todo-icon";

export const routineTools = [
  // {
  //   id: "8fe84749-a5e4-4674-81ed-f255b923c386",
  //   titleKey: "tool-cards.timer",
  //   screenName: "Timer",
  //   IconComponent: TimerIcon,
  //   favIconComponent: FavTimerIcon,
  // },
  {
    id: "0a0799ce-eb61-4f0e-813b-a751da2e1940",
    titleKey: "tool-cards.journals",
    screenName: "Journals",
    IconComponent: JournalIcon,
    favIconComponent: FavJournalIcon,
  },
  {
    id: "c284d189-5763-4eb7-ac25-ddd23a8b22fa",
    titleKey: "tool-cards.todos",
    screenName: "Todos",
    IconComponent: TodoIcon,
    favIconComponent: FavTodoIcon,
  },
  {
    id: "c1fecefb-bfa2-416a-b22b-f7c1bdb43c5b",
    titleKey: "tool-cards.notes",
    screenName: "Notes",
    IconComponent: NotesIcon,
    favIconComponent: FavNotesIcon,
  },
  {
    id: "76fd447b-9220-4efe-9a31-53f4dd877c32",
    titleKey: "tool-cards.goals",
    screenName: "Goals",
    IconComponent: GoalsIcon,
    favIconComponent: FavGoalsIcon,
  },
];
