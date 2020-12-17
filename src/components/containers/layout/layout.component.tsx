import React, { useEffect, useState } from 'react'
import AppBar from '../appbar/appbar.component'
import Drawer from '../drawer/drawer.component'
import clsx from 'clsx'
import CssBaseline from '@material-ui/core/CssBaseline'
import Content from '../content/content.component'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import useStyles from './layout.styles'
import { RootState } from '../../../redux/root-reducer'
import { selectNotification } from '../../../redux/notification/notification.selectors'
import { connect } from 'react-redux'
import { NotificationState } from '../../../redux/notification/notification.types'

type Props = {
  notifications: NotificationState
}

const Layout: React.FC<Props> = ({ notifications }) => {
  const classes = useStyles()
  const [openNotif, setOpenNotif] = useState(false)
  const [notif, setNotif] = useState({ message: '', type: '' })

  useEffect(() => {
    if (notifications.success) {
      setNotif({ message: notifications.success, type: 'success' })
      setOpenNotif(true)
    }
    if (notifications.error) {
      setNotif({ message: notifications.error, type: 'error' })
      setOpenNotif(true)
    }
  }, [notifications])

  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleNotifClose = () => {
    setNotif({ message: '', type: '' })
    setOpenNotif(false)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar handleDrawerOpen={handleDrawerOpen} open={open} />
      <Drawer handleDrawerClose={handleDrawerClose} open={open} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Content />
      </main>
      {notif.message ? (
        <Snackbar open={openNotif} autoHideDuration={6000} onClose={handleNotifClose}>
          <MuiAlert
            onClose={handleNotifClose}
            severity={notif.type === 'success' ? 'success' : 'error'}
          >
            {`${notif.type === 'success' ? 'Berhasil' : 'Gagal'} ${notif.message}`}
          </MuiAlert>
        </Snackbar>
      ) : null}
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  notifications: selectNotification(state),
})

export default connect(mapStateToProps)(Layout)
