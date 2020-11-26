import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',

      '& .MuiTextField-root': {
        margin: theme.spacing(2, 2, 1, 0),
        width: '100%',
      },
    },
    formControl: {
      margin: theme.spacing(2, 1),
      minWidth: '90%',
    },
    submitBtn: {
      float: 'right',
      margin: theme.spacing(2, 0),
    },
    // submitBtn: {

    //   margin: theme.spacing(3, 3),
    // },
  })
)

export default useStyles
