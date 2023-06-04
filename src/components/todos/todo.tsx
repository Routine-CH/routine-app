import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface TodoProps {
  icon: string;
  title: string;
  description: string;
}

const Todo: React.FC<TodoProps> = ({ icon, title, description }) => {
  return (
    <View style={styles.todoContainer}>
      <Icon name={icon} size={40} style={styles.iconStyle} />
      <View>
        <AppText
          fontStyle="body"
          colorStyle="black64"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.textStyle, { marginBottom: 5 }]}
        >
          {title}
        </AppText>
        <AppText
          fontStyle="information"
          colorStyle="black64"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.textStyle}
        >
          {description}
        </AppText>
      </View>
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    width: "100%",
    height: 64,
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
    marginRight: 20,
  },
  textStyle: {
    width: 240,
  },
});
