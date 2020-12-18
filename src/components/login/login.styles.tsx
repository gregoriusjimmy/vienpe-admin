import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      position: 'relative',
      minWidth: '35%',
      padding: '18px 30px 50px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '5vw',
      borderRadius: '9px',
      zIndex: 100,
      backgroundColor: 'white',
    },
    loginTitle: {
      textAlign: 'center',
      color: theme.palette.primary.dark,
    },
  })
)

export default useStyles
