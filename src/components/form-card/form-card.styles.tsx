import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { grey } from '@material-ui/core/colors'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { backgroundColor: grey[100], border: '2px solid black' },
    content: {
      padding: theme.spacing(4),
    },
    title: { marginBottom: theme.spacing(2) },
  })
)

export default useStyles
