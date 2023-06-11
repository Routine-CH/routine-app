import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import BreakSlide from "../components/timer/break-slide";
import PauseSlide from "../components/timer/pause-slide";
import RunningSlide from "../components/timer/running-slide";
import StartSlide from "../components/timer/start-slide";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const TimerScreen: React.FC = () => {
  const [slide, setSlide] = useState("start");
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeRemaining === 0) {
      if (slide === "running") {
        setSlide("break");
        setTimeRemaining(5 * 60); // 5 minutes break time
      } else if (slide === "break") {
        setSlide("start");
        setTimeRemaining(25 * 60); // 25 minutes work time
      }
    }

    if (slide === "running") {
      timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [slide, timeRemaining]);

  const startTimer = () => {
    setSlide("running");
  };

  const pauseTimer = () => {
    setSlide("pause");
  };

  const cancelTimer = () => {
    setSlide("start");
    setTimeRemaining(25 * 60); // Reset the timer to 25 minutes
  };

  const adjustTime = (newTime: number) => {
    if (slide === "start" || slide === "pause") {
      setTimeRemaining(newTime * 60);
    }
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.blue100}
      statusBarColor={StatusBarColor.light}
      defaultPadding
    >
      <BackButton style={styles.buttonStyle} />
      {slide === "start" && (
        <StartSlide onStartTimer={startTimer} onSetDuration={adjustTime} />
      )}
      {slide === "running" && (
        <RunningSlide
          timeRemaining={timeRemaining}
          onPauseTimer={pauseTimer}
          onCancelTimer={cancelTimer}
        />
      )}
      {slide === "pause" && (
        <PauseSlide
          timeRemaining={timeRemaining}
          onStartTimer={startTimer}
          onCancelTimer={cancelTimer}
        />
      )}
      {slide === "break" && (
        <BreakSlide onStartTimer={startTimer} onSetDuration={adjustTime} />
      )}
    </ScreenWrapper>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColors.white,
  },
});
