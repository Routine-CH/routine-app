import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { launchCameraAsync, launchImageLibraryAsync } from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import { updateNoteRequest } from "../data/notes/update-request";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import {
  AuthenticatedStackParamList,
  IFormNoteInputs,
  UserNotes,
} from "../utils/types/types";

type EditNotesScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "Home"
> & {
  params: {
    Notes: {
      params: {
        NoteView: {
          noteEdit: {
            note: UserNotes | null;
          };
        };
      };
    };
  };
};

type EditNotesScreenProps = {
  route: EditNotesScreenRouteProp;
};

type ImageItem = {
  id: string;
  imageUrl: string;
};

const EditNotesScreen: React.FC<EditNotesScreenProps> = ({ route }) => {
  const note = route.params.Notes.params.NoteView.noteEdit.note;
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { control, handleSubmit, setValue } = useForm<IFormNoteInputs>({
    defaultValues: {
      title: note?.title || "",
      description: note?.description || "",
    },
  });

  useEffect(() => {
    setValue("title", note?.title || "");
    setValue("description", note?.description || "");
  }, [note, setValue]);

  const noteId = note?.id;
  const [images, setImages] = useState<ImageItem[]>(note?.images || []);

  const handleUpdate = async ({
    noteId,
    title,
    description,
    images = [],
  }: IFormNoteInputs) => {
    try {
      const response = await updateNoteRequest({
        noteId,
        title,
        description,
        images: images.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
        })),
      });

      if (typeof response === "string") {
        showToast(ToastType.error, response);
        setErrorMessage("Something went wrong");
      } else if (response && "status" in response && response.status === 200) {
        showToast(ToastType.success, "Notiz gespeichert");
        setTimeout(() => {
          navigation.navigate("Discover", {
            screen: "Notes",
          });
        }, 2000);
      } else {
        showToast(ToastType.error, "Something went wrong");
      }
    } catch (error) {}
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

  const handleDelete = (imageId: string) => {
    setImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
  };

  const handleGalleryPress = async () => {
    try {
      const result = await launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
      });
      console.log(result);
      // if (!result.canceled) {
      //   const selectedImage: ImageItem = {
      //     id: `${Date.now()}`,
      //     imageUrl: result.uri,
      //   };
      //   setImages((prevImages) => [...prevImages, selectedImage]);
      // }
    } catch (error) {
      console.log("Image selection error:", error);
      // Handle any error that occurred during image selection
    }
  };

  const handleCameraPress = async () => {
    try {
      const result = await launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
      });
    } catch (error) {
      console.log("Image selection error:", error);
    }
  };

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton
        type="true"
        onPress={handleSubmit(
          (data) => handleUpdate({ ...data, noteId }),
          onErrors
        )}
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
      <View style={styles.imageContainer}>
        {images.map((image) => (
          <View key={image.id} style={{ marginBottom: 30 }}>
            <View style={styles.closeIcon}>
              <Icon
                name="close"
                size={25}
                color={AppColors.white}
                onPress={() => handleDelete(image.id)}
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
      <View style={styles.iconContainer}>
        <IconButton
          iconName="camera"
          style={[styles.iconStyle, { marginRight: 15 }]}
          navigateTo={handleCameraPress}
        />
        <IconButton
          iconName="images"
          style={styles.iconStyle}
          navigateTo={handleGalleryPress}
        />
      </View>
      <RoutineToast />
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
    minHeight: 330,
    marginVertical: 30,
    backgroundColor: AppColors.blueMuted20,
    borderRadius: 10,
  },
  imageContainer: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  image: {
    height: 158,
    width: 157,
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
});
