import { t } from "i18next";
import { useRef, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import "react-native-gesture-handler";
import {
  GestureHandlerRootView,
  RectButton,
  Swipeable,
} from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import ConfirmationModal from "../common/modals/confirmation-modal";
import AppText from "../common/typography/app-text";

interface TodoProps {
  completed?: boolean;
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  futureTodo?: boolean;
  onPress?: () => void;
  onPressIcon?: () => void;
  onDeleteTodo?: () => void;
  onEditTodo?: () => void;
}

const Todo: React.FC<TodoProps> = ({
  completed,
  title,
  description,
  style,
  futureTodo,
  onPress,
  onPressIcon,
  onDeleteTodo,
  onEditTodo,
}) => {
  const iconName = completed ? "checkbox" : "stop-outline";
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleIconPress = () => {
    if (onPressIcon) {
      onPressIcon();
    }
  };

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const swipeableRef = useRef<Swipeable | null>(null);
  const renderRightActions = (progress: any, dragX: any) => {
    const trans = dragX.interpolate({
      inputRange: [-101, -100, -100, 0],
      outputRange: [1, 0, 0, -20],
    });

    return (
      <View style={styles.rightAction}>
        <RectButton
          style={[styles.iconContainer, { backgroundColor: AppColors.red }]}
          onPress={handleModalPress}
        >
          <Icon name='trash-outline' size={25} style={styles.actionIconStyle} />
        </RectButton>
        <RectButton
          style={[styles.iconContainer, { backgroundColor: AppColors.blue200 }]}
          onPress={onEditTodo}
        >
          <Icon name='pencil' size={25} style={styles.actionIconStyle} />
        </RectButton>
      </View>
    );
  };

  return (
    <>
      <GestureHandlerRootView
        style={[styles.todoContainer, futureTodo && styles.futureTodoContainer]}
      >
        <Swipeable
          ref={swipeableRef}
          friction={2}
          leftThreshold={2}
          renderRightActions={renderRightActions}
        >
          <View style={[styles.contentWrapper]}>
            <Icon
              name={iconName}
              size={40}
              style={styles.iconStyle}
              onPress={handleIconPress}
            />
            <TouchableWithoutFeedback onPress={onPress}>
              <View>
                <AppText
                  fontStyle='body'
                  colorStyle='black64'
                  numberOfLines={1}
                  ellipsizeMode='tail'
                  style={[
                    styles.textStyle,
                    style,
                    futureTodo && styles.futureTodoTextStyle,
                    description ? { marginBottom: 5 } : null,
                  ]}
                >
                  {title}
                </AppText>
                {description && (
                  <AppText
                    fontStyle='information'
                    colorStyle='black64'
                    numberOfLines={1}
                    ellipsizeMode='tail'
                    style={style}
                  >
                    {description}
                  </AppText>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </Swipeable>
      </GestureHandlerRootView>
      <ConfirmationModal
        title={t("modals.are-you-sure")}
        description={t("modals.todo")}
        actionText={t("modals.delete")}
        isVisible={isModalVisible}
        onConfirm={() => {
          if (!onDeleteTodo) return;
          onDeleteTodo();
          setIsModalVisible(false);
        }}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    width: "100%",
    height: 72,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: AppColors.blueMuted30,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  futureTodoContainer: {
    width: "100%",
  },
  iconStyle: {
    color: AppColors.blue200,
    marginRight: 10,
  },
  contentWrapper: {
    flexDirection: "row",
    paddingLeft: 20,
    height: "100%",
    minWidth: "100%",
    alignItems: "center",
  },
  textStyle: {
    maxWidth: 250,
  },
  futureTodoTextStyle: { maxWidth: 150 },
  rightAction: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  iconContainer: {
    width: 58,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconStyle: {
    color: AppColors.white,
  },
});
