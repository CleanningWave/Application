import { useEffect, useRef } from "react";
import MainLayout from "./main";
import LoginLayout from "./login";
import { checkAccessToken } from "@/scripts/api/checkToken";

const Main = () => {
  const isLogined = useRef<boolean>(false);

  const tokenCheck = async () => {
    const isAccessToken = await checkAccessToken();
    isLogined.current = isAccessToken;
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  return isLogined ? <MainLayout /> : <LoginLayout />;
};

export default Main;
