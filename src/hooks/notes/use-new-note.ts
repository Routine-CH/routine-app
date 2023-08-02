import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../components/common/toast/show-toast";
import { createNoteRequest } from "../../data/note/create-request";
import { ToastType } from "../../utils/types/enums";
import {
  AuthenticatedStackParamList,
  IFormNoteInputs,
  Image,
} from "../../utils/types/types";

const useNewNote = (images: Image[]) => {
  const { control, handleSubmit } = useForm<IFormNoteInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const handleNewNote = useCallback(
    async ({ title, description }: IFormNoteInputs) => {
      const response = await createNoteRequest({
        title,
        description,
        images,
      });

      // console.log(response);

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
