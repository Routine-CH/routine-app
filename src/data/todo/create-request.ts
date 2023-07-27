import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../components/common/toast/show-toast";
import apiClient from "../../utils/config/api-client";
import { API_BASE_URL } from "../../utils/config/config";
import { ToastType } from "../../utils/types/enums";
import { IFormTodoInputs } from "../../utils/types/types";

export const createTodoRequest = async ({
      title,
      description,
      plannedDate,
    }: IFormTodoInputs) => {
      console.log("Data received");
      try {
        if (title && description && plannedDate) {
          const token = await AsyncStorage.getItem("access_token");
          if (token) {
            // Format plannedDate to the desired string format
            const plannedDateString = plannedDate.toISOString().split("T")[0];
    
            // Initialize newTodoData as FormData
            let newTodoData = new FormData();
            newTodoData.append("title", title);
            newTodoData.append("description", description);
            newTodoData.append("plannedDate", plannedDateString);
    
            console.log(newTodoData);
    
            const response = await apiClient.post(
              `${API_BASE_URL}todos`,
              newTodoData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'multipart/form-data'
                },
              }
            );
    
            if (response.status !== 201) {
              showToast(ToastType.error, response.data?.message || "Note creation failed");
              throw new Error("Note creation failed");
            }
    
            console.log("Note created successfully", response);
            return response;
          }
        } else {
          console.log("Some data is empty");
        }
      } catch (error) {
        console.log(error);
      }
    };
    