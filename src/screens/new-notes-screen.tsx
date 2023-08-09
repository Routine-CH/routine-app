import { NavigationProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { createNoteRequest } from "../data/note/create-request";
import { useImageStore } from "../store/camera-image-store";
import { useGamificationStore } from "../store/gamification-store";
import { useNotesStore } from "../store/notes-store";
import { useToastMessageStore } from "../store/toast-messages-store";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { IFormNoteInputs } from "../utils/types/types";

const windowWidth = Dimensions.get("window").width;

const NewNotesScreen: React.FC = () => {
  const { t } = useTranslation();
  const images = useImageStore.getState().images;
  const { control, handleSubmit } = useForm<IFormNoteInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const { setDataUpdated } = useNotesStore();
  const { removeImage, addImage, resetImages } = useImageStore();
  const [isEditable, setIsEditable] = useState(true);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const showToast = useToastMessageStore((state) => state.showToast);
  const { startLoading, stopLoading } = useToastMessageStore();

  const handleNewNote = async ({ title, description }: IFormNoteInputs) => {
    startLoading();
    const response = await createNoteRequest({
      title,
      description,
      images,
    });

    if (typeof response === "string") {
      setErrorMessage(response);
    } else if (response && response.status === 201) {
      setIsEditable(false);
      setDataUpdated(true);
      showToast(ToastType.success, "Notiz gespeichert");
      resetImages();

      if (response.data.earnedBadge) {
        useGamificationStore.getState().onOpenGamificationModal({
          title: response.data.earnedBadge.title,
          description: response.data.earnedBadge.description,
          imageUrl: response.data.earnedBadge.imageUrl,
        });
      }
      setTimeout(() => navigation.navigate("Notes"), 2000);
    } else {
      setErrorMessage("Something is wrong");
    }
    stopLoading();
  };

  const onErrors = (errors: any) => {
    if (errors.title) {
      setErrorMessage(errors.title.message);
    } else if (errors.description) {
      setErrorMessage(errors.description.message);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need access to your photos to make this work!");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [9, 16],
        quality: 1,
      });

      if (!result.canceled) {
        result.assets.forEach((asset) => {
          if (asset.uri) {
            const image = {
              uri: asset.uri,
              type: asset.type || "",
              filename: asset.fileName || "",
            };

            addImage(image);
          }
        });
      }
    }
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={handleSubmit(handleNewNote, onErrors)}
        isEditable={!isEditable}
      />
      <View style={styles.contentContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.title")}
              inputStyle={styles.labelInput}
              multiline
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='title'
          rules={{
            required: "Bitte gib deiner Notiz einen Titel",
            minLength: {
              value: 5,
              message: "Der Titel muss mindestens 5 Zeichen lang sein",
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("notes.note")}
              inputStyle={styles.labelDescriptionInput}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='description'
          rules={{
            required: "Bitte gib deiner Notiz eine Beschreibung",
            minLength: {
              value: 5,
              message: "Die Beschreibung muss mindestens 5 Zeichen lang sein",
            },
          }}
        />
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          iconName='camera'
          style={[styles.iconStyle, { marginRight: 15 }]}
          onPress={() =>
            navigation.navigate("SubRoutes", {
              screen: "CameraView",
            })
          }
          isEditable={!isEditable}
        />
        <IconButton
          iconName='images'
          style={styles.iconStyle}
          onPress={pickImage}
          isEditable={!isEditable}
        />
      </View>
      <View style={styles.imageContainer}>
        {images.length > 0 &&
          images.map((image) => {
            return (
              <View key={image.uri} style={{ marginBottom: 15 }}>
                <View style={styles.closeIcon}>
                  <Icon
                    name='close'
                    size={25}
                    color={AppColors.white}
                    onPress={() => removeImage(image.uri)}
                    disabled={!isEditable}
                  />
                </View>
                <Image source={{ uri: image.uri }} style={styles.image} />
              </View>
            );
          })}
      </View>
      <RoutineToast />
    </ScrollViewScreenWrapper>
  );
};

export default NewNotesScreen;

const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: AppColors.blue100,
    color: AppColors.white,
  },
  contentContainer: {
    minHeight: 300,
    marginVertical: 30,
    backgroundColor: AppColors.blueMuted20,
    borderRadius: 10,
    padding: 5,
  },
  labelInput: {
    fontFamily: AppFontStyle.heading3.fontFamily,
    fontSize: AppFontStyle.heading3.fontSize,
  },
  labelDescriptionInput: {
    fontFamily: AppFontStyle.body.fontFamily,
    fontSize: AppFontStyle.body.fontSize,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconStyle: {
    height: 58,
    width: 58,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 30,
  },
  closeIcon: {
    position: "absolute",
    zIndex: 2,
    right: 7,
    top: 7,
    height: 30,
    width: 30,
    backgroundColor: AppColors.red,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  image: {
    height: windowWidth * 0.43,
    width: windowWidth * 0.43,
    borderRadius: 10,
  },
});
