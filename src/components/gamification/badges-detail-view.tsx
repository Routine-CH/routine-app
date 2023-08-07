import { RouteProp } from "@react-navigation/native";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { useGamificationStore } from "../../store/gamification-store";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import { StatusBarColor } from "../../utils/types/enums";
import { AuthenticatedStackParamList } from "../../utils/types/routes/types";
import BackButton from "../common/buttons/back-button";
import { LoadingIndicator } from "../common/loading-indicator";
import ScreenWrapper from "../common/screen-wrapper";
import AppText from "../common/typography/app-text";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

type BadgesDetailViewRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "ProfileBadgesDetailView"
>;

type BadgesDetailViewProps = {
  route: BadgesDetailViewRouteProps;
};

const BadgesDetailView: React.FC<BadgesDetailViewProps> = ({ route }) => {
  // @ts-ignore: Unreachable code error
  const badgeId = route.params.id;
  const { loadBadgeById, badge, isLoading } = useGamificationStore();
  const { t } = useTranslation();

  useEffect(() => {
    loadBadgeById(badgeId);
  }, []);

  return !isLoading && badge ? (
    <ScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View style={styles.contentContainer}>
        {badge.imageUrl ? (
          <Image source={{ uri: badge.imageUrl }} style={styles.image} />
        ) : (
          <LoadingIndicator />
        )}
        <AppText
          colorStyle='black70'
          style={{
            fontFamily: AppFontStyle.heading2.fontFamily,
            fontSize: windowWidth * 0.09,
          }}
        >
          {badge.title}
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
          {t(`gamification.badge-desc.${badge.description}`)}
        </AppText>
        <AppText
          colorStyle='black70'
          style={{
            fontFamily: AppFontStyle.bodyBold.fontFamily,
            fontSize: windowWidth * 0.045,
            textAlign: "center",
            lineHeight: 25,
            marginTop: 30,
          }}
        >
          {t("gamification.earned-badge-text")}
        </AppText>
        {badge.assignedAt && (
          <AppText
            colorStyle='black70'
            style={{
              fontFamily: AppFontStyle.bodyBold.fontFamily,
              fontSize: windowWidth * 0.045,
              textAlign: "center",
              lineHeight: 25,
            }}
          >
            {t("gamification.earned-badge-date", {
              date: format(parseISO(badge!.assignedAt), "dd. MMMM yyyy", {
                locale: de,
              }),
            })}
          </AppText>
        )}
      </View>
    </ScreenWrapper>
  ) : (
    <LoadingIndicator />
  );
};

export default BadgesDetailView;

const styles = StyleSheet.create({
  modalContainer: {},
  contentContainer: {
    position: "relative",
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
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
