import { useEffect, useState } from "react";
import MainLayout from "./main";
import LoginLayout from "./login";
import { checkAccessToken } from "@/scripts/api/checkToken";

const Main = () => {
  const [isLogined, setIsLogined] = useState<boolean>(false);

  const tokenCheck = async () => {
    const isAccessToken = await checkAccessToken();
    setIsLogined(isAccessToken);
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return isLogined ? <MainLayout /> : <LoginLayout />;
};

export default Main;
