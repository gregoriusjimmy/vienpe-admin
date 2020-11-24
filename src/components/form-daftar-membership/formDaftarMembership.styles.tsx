import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',

      '& .MuiTextField-root': {
        margin: theme.spacing(1, 2, 1, 0),
        width: '100%',
      },
    },
    submitBtn: {
      float: 'right',
      margin: theme.spacing(2, 0),
    },
  })
)

export default useStyles
