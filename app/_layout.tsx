import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import AfterLoginLayout from "./layouts/AfterLoginLayout";
import BeforeLoginLayout from "./layouts/BeforeLoginLayout";
import ResultLayout from "./layouts/ResultLayout";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Black: require("../assets/fonts/Inter-Black.otf"),
    Bold: require("../assets/fonts/Inter-Bold.otf"),
    ExtraBold: require("../assets/fonts/Inter-ExtraBold.otf"),
    ExtraLight: require("../assets/fonts/Inter-ExtraLight.otf"),

    Light: require("../assets/fonts/Inter-Light.otf"),
    Medium: require("../assets/fonts/Inter-Medium.otf"),
    Regular: require("../assets/fonts/Inter-Regular.otf"),
    SemiBold: require("../assets/fonts/Inter-SemiBold.otf"),
    Thin: require("../assets/fonts/Inter-Thin.otf"),
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
        {/* <BeforeLoginLayout /> */}
        {/* <AfterLoginLayout /> */}
        <ResultLayout />
      </SafeAreaView>
    </ThemeProvider>
  );
}
