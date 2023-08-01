import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import AppColors from "../../../utils/constants/colors";
import ToolCard from "./tool-card";

type RoutineToolProps = {
  title: string;
  navigateTo?: () => void;
  isFavourite?: boolean;
  favouriteOnPress?: () => void;
  children: ReactNode;
};

const windowWidth = Dimensions.get("window").width;

const RoutineTool: React.FC<RoutineToolProps> = ({
  title,
  navigateTo,
  isFavourite,
  favouriteOnPress,
  children,
}) => {
  return isFavourite ? (
    <TouchableOpacity
      style={[styles.toolContainer, styles.favouriteTool]}
      onPress={favouriteOnPress}
    >
      <LinearGradient
        colors={["rgba(41, 104, 121, 0.3)", "transparent"]}
        locations={[0.1, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ToolCard title={title} isFavourite={isFavourite}>
          {children}
        </ToolCard>
      </LinearGradient>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.toolContainer}
      onPress={favouriteOnPress ? favouriteOnPress : navigateTo}
    >
      <ToolCard title={title} isFavourite={isFavourite}>
        {children}
      </ToolCard>
    </TouchableOpacity>
  );
};

export default RoutineTool;

const styles = StyleSheet.create({
  toolContainer: {
    height: windowWidth * 0.43,
    width: windowWidth * 0.43,
    borderRadius: 13,
    marginVertical: windowWidth * 0.022,
    backgroundColor: AppColors.blue100,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  favouriteTool: {
    backgroundColor: AppColors.blue300,
  },
  gradient: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
  },
});
