import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import { FullscreenLoadingIndicator } from "../components/common/fullscreen-loading-indicator";
import LabelInputField from "../components/common/input/label-input-field";
import { LoadingIndicator } from "../components/common/loading-indicator";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { useNoteFormHandling } from "../hooks/notes/use-note-form-handling";
import { useImageStore } from "../store/camera-image-store";
import { useNotesStore } from "../store/notes-store";
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
  const { setDataUpdated, isLoading, getNoteById } = useNotesStore();
  const note = getNoteById(noteId);
  const { removeExistingImage, addImage, setImages, resetImages, images } =
    useImageStore();

  const {
    control,
    handleSubmit,
    handleUpdate,
    onErrors,
    isEditable,
    updatingNote,
  } = useNoteFormHandling(note, navigation, noteId, setDataUpdated);

  useEffect(() => {
    if (note && note.images) {
      setImages(note.images);
    } else {
      resetImages();
    }
  }, [note]);

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

  console.log(images);

  return note ? (
    <ScrollViewScreenWrapper
      backgroundColor='white'
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
              inputStyle={styles.labelDescriptionInput}
              multiline
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
              <View key={image.id || image.uri} style={{ marginBottom: 30 }}>
                <View style={styles.closeIcon}>
                  <Icon
                    name='close'
                    size={25}
                    color={AppColors.white}
                    onPress={() => removeExistingImage(image.imageUrl)}
                  />
                </View>
                <Image
                  key={image.id}
                  source={{ uri: image.imageUrl || image.uri }}
                  style={styles.image}
                />
              </View>
            );
          })}
      </View>
      <RoutineToast />
      {updatingNote && (
        <FullscreenLoadingIndicator style={styles.fullscreenLoadingIndicator} />
      )}
    </ScrollViewScreenWrapper>
  ) : (
    <LoadingIndicator />
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
