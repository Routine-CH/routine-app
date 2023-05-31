import { ReactNode } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppColors from "../../../utils/constants/colors";
import ToolCard from "./tool-card";

type RoutineToolProps = {
  title: string;
  navigateTo?: () => void;
  isFavourite?: boolean;
  favouriteOnPress?: () => void;
  children: ReactNode;
};

const RoutineTool: React.FC<RoutineToolProps> = ({
  title,
  navigateTo,
  isFavourite,
  favouriteOnPress,
  children,
}) => {
  return (
    <TouchableOpacity
      style={[styles.toolContainer, isFavourite ? styles.favouriteTool : {}]}
      onPress={isFavourite ? favouriteOnPress : navigateTo}
    >
      <ToolCard title={title}>{children}</ToolCard>
    </TouchableOpacity>
  );
};

export default RoutineTool;

const styles = StyleSheet.create({
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
  favouriteTool: {
    borderColor: AppColors.blue200,
    borderWidth: 2,
  },
});
