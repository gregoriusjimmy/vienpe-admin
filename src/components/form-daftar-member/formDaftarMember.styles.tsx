import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '200px',
      },
    },
    submitBtn: {
      float: 'right',
      margin: theme.spacing(3, 3),
    },
  })
);

export default useStyles;
