import React from 'react'
import { withRouter } from 'react-router'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import { default as DrawerMUI } from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'

import { Link } from 'react-router-dom'
import navigations from '../_nav'
import { useTheme } from '@material-ui/core/styles'
import useStyles from './drawer.styles'
import VienpePinkLogo from '../../../assets/vienpe-pink.svg'
import { Box } from '@material-ui/core'
type Props = {
  handleDrawerClose: () => void
  open: boolean
  location: {
    pathname: String
  }
}

const Drawer: React.FC<Props> = ({ handleDrawerClose, open, location }) => {
  const classes = useStyles()
  const theme = useTheme()

  const createElement = (nav, index) => {
    if (nav.tag === 'nav') {
      const currentNav = nav.to === location.pathname ? true : false
      return (
        <ListItem
          className={`${currentNav ? classes.currentNavColor : ''} ${classes.nav}`}
          button
          key={index}
          component={Link}
          to={nav.to}
        >
          <ListItemIcon>
            {React.createElement(nav.icon, {
              className: currentNav ? classes.currentNavColor : '',
            })}
          </ListItemIcon>
          <ListItemText primary={nav.name} />
        </ListItem>
      )
    }
    return <Divider key={index} className={classes.divider} />
  }
  return (
    <DrawerMUI
      className={classes.drawer}
      variant='persistent'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <Box marginRight='40px'>
          <img src={VienpePinkLogo} alt='vienpe' width='100px' />
        </Box>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />
      <List component='nav'>{navigations.map((nav, index) => createElement(nav, index))}</List>
    </DrawerMUI>
  )
}

export default withRouter(Drawer)
