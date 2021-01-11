import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',

      padding: theme.spacing(0, 2),
    },
    paper: {
      width: '100%',
      height: 1400,
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
  })
)

type Props = {
  children: React.ReactNode
}

const TableCard: React.FC<Props> = ({ children }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>{children}</Paper>
    </div>
  )
}

export default TableCard
