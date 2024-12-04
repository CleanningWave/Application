import { API_PATH } from "@/constants/Path";
import baseInstance from "./axios";

export const checkAccessToken = async () => {
  try {
    try {
      await baseInstance.get(`${API_PATH.GET_HISTORY_LIST(1)}`);

      return true;
    } catch (error: any) {
      return false;
    }
  } catch (error) {
    return false;
  }
};
