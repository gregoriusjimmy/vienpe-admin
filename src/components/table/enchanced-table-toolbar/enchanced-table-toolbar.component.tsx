import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Toolbar, Typography } from '@material-ui/core'
import SearchBox from '../../search-box/search-box.component'
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

type Props = {
  title: string
  placeholder: string
  handleSearchChange: (e) => void
}

export const EnhancedTableToolbar: React.FC<Props> = ({
  title,
  placeholder,
  handleSearchChange,
}) => {
  const classes = useStyles()

  return (
    <Toolbar className={classes.root}>
      <Typography className={classes.title} variant='h6' id='tableTitle' component='div'>
        {title}
      </Typography>
      <SearchBox onChange={handleSearchChange} placeholder={placeholder} />
    </Toolbar>
  )
}

export default EnhancedTableToolbar
