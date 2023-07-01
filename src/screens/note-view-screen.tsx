import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import EditDeleteModal from "../components/common/modals/edit-delete-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList, UserNotes } from "../utils/types/types";

type NoteViewScreenRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "Home"
> & {
  params: {
    Notes: {
      params: { NoteView: { note: UserNotes | null } };
    };
  };
};

type NoteViewProps = {
  route: NoteViewScreenRouteProps;
};

const NoteViewScreen: React.FC<NoteViewProps> = ({ route }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const navigateToNoteEditScreen = () => {
    console.log("hi");
    setIsModalVisible(false);
  };

  const note = route.params.Notes.params.NoteView.note;

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
        <AppText
          fontStyle="heading3"
          colorStyle="black70"
          style={{ marginBottom: 15 }}
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
      <EditDeleteModal
        title={t("modals.are-you-sure")}
        description={t("modals.notes")}
        isVisible={isModalVisible}
        onClose={closeModal}
        navigateTo={() => navigateToNoteEditScreen()}
      />
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
