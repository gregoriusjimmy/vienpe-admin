import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100vh',
      width: '100%',
      margin: 'auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        width: '95%',
      },
    },
    backgroundSpan: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      zIndex: -100,

      backgroundColor: theme.palette.primary.dark,
    },
  })
)

export default useStyles
