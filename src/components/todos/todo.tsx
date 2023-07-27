import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface TodoProps {
  icon: boolean;
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onPressIcon?: () => void;
}

const Todo: React.FC<TodoProps> = ({
  icon,
  title,
  description,
  style,
  onPress,
  onPressIcon,
}) => {
  return (
    <TouchableWithoutFeedback style={styles.todoContainer} onPress={onPress}>
      <TouchableWithoutFeedback onPress={onPressIcon}>
        <Icon
          name={icon === false ? "stop-outline" : "checkbox"}
          size={40}
          style={styles.iconStyle}
        />
      </TouchableWithoutFeedback>
      <View>
        <AppText
          fontStyle="body"
          colorStyle="black64"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[style, description ? { marginBottom: 5 } : null]}
        >
          {title}
        </AppText>
        {description && (
          <AppText
            fontStyle="information"
            colorStyle="black64"
            numberOfLines={1}
            ellipsizeMode="tail"
            style={style}
          >
            {description}
          </AppText>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    width: "100%",
    height: 72,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: AppColors.blueMuted30,
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyle: {
    color: AppColors.blue200,
    marginRight: 10,
  },
});
