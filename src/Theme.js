import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff5a36",
      main: "#ff0000",
      dark: "#c20000",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#ffffff",
      main: "#e2e2e2",
      dark: "#b0b0b0",
      contrastText: "#000000",
    },
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none",
      },
    },
    MuiButtonGroup: {
      contained: {
        boxShadow: "none",
      },
    },
  },
});

export default responsiveFontSizes(Theme);
