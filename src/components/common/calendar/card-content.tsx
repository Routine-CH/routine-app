import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface ChipProps {
  type?: string;
  title: string;
  icon?: string;
  iconStyle?: any;
  cardStyle?: StyleProp<ViewStyle>;
}

const windowWidth = Dimensions.get("window").width;

const CardContent: React.FC<ChipProps> = ({
  type,
  title,
  icon,
  iconStyle,
  cardStyle,
}) => {
  return (
    <View style={[styles.container, cardStyle]}>
      <View style={{ width: "100%", maxWidth: "90%" }}>
        {type && (
          <AppText
            fontStyle='information'
            colorStyle='black64'
            style={{ marginBottom: 5 }}
          >
            {type}
          </AppText>
        )}
        <AppText
          fontStyle='body'
          colorStyle='black64'
          numberOfLines={1}
          ellipsizeMode='tail'
        >
          {title}
        </AppText>
      </View>
      {icon && (
        <View>
          <Icon name={icon} size={24} style={iconStyle} />
        </View>
      )}
    </View>
  );
};

export default CardContent;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.65,
    height: 72,
    borderRadius: 6,
    paddingHorizontal: 15,
    marginLeft: 5,
    backgroundColor: AppColors.blueMuted20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
