import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import BreakSlide from "../components/timer/break-slide";
import PauseSlide from "../components/timer/pause-slide";
import RunningSlide from "../components/timer/running-slide";
import StartSlide from "../components/timer/start-slide";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

enum TimerSlide {
  Start = "start",
  Running = "running",
  Pause = "pause",
  Break = "break",
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const TimerScreen: React.FC = () => {
  const [slide, setSlide] = useState(TimerSlide.Start);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (timeRemaining === 0) {
      if (slide === TimerSlide.Running) {
        setSlide(TimerSlide.Break);
        setTimeRemaining(5 * 60); // 5 minutes break time
      } else if (slide === TimerSlide.Break) {
        setSlide(TimerSlide.Start);
        setTimeRemaining(25 * 60); // 25 minutes work time
      }
    }

    if (slide === TimerSlide.Running) {
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
    setSlide(TimerSlide.Running);
  };

  const pauseTimer = () => {
    setSlide(TimerSlide.Pause);
  };

  const cancelTimer = () => {
    setSlide(TimerSlide.Start);
    setTimeRemaining(25 * 60); // Reset the timer to 25 minutes
  };

  const adjustTime = (newTime: number) => {
    if (slide === TimerSlide.Start || slide === TimerSlide.Pause) {
      setTimeRemaining(newTime * 60); // Convert minutes to seconds
    }
  };

  return (
    <ScreenWrapper
      backgroundColor={AppColors.blue100}
      statusBarColor={StatusBarColor.light}
      defaultPadding
    >
      <BackButton style={styles.buttonStyle} type={true} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: windowHeight * 0.1,
        }}
      >
        {slide === TimerSlide.Start && (
          <StartSlide onStartTimer={startTimer} onSetDuration={adjustTime} />
        )}
        {slide === TimerSlide.Running && (
          <RunningSlide
            timeRemaining={timeRemaining}
            onPauseTimer={pauseTimer}
            onCancelTimer={cancelTimer}
          />
        )}
        {slide === TimerSlide.Pause && (
          <PauseSlide
            timeRemaining={timeRemaining}
            onStartTimer={startTimer}
            onCancelTimer={cancelTimer}
          />
        )}
        {slide === TimerSlide.Break && (
          <BreakSlide onStartTimer={startTimer} onSetDuration={adjustTime} />
        )}
      </View>
    </ScreenWrapper>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColors.white,
    position: "absolute",
    top: windowWidth * 0.15,
    left: windowWidth * 0.05,
  },
});
