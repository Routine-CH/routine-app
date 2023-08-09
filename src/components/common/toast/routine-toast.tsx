import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import Icon from "react-native-vector-icons/Ionicons";
import { useToastMessageStore } from "../../../store/toast-messages-store";
import AppColors from "../../../utils/constants/colors";
import { ToastType } from "../../../utils/types/enums";
import AppText from "../typography/app-text";

const RoutineToast: React.FC = () => {
  const { isVisible, message, type, hideToast } = useToastMessageStore();

  useEffect(() => {
    if (isVisible) {
      Toast.show({
        type,
        props: {
          message,
        },
      });
      hideToast();
    }
  }, [isVisible, message, type, hideToast]);

  const toastConfig: Record<
    ToastType,
    ({ props }: { props: { message: string } }) => JSX.Element
  > = {
    infoToast: ({ props }) => (
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
    successDeleteToast: ({ props }) => (
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
    successToast: ({ props }) => (
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
    errorToast: ({ props }) => (
      <View style={styles.toastContainer}>
        <View style={styles.innerContainer}>
          <Icon
            name='ios-information'
            color={AppColors.red}
            size={35}
            style={{ position: "relative" }}
          />
          <AppText fontStyle='toast' style={{ width: "85%" }}>
            {props.message}
          </AppText>
        </View>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export default RoutineToast;

const styles = StyleSheet.create({
  toastContainer: {
    position: "relative",
    zIndex: 9999999,
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
    paddingHorizontal: 15,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
