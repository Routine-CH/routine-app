import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";
import TimeModal from "./time-modal";

interface CircleProps {
  timeRemaining: number;
  onChangeTime?: (newTime: number) => void;
  isEditable?: boolean;
}

const Circle: React.FC<CircleProps> = ({
  timeRemaining,
  onChangeTime,
  isEditable = true,
}) => {
  const [currentTime, setCurrentTime] = useState(timeRemaining);
  const [isSliderVisible, setIsSliderVisible] = useState(false);

  useEffect(() => {
    setCurrentTime(timeRemaining);
  }, [timeRemaining]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const handleTimeChange = (newTime: number) => {
    setCurrentTime(newTime * 60);
    if (onChangeTime) {
      onChangeTime(newTime);
    }
  };

  const handleCirclePress = () => {
    if (isEditable) {
      setIsSliderVisible(true);
    }
  };

  const handleSliderClose = () => {
    setIsSliderVisible(false);
  };

  const handleSliderSave = () => {
    // Perform any necessary operations with the updated time durations
    setIsSliderVisible(false);
  };

  return (
    <View style={styles.outerCircle}>
      <View style={styles.innerCircle}>
        {isEditable ? (
          <TouchableOpacity onPress={handleCirclePress}>
            <AppText fontStyle='heading1' colorStyle='white'>
              {formatTime(currentTime)}
            </AppText>
          </TouchableOpacity>
        ) : (
          <AppText fontStyle='heading1' colorStyle='white'>
            {formatTime(currentTime)}
          </AppText>
        )}
        {isEditable && (
          <TimeModal
            isVisible={isSliderVisible}
            onClose={handleSliderClose}
            onSave={handleSliderSave}
            onChangeTime={handleTimeChange}
          />
        )}
      </View>
    </View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  outerCircle: {
    width: 250,
    height: 250,
    marginVertical: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.white,
    borderRadius: 125,
  },
  innerCircle: {
    width: 210,
    height: 210,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.blue100,
  },
});
