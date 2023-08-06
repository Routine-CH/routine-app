import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const GoalViewScreen: React.FC = () => {
  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <AppText>GoalsViewSCreen</AppText>
    </ScrollViewScreenWrapper>
  );
};

export default GoalViewScreen;
