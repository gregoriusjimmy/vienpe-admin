import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#df78ef',
      main: '#ab47bc',
      dark: '#790e8b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffddc1',
      main: '#ffab91',
      dark: '#c97b63',
      contrastText: '#000',
    },
  },
});

export default theme;
