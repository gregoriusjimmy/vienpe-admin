import React from 'react'
import { connect } from 'react-redux'
import { setCurrentAdmin } from '../../../redux/admin/admin.actions'
import useStyles from './appbar.styles'
import clsx from 'clsx'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { default as AppBarMUI } from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Clock from 'react-live-clock'
import { Typography } from '@material-ui/core'

type Props = {
  handleDrawerOpen: () => void
  setCurrentAdmin: (admin: null) => void
  open: boolean
}

const AppBar: React.FC<Props> = ({ handleDrawerOpen, setCurrentAdmin, open }) => {
  const { appBar, appBarShift, menuButton, logoutButton, hide } = useStyles()

  const handleLogout = () => {
    setCurrentAdmin(null)
  }

  return (
    <AppBarMUI
      position='fixed'
      className={clsx(appBar, {
        [appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          className={clsx(menuButton, open && hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography>
          <Clock format={'DD MMMM,\xa0 h:mm '} ticking={true} interval={60000} />
        </Typography>
        <Button className={logoutButton} onClick={handleLogout} color='inherit'>
          Logout
        </Button>
      </Toolbar>
    </AppBarMUI>
  )
}

const mapDispatchToProps = (dispatch) => ({
  setCurrentAdmin: (admin) => dispatch(setCurrentAdmin(admin)),
})
export default connect(null, mapDispatchToProps)(AppBar)
