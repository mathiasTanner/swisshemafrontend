import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff5a36",
      main: "#ff0000",
      dark: "#c20000",
      contrastText: "#ffffff"
    },
    secondary: {
      light: "#ffffff",
      main: "#f9f9f9",
      dark: "#c6c6c6",
      contrastText: "#000000"
    }
  },
  overrides: {
    MuiButton: {
      contained: {
        boxShadow: "none"
      }
    },
    MuiButtonGroup: {
      contained: {
        boxShadow: "none"
      }
    }
  }
});

export default Theme;
