import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import Todo from "../components/todos/todo";
import { StatusBarColor } from "../utils/types/enums";

const TodosScreen: React.FC = () => {
  const { t } = useTranslation();

  const now = DateTime.local();
  const next7Days = [];

  for (let i = 0; i < 7; i++) {
    const day = now.plus({ days: i });
    next7Days.push(day);
  }

  const formattedStartDate = next7Days[0].toLocaleString({
    day: "numeric",
    month: "long",
  });
  const formattedEndDate = next7Days[next7Days.length - 1].toLocaleString({
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View>
        <AppText
          fontStyle="heading3"
          colorStyle="black64"
          style={{ marginVertical: 30 }}
        >
          {t("todos.today")} {t("profile.gamification.todos")}
        </AppText>
        <Todo
          icon="stop-outline"
          title="Joggen"
          description="Heute möchte ich mindestens 15 Minuten joggen gehen"
        />
        <Todo
          icon="checkbox"
          title="Dokument einreichen und in Todo-Liste nachtragen"
          description="Ich möchte rechtzeitig meine Abgabe abgeben"
        />
      </View>
      <AppText
        fontStyle="heading3"
        colorStyle="black64"
        style={{ marginVertical: 30 }}
      >
        {t("todos.future")} {t("profile.gamification.todos")}
      </AppText>
      {/* IMPLEMENT CALENDAR!! */}
      <Pressable>
        <AppText fontStyle={"body"} colorStyle="black64">
          {formattedDateRange}
        </AppText>
      </Pressable>
    </ScrollViewScreenWrapper>
  );
};

export default TodosScreen;
