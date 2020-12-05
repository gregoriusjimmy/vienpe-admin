import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Toolbar, Typography, Tooltip, IconButton } from '@material-ui/core'
import FilterListIcon from '@material-ui/icons/FilterList'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    title: {
      flex: '1 1 100%',
    },
  })
)

export const EnhancedTableToolbar = () => {
  const classes = useStyles()

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
        Member
      </Typography>
      <Tooltip title='Filter list'>
        <IconButton aria-label='filter list'>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default EnhancedTableToolbar
