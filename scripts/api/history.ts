import { API_PATH } from "@/constants/Path"
import baseInstance from "./axios"

export const getHistoryById = async (id:number) => {
  const { data } = await baseInstance.get(API_PATH.GET_HISTORY_BY_ID(id))
}