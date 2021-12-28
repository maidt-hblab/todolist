import { createTheme } from '@mui/material/styles';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#5CB85C',
      contrastText: '#fff',
    },
    secondary : {
      main: '#D9534F',
    },
    info: {
      main: '#00BCD4',
      contrastText: '#fff',
    }
  },
});

export { defaultTheme };
