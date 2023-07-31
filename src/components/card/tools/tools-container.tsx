import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../../utils/constants/colors";
import { AuthenticatedStackParamList } from "../../../utils/types/types";
import { routineTools } from "../../../utils/utils";
import RoutineTool from "./routine-tool";

const ToolsContainer: React.FC = () => {
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const { t } = useTranslation();

  const navigateToScreen = (screenName: string) => {
    navigation.navigate("SubRoutes", { screen: screenName });
  };
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        {routineTools.map((tool) => (
          <RoutineTool
            key={tool.titleKey}
            title={t(tool.titleKey)}
            navigateTo={() => navigateToScreen(tool.screenName)}
          >
            <tool.IconComponent />
          </RoutineTool>
        ))}
      </View>
    </View>
  );
};

export default ToolsContainer;

const styles = StyleSheet.create({
  outerContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  innerContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  toolContainer: {
    height: 157.5,
    width: 157.5,
    borderRadius: 13,
    marginVertical: 7.5,
    backgroundColor: AppColors.blue100,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
});
