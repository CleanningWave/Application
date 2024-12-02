import { API_PATH } from "@/constants/Path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseInstance from "./axios";
import { FileRes } from "@/types/FileDto";

export const postFile = async (uri: string) => {
  try {
    const token = await AsyncStorage.getItem("accessToken");

    const formData = new FormData();
    formData.append("file", {
      uri: uri,
      type: "image/jpeg",
      name: uri.split("/").pop() || "result.jpg",
    } as any);

    return await baseInstance.post<FileRes>(
      API_PATH.POST_REPORT_IMAGE,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
