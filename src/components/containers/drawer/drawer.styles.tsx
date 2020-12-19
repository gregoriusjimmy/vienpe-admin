import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(1, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },

    divider: {
      margin: '8px 0px',
    },
    nav: {
      padding: theme.spacing(2),
    },
    currentNavColor: {
      color: theme.palette.primary.main,
    },
    currentIconColor: {
      color: theme.palette.primary.main,
    },
  })
)

export default useStyles
