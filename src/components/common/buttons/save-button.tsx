import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";
import AppText from "../typography/app-text";
import BackButton from "./back-button";

type SaveButtonProps = {
  onPress: () => void;
  backButtonStyle?: StyleProp<ViewStyle>;
  type?: boolean;
};

const windowWidth = Dimensions.get("window").width;

const SaveButton: React.FC<SaveButtonProps> = ({
  onPress,
  backButtonStyle,
  type,
}) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <BackButton style={[styles.buttonStyle, backButtonStyle]} type={type} />
      <Pressable style={styles.saveButton} onPress={onPress}>
        <Icon name='checkmark-outline' size={22} color={AppColors.white} />
        <AppText style={[styles.textStyle]}>{t("general.save")}</AppText>
      </Pressable>
    </View>
  );
};

export default SaveButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: AppColors.blueMuted20,
    color: AppColors.blue100,
  },
  saveButton: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 32,
    width: windowWidth * 0.35,
    borderRadius: 50,
    backgroundColor: AppColors.blue100,
  },
  textStyle: {
    color: AppColors.white,
    fontFamily: AppFontStyle.filters.fontFamily,
    fontSize: windowWidth * 0.045,
  },
});
