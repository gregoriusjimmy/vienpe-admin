import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    content: {
      padding: theme.spacing(4),
    },
  })
)

export default useStyles
