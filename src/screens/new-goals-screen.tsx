import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import SaveButton from "../components/common/buttons/save-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import GoalAddTodoView from "../components/goals/goal-add-todo-view";
import GoalDetailView from "../components/goals/goal-detail-view";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";

const { width: screenWidth } = Dimensions.get("window");
const windowWidth = Dimensions.get("window").width;
const MAX_TRANSLATION_PERCENT = -50; // Adjust this value as needed
const MIN_TRANSLATION_PERCENT = 0; // Adjust this value as needed

enum ViewType {
  DETAILS = "Details",
  ADDTODO = "Todo hinzufügen",
}

const NewGoalsScreen: React.FC = () => {
  const [selectedView, setSelectedView] = useState<ViewType>(ViewType.DETAILS);
  const [slideAnimation] = useState(new Animated.Value(0));
  const [isEditable, setIsEditable] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { control, handleSubmit } = useForm();

  const { t } = useTranslation();

  const handleNewGoal = async () => {};

  const handleViewChange = (view: ViewType) => {
    if (view === ViewType.ADDTODO) {
      Animated.timing(slideAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setSelectedView(view);
  };

  const onErrors = (errors: any) => {
    if (errors.title) {
      setErrorMessage(errors.title.message);
    } else if (errors.description) {
      setErrorMessage(errors.description.message);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const detailViewStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            (screenWidth * MIN_TRANSLATION_PERCENT) / 100,
            (screenWidth * MAX_TRANSLATION_PERCENT) / 50,
          ],
        }),
      },
    ],
  };

  const addTodoViewStyle = {
    transform: [
      {
        translateX: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [
            screenWidth,
            (screenWidth * -MIN_TRANSLATION_PERCENT) / 100,
          ],
        }),
      },
    ],
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={handleSubmit(handleNewGoal, onErrors)}
        isEditable={!isEditable}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleViewChange(ViewType.DETAILS)}
        >
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.titleButton}
          >
            {t("goals.details")}
          </AppText>
          <View
            style={[
              styles.horizontalLine,
              selectedView === ViewType.DETAILS &&
                styles.selectedHorizontalLine,
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleViewChange(ViewType.ADDTODO)}
        >
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.titleButton}
          >
            {t("goals.add-todo")}
          </AppText>
          <View
            style={[
              styles.horizontalLine,
              selectedView === ViewType.ADDTODO &&
                styles.selectedHorizontalLine,
            ]}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: "relative",
          height: 1,
          width: windowWidth * 1.5,
          marginLeft: -20,
          backgroundColor: "rgba(0, 0, 0, 0.20)",
        }}
      />
      <View style={styles.animatedContainer}>
        <Animated.View style={[styles.viewContainer, detailViewStyle]}>
          <GoalDetailView control={control} isEditable={isEditable} />
        </Animated.View>
        <Animated.View style={[styles.viewContainer, addTodoViewStyle]}>
          <GoalAddTodoView control={control} isEditable={isEditable} />
        </Animated.View>
      </View>
    </ScrollViewScreenWrapper>
  );
};

export default NewGoalsScreen;

const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: AppColors.blue100,
    color: AppColors.white,
  },
  buttonContainer: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
  },
  titleButton: {
    marginBottom: 10,
  },
  horizontalLine: {
    borderBottomWidth: 4,
    borderRadius: 50,
    borderBottomColor: AppColors.blue300,
    width: windowWidth * 0.41,
  },
  selectedHorizontalLine: {
    borderBottomColor: AppColors.blue100,
  },
  animatedContainer: {
    flex: 1,
    position: "relative",
  },
  viewContainer: {
    width: "100%",
    position: "absolute",
  },
});
