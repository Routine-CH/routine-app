import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../../components/common/toast/show-toast";
import { updateTodoRequest } from "../../data/todo/update-request";
import { ToastType } from "../../utils/types/enums";
import {
      AuthenticatedStackParamList,
      IFormTodoInputs,
      UserTodo
} from "../../utils/types/types";

export const useTodoFormHandling = (
  todo: UserTodo | null,
  navigation: BottomTabNavigationProp<AuthenticatedStackParamList>,
  id: string,
//   plannedDate: Date | undefined
) => {
  const [errorMessage, setErrorMessage] = useState("");

//   const formattedDate =  plannedDate?.toISOString().split("T")[0];

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
      // plannedDate: formattedDate,
    },
  });

  useEffect(() => {
    setValue("title", todo?.title || "");
    setValue("description", todo?.description || "");
  }, [todo, setValue]);

  const handleUpdate = async (data: IFormTodoInputs) => {
    try {
      const response = await updateTodoRequest({
        ...data,
        id,
      });

      if (typeof response === "string") {
        showToast(ToastType.error, response);
        setErrorMessage("Something went wrong");
      } else if (response && "status" in response && response.status === 200) {
        showToast(ToastType.success, "Todo gespeichert");
        setTimeout(() => {
          navigation.navigate("Todos");
        }, 2000);
      }
    } catch (error) {
      showToast(ToastType.error, errorMessage);
    }
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
  };
};
