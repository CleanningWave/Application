/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

export const Colors = {
  text: "#1f2024",
  background: "#fff",
  highlight: {
    highlight_0: "#006ffd",
    highlight_1: "#2897ff",
    highlight_2: "#6fbaff",
    highlight_3: "#b4dbff",
    highlight_4: "#eaf2ff",
  },
  neutral: {
    light: {
      light_0: "#c5c6cc",
      light_1: "#d4d6dd",
      light_2: "#e8e9f1",
      light_3: "#f8f9fe",
      light_4: "#ffffff",
    },
    dark: {
      dark_0: "#1f2024",
      dark_1: "#2f3036",
      dark_2: "#494a50",
      dark_3: "#71727a",
      dark_4: "#8f9098",
    },
  },
  support: {
    green: {
      green_0: "#298267",
      green_1: "#3ac0a0",
      green_2: "#e7f4e8",
    },
    orange: {
      orange_0: "#e86339",
      orange_1: "#ffb37c",
      orange_2: "#fff4e4",
    },
    red: {
      red_0: "#ed3241",
      red_1: "#ff6160",
      red_2: "#ffe2e5",
    },
  },
} as const;
