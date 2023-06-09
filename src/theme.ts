import {createTheme, responsiveFontSizes} from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: '#293056',
      light: 'rgb(129, 186, 245)',
      contrastText: '#fff',
    },
    secondary: {
      main: 'rgb(149, 70, 76)',
      light: 'rgb(237, 131, 102)',
      contrastText: '#fff',
    },
    text: {
      primary: '#000',
      secondary: 'rgb(173, 157, 133)'
    },
    background: {
      default: 'rgb(241, 242, 245)'
    },
    error: {
      main: '#ff7043'
    },
  },
  shape: {
    borderRadius: 12
  },
  typography: {
    "fontFamily": "'Open Sans',system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji",
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
  },
});
theme = responsiveFontSizes(theme);

export default theme;