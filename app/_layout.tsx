import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import AfterLoginLayout from "./layouts/AfterLoginLayout";
import BeforeLoginLayout from "./layouts/BeforeLoginLayout";
import ResultLayout from "./layouts/ResultLayout";
import HistoryLayout from "./layouts/HistoryLayout";
import DetailHistoryLayout from "./layouts/ReportLayout";
import { StatusBar } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Inter-Black": require("../assets/fonts/Inter-Black.otf"),
    "Inter-Bold": require("../assets/fonts/Inter-Bold.otf"),
    "Inter-ExtraBold": require("../assets/fonts/Inter-ExtraBold.otf"),
    "Inter-ExtraLight": require("../assets/fonts/Inter-ExtraLight.otf"),

    "Inter-Light": require("../assets/fonts/Inter-Light.otf"),
    "Inter-Medium": require("../assets/fonts/Inter-Medium.otf"),
    "Inter-Regular": require("../assets/fonts/Inter-Regular.otf"),
    "Inter-SemiBold": require("../assets/fonts/Inter-SemiBold.otf"),
    "Inter-Thin": require("../assets/fonts/Inter-Thin.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaView edges={["top"]}>
        <StatusBar barStyle={"default"} />
        {/* <BeforeLoginLayout /> */}
        {/* <AfterLoginLayout /> */}
        {/* <ResultLayout /> */}
        <HistoryLayout />
        {/* <DetailHistoryLayout /> */}
      </SafeAreaView>
    </ThemeProvider>
  );
}
