import { createMuiTheme } from "@material-ui/core/styles";

const myWhite = "#F7F9FB";
const myOceanBlue = "#31708E";
const mySkyBlue = "#8FC1E3";
const myMedBlue = "#5085A5";
//const myGroundGreen = '#687864';

const theme = createMuiTheme({
  palette: {
    common: {
      myWhite,
    },
    primary: {
      light: mySkyBlue,
      main: myMedBlue,
      dark: myOceanBlue,
    },
    secondary: {
      main: myWhite,
    },
  },
});

export default theme;
