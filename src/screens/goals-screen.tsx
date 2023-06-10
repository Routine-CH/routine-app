import { useTranslation } from "react-i18next";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import GoalsContainer from "../components/common/goals/goals-container";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { StatusBarColor } from "../utils/types/enums";

const GoalsScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor="white"
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <AppText
          fontStyle="heading3"
          colorStyle="black70"
          style={{ marginVertical: 30 }}
        >
          {t("my-day.your-goals")}
        </AppText>
        <GoalsContainer />
      </ScrollViewScreenWrapper>
      <AddButton />
    </>
  );
};

export default GoalsScreen;
