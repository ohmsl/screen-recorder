"use client";
import "@fontsource/dm-sans";
import "@fontsource/noto-sans";
import { darkScrollbar } from "@mui/material";
import { createTheme } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface SimplePaletteColorOptions {
    gradient?: string;
  }
  interface PaletteColor {
    gradient?: string;
  }
  interface TypeBackground {
    gradient?: string;
  }
  // allow configuration using `createTheme`
  interface Palette {
    primary: PaletteColor;
    secondary: PaletteColor;
  }
}

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#101015",
      paper: "#1C2026",
      gradient:
        "linear-gradient(215deg,#17261d 15%,#000 85%) no-repeat 50% fixed",
    },
    primary: {
      main: "#2cdb75",
      gradient: "linear-gradient(145deg, #2cdb75, #1AAB4A)",
    },
    secondary: {
      main: "#00ab91",
      gradient: "linear-gradient(145deg, #00ab91, #007D6A)",
    },
    error: {
      main: "#EF3265",
      gradient: "linear-gradient(145deg, #EF3265, #B8002E)",
    },
    success: {
      main: "#2cdb75",
      gradient: "linear-gradient(145deg, #2cdb75, #1AAB4A)",
    },
    warning: {
      main: "#b95e04",
      gradient: "linear-gradient(145deg, #FFBE7D, #FF7F00)",
    },
    info: {
      main: "#b2a5ff",
      gradient: "linear-gradient(145deg, #b2a5ff, #7A5FFF)",
    },
    text: {
      primary: "rgb(255, 255, 255)",
      secondary: "rgb(245, 245, 245)",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "'Noto Sans', Arial, Helvetica, sans-serif",
    caption: {
      fontFamily: "'Poppins', Arial, Helvetica, sans-serif",
      fontWeight: 400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 0,
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides(theme) {
        return {
          html: {
            WebkitFontSmoothing: "auto",
          },
          body: {
            maxWidth: "100vw",
            overflowX: "hidden",
            backgroundColor: theme.palette.background.default,
            background: theme.palette.background.gradient,
            body: theme.palette.mode === "dark" ? darkScrollbar() : null,
          },
          a: {
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: "1px solid rgba(255, 255, 255, 0.5)",
          },
        };
      },
    },
  },
});

export default theme;
