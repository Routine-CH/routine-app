import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import FlatButton from "../common/buttons/flat-button";
import AppText from "../common/typography/app-text";

type RegisterNavigationProps = {
  onPress: () => void;
};

const windowHeight = Dimensions.get("window").height;

const RegisterNavigation: React.FC<RegisterNavigationProps> = ({ onPress }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.registerContainer}>
      <AppText fontStyle='body' colorStyle='white' style={{ lineHeight: 30 }}>
        {t("shared-auth.no-account")}
      </AppText>
      <FlatButton
        fontStyle='bodyMedium'
        colorStyle='white'
        style={{ marginLeft: 5, lineHeight: 30 }}
        onPress={onPress}
      >
        {t("shared-auth.register")}
      </FlatButton>
    </View>
  );
};

export default RegisterNavigation;

const styles = StyleSheet.create({
  registerContainer: {
    width: "100%",
    marginTop: windowHeight * 0.04,
    flexDirection: "row",
    justifyContent: "center",
  },
});
