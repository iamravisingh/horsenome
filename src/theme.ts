import { createTheme } from "@mui/material/styles";

const monospaceStack =
  '"SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2d5a27",
    },
    secondary: {
      main: "#a8d5ba",
    },
    background: {
      default: "#f5f7f2",
      paper: "#fbfcf8",
    },
  },
  typography: {
    fontFamily: monospaceStack,
    h1: { fontFamily: monospaceStack },
    h2: { fontFamily: monospaceStack },
    h3: { fontFamily: monospaceStack },
    h4: { fontFamily: monospaceStack },
    h5: { fontFamily: monospaceStack },
    h6: { fontFamily: monospaceStack },
    subtitle1: { fontFamily: monospaceStack },
    subtitle2: { fontFamily: monospaceStack },
    body1: { fontFamily: monospaceStack },
    body2: { fontFamily: monospaceStack },
    button: { fontFamily: monospaceStack },
    caption: { fontFamily: monospaceStack },
    overline: { fontFamily: monospaceStack },
  },
});

export default theme;
