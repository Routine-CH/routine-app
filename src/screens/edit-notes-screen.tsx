import { RouteProp } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList, UserNotes } from "../utils/types/types";

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

const EditNotesScreen: React.FC<EditNotesScreenProps> = ({ route }) => {
  const note = route.params.Notes.params.NoteView.noteEdit.note;

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton type="true" />
      <View style={styles.contentContainer}>
        <LabelInputField
          editText={note?.title}
          inputStyle={styles.inputHeadingStyle}
          multiline
        />
        <LabelInputField
          editText={note?.description}
          inputStyle={styles.inputStyle}
          multiline
        />
      </View>
      <View style={styles.imageContainer}>
        {note?.images.map((image, index) => (
          <View>
            <View style={styles.closeIcon}>
              <Icon name="close" size={25} color={AppColors.white} />
            </View>
            <Image
              key={index}
              source={{ uri: image.imageUrl }}
              style={styles.image}
            />
          </View>
        ))}
      </View>
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
    right: 5,
    top: 5,
    height: 30,
    width: 30,
    backgroundColor: AppColors.red,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
});
