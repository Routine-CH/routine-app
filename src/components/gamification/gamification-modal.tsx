import { useEffect, useRef } from "react";
import { Animated, Dimensions, Image, StyleSheet, View } from "react-native";
import { useGamificationStore } from "../../store/gamification-store";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import FlatButton from "../common/buttons/flat-button";
import AppText from "../common/typography/app-text";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const GamificationModal: React.FC = () => {
  const slideAnim = useRef(new Animated.Value(-0.7 * windowHeight)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const showGamificationModal = useGamificationStore(
    (state) => state.showGamificationModal
  );
  const modalContent = useGamificationStore((state) => state.modalContent);
  const closeGamificationModal = useGamificationStore(
    (state) => state.closeGamificationModal
  );

  useEffect(() => {
    if (showGamificationModal) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0.5,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -windowHeight,
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [showGamificationModal]);

  return (
    <>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          opacity: overlayOpacity,
          zIndex: 1,
          pointerEvents: showGamificationModal ? "auto" : "none",
        }}
      />
      <Animated.View style={[styles.modalContainer, { bottom: slideAnim }]}>
        <View style={styles.contentContainer}>
          <Image
            source={require("../../assets/badges/test-badge-1.png")}
            style={styles.image}
          />
          <AppText
            colorStyle='black70'
            style={{
              fontFamily: AppFontStyle.heading2.fontFamily,
              fontSize: windowWidth * 0.09,
            }}
          >
            Login Legend
          </AppText>
          <AppText
            colorStyle='black70'
            style={{
              fontFamily: AppFontStyle.body.fontFamily,
              fontSize: windowWidth * 0.045,
              textAlign: "center",
              lineHeight: 20,
              marginTop: 15,
            }}
          >
            Mit 75 friedlichen Begegnungen mit den Troopers hast du die Kunst
            der Strategie und Diplomatie beim Schreiben unter Beweis gestellt.
            Dein Engagement für harmonische Lösungen und Selbstreflexion ist
            wirklich lobenswert.
          </AppText>
          <FlatButton
            colorStyle='white'
            buttonStyle={styles.button}
            onPress={closeGamificationModal}
            style={{
              textTransform: "uppercase",
              fontFamily: AppFontStyle.bodyMedium.fontFamily,
              fontSize: windowWidth * 0.06,
              paddingHorizontal: 30,
              paddingVertical: 12,
            }}
          >
            Weiter so!
          </FlatButton>
        </View>
      </Animated.View>
    </>
  );
};

export default GamificationModal;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: AppColors.white,
    position: "absolute",
    left: windowWidth * 0.025,
    flex: 1,
    width: windowWidth * 0.95,
    height: windowHeight * 0.7,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowHeight * 0.03,
    shadowColor: "#313131",
    shadowOffset: { width: 0, height: 20 } as {
      width: number;
      height: number;
    },
    shadowOpacity: 0.3,
    shadowRadius: 13.9,
    zIndex: 2,
  },
  contentContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },
  button: {
    backgroundColor: AppColors.blue100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 13,
    position: "absolute",
    bottom: windowHeight * 0.03,
  },
});
