import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../components/common/toast/show-toast";
import { createNoteRequest } from "../../data/note/create-request";
import { ToastType } from "../../utils/types/enums";
import {
  AuthenticatedStackParamList,
  IFormNoteInputs,
} from "../../utils/types/types";

const useNewNote = () => {
  const { control, handleSubmit } = useForm<IFormNoteInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const handleNewNote = useCallback(
    async ({ title, description, images = [] }: IFormNoteInputs) => {
      const response = await createNoteRequest({
        title,
        description,
        images: images.map((image) => ({
          id: image.id,
          imageUrl: image.imageUrl,
        })),
      });

      if (typeof response === "string") {
        setErrorMessage(response);
      } else if (response && response.status === 201) {
        showToast(ToastType.success, "Notiz gespeichert");
        setTimeout(() => navigation.navigate("Notes"), 2000);
      } else {
        setErrorMessage("Something is wrong");
      }
    },
    [navigation]
  );

  const onErrors = useCallback((errors: any) => {
    if (errors.title) {
      setErrorMessage(errors.title.message);
    } else if (errors.description) {
      setErrorMessage(errors.description.message);
    }
  }, []);

  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  return { control, handleSubmit, handleNewNote, onErrors };
};

export default useNewNote;
