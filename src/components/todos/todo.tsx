import { t } from "i18next";
import { useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import ConfirmationModal from "../common/modals/confirmation-modal";
import AppText from "../common/typography/app-text";

interface TodoProps {
  completed: boolean;
  title: string;
  description?: string;
  style?: StyleProp<ViewStyle>;
  futureTodo: boolean;
  onPress?: () => void;
  onPressIcon?: () => void;
  onDeleteTodo: () => void;
  onEditTodo: () => void;
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

  const pan = useRef(new Animated.ValueXY()).current;
  const [showHiddenCard, setShowHiddenCard] = useState(false);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Only update the pan value when swiping to the left
      if (gestureState.dx < 0) {
        pan.setValue({ x: gestureState.dx, y: 0 });
        if (!showHiddenCard) {
          setShowHiddenCard(gestureState.dx < -100);
        }
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      // Customize this value to set the threshold for the swipe action
      const swipeThreshold = -100;
      if (gestureState.dx > swipeThreshold) {
        // Perform action when swiped enough to the left
        setShowHiddenCard(true);
      } else {
        // Reset the card position if not swiped enough
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start(); // Hide the hidden card after the animation is completed
      }
    },
  });

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  return (
    <View
      style={[styles.todoContainer, futureTodo && styles.futureTodoContainer]}
    >
      <Animated.View
        style={[
          styles.contentWrapper,
          futureTodo && styles.futureTodoContentWrapper,
          { transform: [{ translateX: pan.x }] },
        ]}
        {...panResponder.panHandlers}
      >
        <Icon
          name={iconName}
          size={40}
          style={styles.iconStyle}
          onPress={handleIconPress}
        />
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={{ justifyContent: "space-between" }}>
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
        {showHiddenCard && (
          <View style={styles.hiddenCardContainer}>
            <Pressable
              style={[styles.iconContainer, { backgroundColor: AppColors.red }]}
              onPress={handleModalPress}
            >
              <Icon
                name='trash-outline'
                size={40}
                style={styles.actionIconStyle}
              />
            </Pressable>
            <Pressable
              style={[
                styles.iconContainer,
                { backgroundColor: AppColors.blue200 },
              ]}
              onPress={onEditTodo}
            >
              <Icon name='pencil' size={40} style={styles.actionIconStyle} />
            </Pressable>
          </View>
        )}
      </Animated.View>
      <ConfirmationModal
        title={t("modals.are-you-sure")}
        description={t("modals.todo")}
        actionText={t("modals.delete")}
        isVisible={isModalVisible}
        onConfirm={() => {
          onDeleteTodo();
          setIsModalVisible(false);
        }}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

export default Todo;

const styles = StyleSheet.create({
  todoContainer: {
    minWidth: 330,
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
    minWidth: 0,
  },
  iconStyle: {
    color: AppColors.blue200,
    marginRight: 10,
  },
  contentWrapper: {
    flexDirection: "row",
    minWidth: 330,
    paddingLeft: 15,
    height: "100%",
    alignItems: "center",
  },
  futureTodoContentWrapper: {
    minWidth: 200,
    width: "100%",
  },
  textStyle: {
    maxWidth: 250,
  },
  futureTodoTextStyle: { maxWidth: 150 },
  hiddenCardContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    width: 116,
    flexDirection: "row",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginRight: 0,
    overflow: "hidden",
  },
  iconContainer: {
    height: "100%",
    width: 58,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIconStyle: {
    color: AppColors.white,
  },
});
