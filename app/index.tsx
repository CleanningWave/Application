import { useEffect, useState } from "react";
import MainLayout from "./main";
import { checkAccessToken } from "@/scripts/checkToken";
import LoginLayout from "./login";

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
