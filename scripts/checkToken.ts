import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return typeof accessToken === "string" && accessToken.length > 0;
};
