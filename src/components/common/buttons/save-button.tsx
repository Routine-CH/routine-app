import { useTranslation } from "react-i18next";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";
import BackButton from "./back-button";

type SaveButtonProps = {
  type?: string;
  backButtonStyle?: StyleProp<ViewStyle>;
};

const SaveButton: React.FC<SaveButtonProps> = ({ type, backButtonStyle }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <BackButton style={[styles.buttonStyle, backButtonStyle]} type={type} />
      <Pressable style={styles.saveButton}>
        <Icon name="checkmark-outline" size={22} style={styles.textStyle} />
        <AppText
          fontStyle="filters"
          style={[styles.textStyle, { marginLeft: 10 }]}
        >
          {t("general.save")}
        </AppText>
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
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    width: "40%",
    borderRadius: 14,
    backgroundColor: AppColors.blue100,
  },
  textStyle: {
    color: AppColors.white,
  },
});
