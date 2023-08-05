import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../components/common/toast/show-toast";
import { updateNoteRequest } from "../../data/note/update-request";
import { ToastType } from "../../utils/types/enums";
import { AuthenticatedStackParamList } from "../../utils/types/routes/types";

import { IFormNoteInputs, UserNotes } from "../../utils/types/types";

export const useNoteFormHandling = (
  note: UserNotes | null,
  navigation: NavigationProp<AuthenticatedStackParamList>,
  noteId: string
) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingNote, setUpdatingNote] = useState(false);
  const [isEditable, setIsEditable] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormNoteInputs>({
    defaultValues: {
      title: note?.title || "",
      description: note?.description || "",
    },
  });

  useEffect(() => {
    setValue("title", note?.title || "");
    setValue("description", note?.description || "");
  }, [note, setValue]);

  const handleUpdate = async (data: IFormNoteInputs) => {
    try {
      setUpdatingNote(true);
      const response = await updateNoteRequest({
        ...data,
        noteId,
      });

      if (typeof response === "string") {
        showToast(ToastType.error, response);
        setErrorMessage("Something went wrong");
      } else if (response && "status" in response && response.status === 200) {
        setIsEditable(false);
        showToast(ToastType.success, "Notiz gespeichert");
        setTimeout(() => {
          navigation.navigate("Notes");
        }, 2000);
      }
    } catch (error) {
      showToast(ToastType.error, errorMessage);
    }
    setUpdatingNote(false);
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

  return {
    control,
    handleSubmit,
    handleUpdate,
    onErrors,
    updatingNote,
    isEditable,
  };
};
