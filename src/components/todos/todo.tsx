import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface TodoProps {
  icon: any;
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
}

const Todo: React.FC<TodoProps> = ({ icon, title, description, style }) => {
  return (
    <View style={styles.todoContainer}>
      <Icon name={icon} size={40} style={styles.iconStyle} />
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
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    width: "100%",
    height: 72,
    borderRadius: 6,
    backgroundColor: AppColors.blueMuted30,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 15,
  },
  iconStyle: {
    color: AppColors.blue200,
    marginRight: 10,
  },
});
