import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      width: '40%',
      padding: '18px 30px 50px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '180px',
      borderRadius: '9px',
    },
    loginTitle: {
      textAlign: 'center',
      color: theme.palette.primary.dark,
    },
  })
);

export default useStyles;
