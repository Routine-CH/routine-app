import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../components/common/toast/show-toast";
import { updateTodoRequest } from "../../data/todo/update-request";
import { ToastType } from "../../utils/types/enums";
import { AuthenticatedStackParamList } from "../../utils/types/routes/types";
import { IFormTodoInputs, UserTodo } from "../../utils/types/types";

export const useTodoFormHandling = (
  todo: UserTodo | null,
  navigation: NavigationProp<AuthenticatedStackParamList>,
  id: string,
  selectedDate: Date,
  setDataUpdated: (updated: boolean) => void
) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [updatingTodo, setUpdatingTodo] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [plannedDate, setPlannedDate] = useState<Date | undefined>(
    selectedDate
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormTodoInputs>({
    defaultValues: {
      id: id,
      title: todo?.title || "",
      description: todo?.description || "",
      plannedDate: plannedDate,
    },
  });

  useEffect(() => {
    setPlannedDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    setValue("title", todo?.title || "");
    setValue("description", todo?.description || "");
    if (plannedDate) {
      setValue("plannedDate", plannedDate);
    }
  }, [todo, plannedDate, setValue]);

  const handleUpdate = async (data: IFormTodoInputs) => {
    try {
      setUpdatingTodo(true);
      const response = await updateTodoRequest({
        ...data,
        id,
      });

      if (typeof response === "string") {
        showToast(ToastType.error, response);
        setErrorMessage("Something went wrong");
      } else if (response && "status" in response && response.status === 200) {
        setIsEditable(false);
        setDataUpdated(true);
        showToast(ToastType.success, "Todo gespeichert");
        setTimeout(() => {
          navigation.navigate("Todos");
        }, 2000);
      }
    } catch (error) {
      showToast(ToastType.error, errorMessage);
    }
    setUpdatingTodo(false);
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
    isEditable,
    updatingTodo,
  };
};
