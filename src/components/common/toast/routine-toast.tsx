import { StyleSheet, View } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

const RoutineToast: React.FC = () => {
  const toastConfig = {
    infoToast: ({ props }: { props: { message: string } }) => (
      <View style={styles.toastContainer}>
        <View style={styles.innerContainer}>
          <Icon
            name='ios-information'
            color={AppColors.blue100}
            size={35}
            style={{ position: "relative", bottom: 5 }}
          />
          <AppText fontStyle='toast'>{props.message}</AppText>
        </View>
      </View>
    ),
    successDeleteToast: ({ props }: { props: { message: string } }) => (
      <View style={styles.toastContainer}>
        <View style={styles.innerContainer}>
          <Icon
            name='ios-information'
            color={AppColors.blue300}
            size={35}
            style={{ position: "relative", bottom: 5 }}
          />
          <AppText fontStyle='toast'>{props.message}</AppText>
        </View>
      </View>
    ),
    successToast: ({ props }: { props: { message: string } }) => (
      <View style={styles.toastContainer}>
        <View style={styles.innerContainer}>
          <Icon
            name='ios-information'
            color={AppColors.green200}
            size={35}
            style={{ position: "relative", bottom: 5 }}
          />
          <AppText fontStyle='toast'>{props.message}</AppText>
        </View>
      </View>
    ),
    errorToast: ({ props }: { props: { message: string } }) => (
      <View style={styles.toastContainer}>
        <View style={styles.innerContainer}>
          <Icon
            name='ios-information'
            color={AppColors.red}
            size={35}
            style={{ position: "relative", bottom: 5 }}
          />
          <AppText fontStyle='toast'>{props.message}</AppText>
        </View>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export default RoutineToast;

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: "95%",
    backgroundColor: AppColors.white,
    borderRadius: 10,
    shadowColor: AppColors.grey,
    shadowOffset: { width: 0, height: 9 } as {
      width: number;
      height: number;
    },
    shadowOpacity: 0.35,
    shadowRadius: 11.9,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
