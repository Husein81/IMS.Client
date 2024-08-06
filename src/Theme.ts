import { createContext, useState, useMemo } from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

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
type TokenFunction = (mode: PaletteMode) => ColorSet;



export const token: TokenFunction = (mode) => ({
    ...(mode === 'dark'
        ?
        {
            black: {
                100: "#d5d6d8",
                200: "#aaadb1",
                300: "#808589",
                400: "#555c62",
                500: "#2b333b",
                600: "#22292f",
                700: "#1a1f23",
                800: "#111418",
                900: "#090a0c"
            },
            blue: {
                100: "#cce6ff",
                200: "#99ccff",
                300: "#66b3ff",
                400: "#fefefe",
                500: "#0080ff",
                600: "#0066cc",
                700: "#004d99",
                800: "#003366",
                900: "#001a33"
            },
          
            gray: {
                100: "#e9eced",
                200: "#d3d9db",
                300: "#bdc5ca",
                400: "#a7b2b8",
                500: "#919fa6",
                600: "#747f85",
                700: "#575f64",
                800: "#3a4042",
                900: "#1d2021"
             },
             
             white: {
                100: "#fdfdfd",
                200: "#fbfbfb",
                300: "#f9fafa",
                400: "#f7f8f8",
                500: "fcfcfc",
                600: "#c4c5c5",
                700: "#939494",
                800: "#626262",
                900: "#313131"
             },
             indigo: {
                100: "#e0e2e5",
                200: "#c1c4cb",
                300: "#a2a7b0",
                400: "#838996",
                500: "#646c7c",
                600: "#505663",
                700: "#3c414a",
                800: "#282b32",
                900: "#141619"
            },
         } :
         {
            blue: {
                100: "#001a33",
                200: "#003366",
                300: "#004d99",
                400: "#0066cc",
                500: "#0080ff",
                600: "#3399ff",
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
                900: "#e9eced"
             },
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
             white: {
                 100: "#313131",
                 200: "#626262",
                 300: "#939494",
                 400: "#c4c5c5",
                 500: "#f5f6f6",
                 600: "#f7f8f8",
                 700: "#f9fafa",
                 800: "#fbfbfb",
                 900: "#fdfdfd"
             },
             indigo: {
                100: "#e0e2e5",
                200: "#c1c4cb",
                300: "#a2a7b0",
                400: "#838996",
                500: "#646c7c",
                600: "#505663",
                700: "#3c414a",
                800: "#282b32",
                900: "#141619"
            },
         })
});

type ThemeSettingsFunction = (mode: PaletteMode) => ThemeOptions;

export const themeSettings: ThemeSettingsFunction = (mode) => {
    const colors = token(mode);
    return {
        palette: {
            mode,
            primary: {
                main:colors.black[500]
            },
            secondary: {
                main: colors.gray[500]
            },
            background: {
                default: colors.black[500],
                paper: colors.black[500]
              
            },
            text: {
                primary: colors.gray[500]
            },
            divider: colors.gray[300]
        },

        typography: {
            fontFamily: ["Roboto", "san-serif"].join(','),
            
            fontSize: 12,
            h1: {
                fontFamily: ["Roboto", "san-serif"].join(','),
                color: colors.gray[200],
                fontSize: 40
            },
            h2: {
                fontFamily: ["Roboto", "san-serif"].join(','),
                color: colors.gray[200],
                fontSize: 32
            },
            h3: {
                fontFamily: ["Roboto", "san-serif"].join(','),
                color: colors.gray[200],
                fontSize: 24
            },
            h4: {
                fontFamily: ["Roboto", "san-serif"].join(','),
                fontSize: 20,
                color: colors.gray[200],
            },
            h5: {
                fontFamily: ["Roboto", "san-serif"].join(','),
                fontSize: 16,
                color: colors.gray[200],
            },
            h6: {
                fontFamily: ["Roboto", "san-serif"].join(','),
                fontSize: 14,
                color: colors.gray[200],
            },
        }
    };
};


export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});


export const useMode = () => {
    const [mode, setMode] = useState<PaletteMode>("light");

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => 
                setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
        }), []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return [ theme, colorMode] as const;
}

