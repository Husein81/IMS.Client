import { useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { extendTheme } from "@mui/joy/styles";
type ColorPalette = {
  [key: number]: string;
};

export type ColorSet = {
  gray: ColorPalette;
  black: ColorPalette;
  white: ColorPalette;
  blue: ColorPalette;
  indigo: ColorPalette;
};
type TokenFunction = () => ColorSet;

export const token: TokenFunction = () => ({
  black: {
    100: "#090a0c",
    200: "#111418",
    300: "#1a1f23",
    400: "#22292f",
    500: "#2b333b",
    600: "#555c62",
    700: "#808589",
    800: "#aaadb1",
    900: "#d5d6d8",
  },
  blue: {
    100: "#001a33",
    200: "#003366",
    300: "#004d99",
    400: "#0066cc",
    500: "#0080ff",
    600: "#fefefe",
    700: "#66b3ff",
    800: "#99ccff",
    900: "#cce6ff",
  },

  gray: {
    100: "#1d2021",
    200: "#3a4042",
    300: "#575f64",
    400: "#747f85",
    500: "#919fa6",
    600: "#a7b2b8",
    700: "#bdc5ca",
    800: "#d3d9db",
    900: "#e9eced",
  },

  white: {
    100: "#313131",
    200: "#626262",
    300: "#939494",
    400: "#c4c5c5",
    500: "#fcfcfc",
    600: "#f7f8f8",
    700: "#f9fafa",
    800: "#fbfbfb",
    900: "#fdfdfd",
  },
  indigo: {
    100: "#141619",
    200: "#282b32",
    300: "#3c414a",
    400: "#505663",
    500: "#646c7c",
    600: "#838996",
    700: "#a2a7b0",
    800: "#c1c4cb",
    900: "#e0e2e5",
  },
});

type ThemeSettingsFunction = () => ThemeOptions;

export const themeSettings: ThemeSettingsFunction = () => {
  const colors = token();
  return {
    palette: {
      primary: {
        main: colors.black[500],
      },
      secondary: {
        main: colors.gray[500],
      },
      background: {
        default: colors.black[500],
        paper: colors.black[500],
      },
      text: {
        primary: colors.gray[600],
      },
      divider: colors.gray[300],
    },

    typography: {
      fontFamily: ["Roboto", "san-serif"].join(","),

      fontSize: 12,
      h1: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        color: colors.gray[200],
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        color: colors.gray[200],
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        color: colors.gray[200],
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 20,
        color: colors.gray[200],
      },
      h5: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 16,
        color: colors.gray[200],
      },
      h6: {
        fontFamily: ["Roboto", "san-serif"].join(","),
        fontSize: 14,
        color: colors.gray[200],
      },
    },
  };
};
const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          mainChannel: token().blue[500], // Sync primary color
        },
        neutral: {
          mainChannel: token().gray[500], // Use similar neutral color
        },
      },
    },
  },
  fontFamily: {
    body: "Roboto, sans-serif",
  },
});

export const useMode = () => {
  const theme = useMemo(() => createTheme(themeSettings()), []);
  return { theme, joyTheme };
};
