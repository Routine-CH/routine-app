// showToast.ts
import Toast from "react-native-toast-message";
import { ToastType } from "../../../utils/types/enums";

export function showToast(type: ToastType, message: string) {
  Toast.show({
    type,
    props: {
      message,
    },
  });
}
