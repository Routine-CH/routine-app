import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import AppText from "../components/common/typography/app-text";
import { useNoteData } from "../hooks/notes/use-note-data";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/types";

type NoteViewScreenRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "NoteView"
>;

type NoteViewProps = {
  route: NoteViewScreenRouteProps;
};

const NoteViewScreen: React.FC<NoteViewProps> = ({ route }) => {
  const { t } = useTranslation();
  const noteId = route.params.id;
  const { note, isLoading } = useNoteData(noteId);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const createdAt = note?.createdAt ? new Date(note.createdAt) : null;
  const formattedDate = createdAt
    ? format(createdAt, "dd. MMMM yyyy", { locale: de })
    : "";

  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <View style={styles.buttonContainer}>
        <BackButton type="true" style={styles.buttonStyle} />
        <Pressable onPress={handleModalPress}>
          <Icon
            name={"ellipsis-vertical"}
            size={26}
            color={AppColors.black64}
          />
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <AppText fontStyle="toast" colorStyle="black70">
          {formattedDate}
        </AppText>
        <AppText
          fontStyle="heading3"
          colorStyle="black70"
          style={{ marginVertical: 15 }}
        >
          {note?.title}
        </AppText>
        <AppText fontStyle="body" colorStyle="black70">
          {note?.description}
        </AppText>
      </View>
      <View>
        {note?.images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.imageUrl }}
            style={styles.image}
          />
        ))}
      </View>
      {/*       <EditDeleteModal
        title={t("modals.are-you-sure")}
        description={t("modals.notes")}
        isVisible={isModalVisible}
        onConfirm={deleteNote}
        onClose={closeModal}
        //   navigateTo={() => navigateToNoteEditScreen()}
      /> */}
      <RoutineToast />
    </ScrollViewScreenWrapper>
  );
};

export default NoteViewScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: AppColors.blueMuted20,
  },
  contentContainer: {
    minHeight: 330,
    marginVertical: 30,
    backgroundColor: AppColors.blueMuted20,
    borderRadius: 10,
    padding: 15,
  },
  image: {
    height: 220,
    width: "100%",
    borderRadius: 10,
    marginBottom: 15,
  },
});
