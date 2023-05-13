import { createTheme } from "@mui/material/styles";


 
export const shades = {
  primary: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  secondary: {
    100: "#cfd0d7",
    200: "#a0a1b0",
    300: "#707288",
    400: "#414361",
    500: "#111439",
    600: "#0e102e",
    700: "#0a0c22",
    800: "#070817",
    900: "#03040b"
  },
  neutral: {
    100: "#f5f5f5",
    200: "#ecebeb",
    300: "#e2e1e1",
    400: "#d9d7d7",
    500: "#cfcdcd",
    600: "#a6a4a4",
    700: "#7c7b7b",
    800: "#535252",
    900: "#292929",
  },
};

export const theme = createTheme({
  palette: {
    primary: {
      main: shades.primary[500],
    },
    secondary: {
      main: shades.secondary[500],
    },
    neutral: {
      dark: shades.neutral[700],
      main: shades.neutral[500],
      light: shades.neutral[100],
    },
  },
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    fontSize: 11,
    h1: {
      fontFamily: ["McLaren", "sans-serif"].join(","),
      fontSize: 48,
    },
    h2: {
      fontFamily: ["McLaren", "sans-serif"].join(","),
      fontSize: 36,
    },
    h3: {
      fontFamily: ["McLaren", "sans-serif"].join(","),
      fontSize: 20,
    },
    h4: {
      fontFamily: ["McLaren", "sans-serif"].join(","),
      fontSize: 14,
    },
  },
});