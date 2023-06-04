import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface ChipProps {
  type: string;
  title: string;
  icon?: string;
  style?: any;
}

const Card: React.FC<ChipProps> = ({ type, title, icon, style }) => {
  return (
    <Pressable style={styles.container}>
      <View>
        <AppText
          fontStyle="information"
          colorStyle="black64"
          style={[styles.textStyle, { marginBottom: 5 }]}
        >
          {type}
        </AppText>
        <AppText
          fontStyle="body"
          colorStyle="black64"
          style={styles.textStyle}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </AppText>
      </View>
      {icon && (
        <View>
          <Icon name={icon} size={24} style={style} />
        </View>
      )}
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    height: 72,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginLeft: 5,
    marginBottom: 15,
    backgroundColor: AppColors.blueMuted20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textStyle: {
    width: 165,
  },
});
