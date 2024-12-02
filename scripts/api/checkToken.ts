import { API_PATH } from "@/constants/Path";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseInstance from "./axios";

export const checkAccessToken = async () => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    if (!accessToken || accessToken.length === 0) {
      return false;
    }

    try {
      await baseInstance.get(`${API_PATH.GET_HISTORY_LIST}?page=${1}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      return true;
    } catch (error: any) {
      return false;
    }
  } catch (error) {
    return false;
  }
};
