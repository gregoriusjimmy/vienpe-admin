import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      width: '40%',
      padding: '18px 30px 50px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '200px',
      border: '0px solid #64b5f6',
      borderRadius: '9px',
    },
    loginTitle: {
      textAlign: 'center',
    },
  })
);

export default useStyles;
