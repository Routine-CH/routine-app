import { useState } from "react";
import { StyleSheet } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScreenWrapper from "../components/common/screen-wrapper";
import BreakSlide from "../components/timer/break-slide";
import PauseSlide from "../components/timer/pause-slide";
import RunningSlide from "../components/timer/running-slide";
import StartSlide from "../components/timer/start-slide";
import AppColors from "../utils/constants/colors";

const TimerScreen: React.FC = () => {
  const [slide, setSlide] = useState("start");

  const startTimer = () => {
    setSlide("running");
  };

  const pauseTimer = () => {
    setSlide("pause");
  };

  const cancelTimer = () => {
    setSlide("start");
  };

  return (
    <ScreenWrapper backgroundColor={AppColors.blue100} defaultPadding>
      <BackButton style={styles.buttonStyle} type="true" />
      {slide === "start" && <StartSlide onStartTimer={startTimer} />}
      {slide === "running" && (
        <RunningSlide onPauseTimer={pauseTimer} onCancelTimer={cancelTimer} />
      )}
      {slide === "pause" && (
        <PauseSlide onStartTimer={startTimer} onCancelTimer={cancelTimer} />
      )}
      {slide === "break" && <BreakSlide onStartTimer={startTimer} />}
    </ScreenWrapper>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColors.white,
  },
});
