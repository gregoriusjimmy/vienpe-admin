import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Box, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',

      padding: theme.spacing(0, 2),
    },
    paper: {
      width: '100%',
      height: '100%',
      marginBottom: theme.spacing(2),
      padding: theme.spacing(3),
    },
    content: {
      height: 1400,
    },
    title: {
      padding: theme.spacing(1, 0, 2, 1),
    },
  })
)

type Props = {
  children: React.ReactNode
  title?: string
}

const TableCard: React.FC<Props> = ({ children, title }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {title && (
          <Typography className={classes.title} variant='h5'>
            {title}
          </Typography>
        )}
        <Box className={classes.content}>{children}</Box>
      </Paper>
    </div>
  )
}

export default TableCard
