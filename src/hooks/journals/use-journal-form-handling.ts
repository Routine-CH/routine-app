import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../components/common/toast/show-toast";
import { updateUserJournalRequest } from "../../data/journal/update-request";
import { ToastType } from "../../utils/types/enums";
import { AuthenticatedStackParamList } from "../../utils/types/routes/types";
import { IFormJournalInputs, UserJournals } from "../../utils/types/types";

export const useFormHandling = (
  journal: UserJournals | null,
  navigation: NavigationProp<AuthenticatedStackParamList>,
  journalId: string,
  setDataUpdated: (updated: boolean) => void
) => {
  const [selectedMoods, setSelectedMoods] = useState<
    { id: string; type: string }[]
  >(
    journal?.journalMoods.map((journalMood) => ({
      id: journalMood.mood.id,
      type: journalMood.mood.type,
    })) || []
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormJournalInputs>({
    defaultValues: {
      title: journal?.title || "",
      moodDescription: journal?.moodDescription || "",
      activity: journal?.activity || "",
      toImprove: journal?.toImprove || "",
      thoughtsAndIdeas: journal?.thoughtsAndIdeas || "",
    },
  });

  useEffect(() => {
    if (journal) {
      setSelectedMoods(
        journal?.journalMoods.map((journalMood) => ({
          id: journalMood.mood.id,
          type: journalMood.mood.type,
        }))
      );
    }
  }, [journal]);

  useEffect(() => {
    setValue("title", journal?.title || "");
    setValue("moodDescription", journal?.moodDescription || "");
    setValue("activity", journal?.activity || "");
    setValue("toImprove", journal?.toImprove || "");
    setValue("thoughtsAndIdeas", journal?.thoughtsAndIdeas || "");
  }, [journal, setValue]);

  const handleUpdate = async (data: IFormJournalInputs) => {
    try {
      const response = await updateUserJournalRequest({
        ...data,
        journalId,
        moods: selectedMoods,
      });

      if (typeof response === "string") {
        showToast(ToastType.error, response);
        setErrorMessage("Something went wrong");
      } else if (response && "status" in response && response.status === 200) {
        showToast(ToastType.success, "Journal gespeichert");
        setDataUpdated(true);
        setTimeout(() => {
          navigation.navigate("Journals");
        }, 2000);
      } else {
        showToast(ToastType.error, "Bitte wähle mindestens eine Gefühl aus.");
      }
    } catch (error) {
      showToast(ToastType.error, errorMessage);
    }
  };

  const onErrors = (errors: any) => {
    if (errors.title) {
      setErrorMessage(errors.title.message);
    } else if (errors.moodDescription) {
      setErrorMessage(errors.moodDescription.message);
    } else if (errors.activity) {
      setErrorMessage(errors.activity.message);
    } else if (errors.toImprove) {
      setErrorMessage(errors.toImprove.message);
    } else if (errors.moods?.length > 0) {
      setErrorMessage("Bitte wähle mindestens eine Emotion aus");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const handleDeleteMood = (moodId: string) => {
    setSelectedMoods((prevSelectedMoods) =>
      prevSelectedMoods.filter((selectedMood) => selectedMood.id !== moodId)
    );
  };

  return {
    control,
    handleSubmit,
    selectedMoods,
    handleUpdate,
    onErrors,
    handleDeleteMood,
    setSelectedMoods,
  };
};
