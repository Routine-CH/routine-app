import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import { FullscreenLoadingIndicator } from "../components/common/fullscreen-loading-indicator";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { useNoteData } from "../hooks/notes/use-note-data";
import { useNoteFormHandling } from "../hooks/notes/use-note-form-handling";
import { useImageStore } from "../store/camera-image-store";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";

type NotesEditScreenRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "NotesEdit"
>;

type NotesEditProps = {
  route: NotesEditScreenRouteProps;
};

const windowWidth = Dimensions.get("window").width;

const EditNotesScreen: React.FC<NotesEditProps> = ({ route }) => {
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const noteId = route.params.id;
  const { note } = useNoteData(noteId);
  const images = useImageStore.getState().images;
  const { removeImage, addImage, resetImages } = useImageStore();

  const {
    control,
    handleSubmit,
    handleUpdate,
    onErrors,
    isEditable,
    updatingNote,
  } = useNoteFormHandling(note, navigation, noteId);

  console.log(images);

  useEffect(() => {
    if (!note) return;
    note.images.map((image) => {
      addImage(image);
    });
  });

  const handleDelete = (imageId: string) => {
    removeImage(imageId);
  };

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton
        type={true}
        onPress={handleSubmit(
          (data) => handleUpdate({ ...data, noteId }),
          onErrors
        )}
        isEditable={!isEditable}
      />
      <View style={styles.contentContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              inputStyle={styles.labelInput}
              multiline
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name="title"
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
              inputStyle={styles.labelDescriptionInput}
              multiline
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name="description"
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
          iconName="camera"
          style={[styles.iconStyle, { marginRight: 15 }]}
        />
        <IconButton iconName="images" style={styles.iconStyle} />
      </View>
      <View style={styles.imageContainer}>
        {images.length > 0 &&
          images.map((image) => (
            <View key={image.id} style={{ marginBottom: 30 }}>
              <View style={styles.closeIcon}>
                <Icon
                  name="close"
                  size={25}
                  color={AppColors.white}
                  onPress={() => handleDelete(image.id!)}
                  disabled={isEditable}
                />
              </View>
              <Image
                key={image.id}
                source={{ uri: image.imageUrl }}
                style={styles.image}
              />
            </View>
          ))}
      </View>
      <RoutineToast />
      {updatingNote && (
        <FullscreenLoadingIndicator style={styles.fullscreenLoadingIndicator} />
      )}
    </ScrollViewScreenWrapper>
  );
};

export default EditNotesScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColors.blueMuted20,
    color: AppColors.blue100,
  },
  contentContainer: {
    minHeight: 300,
    marginVertical: 30,
    backgroundColor: AppColors.blueMuted20,
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 30,
  },
  image: {
    height: windowWidth * 0.43,
    width: windowWidth * 0.43,
    borderRadius: 10,
  },
  inputHeadingStyle: {
    fontSize: AppFontStyle.heading3.fontSize,
    fontFamily: AppFontStyle.heading3.fontFamily,
    color: AppColors.black70,
  },
  inputStyle: {
    fontSize: AppFontStyle.body.fontSize,
    fontFamily: AppFontStyle.body.fontFamily,
    color: AppColors.black70,
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
  fullscreenLoadingIndicator: {
    marginLeft: -20,
  },
});
