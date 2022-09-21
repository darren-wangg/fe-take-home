import { extendTheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const theme = extendTheme({
  breakpoints: {
    sm: "40em",
    md: "52em",
    lg: "64em",
    xl: "80em",
  },
  semanticTokens: {
    colors: {
      siteBackground: {
        default:
          "linear-gradient(180deg, rgba(152, 164, 230, 0.2) 0%, rgba(217, 217, 255, 0) 31.09%),linear-gradient(0deg, #F8F8FC, #F8F8FC)",
        _dark: "linear-gradient(180deg, #141624 0%, #090A10 1%)",
      },
    },
    radii: {
      button: "12px",
    },
  },
  colors: {
    black: "#16161D",
  },
  fonts,
  styles: {
    global: {
      html: {
        minHeight: "100vh",
        background: "siteBackground",
      },
      "#__next": {
        height: "100%",
      },
      body: {
        padding: 0,
        margin: 0,
        width: "100%",
        minHeight: "100vh",
        background: "siteBackground !important",
      },
      a: {
        color: "inherit",
        textDecoration: "none",
      },
      li: {
        display: "inline",
        margin: "auto 1rem",
      },
      ".center": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      },
    },
  },
});

export default theme;
