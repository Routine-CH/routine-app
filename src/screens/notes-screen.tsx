import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import NotesCard from "../components/common/notes/notes-card";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const NotesScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor={AppColors.blueMuted20}
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <Pressable style={styles.margin}>
          <AppText fontStyle="body" colorStyle="black64">
            {t("notes.date")} {t("notes.filter")}
          </AppText>
        </Pressable>
        <View>
          <NotesCard
            title="Nicht vergessen!"
            description="Tickets auf Ticketcorner verkaufen und die Tickets per Post an die Käufer schicken."
            image={require("../assets/misc/waves.jpg")}
          />
          <NotesCard
            title="Nicht vergessen!"
            description="Tickets auf Ticketcorner verkaufen und die Tickets per Post an die Käufer schicken."
          />
        </View>
      </ScrollViewScreenWrapper>

      <AddButton style={styles.buttonStyle} />
    </>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
  margin: {
    marginVertical: 30,
  },
});
