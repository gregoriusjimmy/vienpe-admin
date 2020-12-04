import React from 'react'
import ModalMUI from '@material-ui/core/Modal'
import { Fade, Backdrop, Box } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      outline: 0,
      boxShadow: theme.shadows[5],
      width: '30%',
    },
  })
)

type Props = {
  open: boolean
  handleClose: () => any
  ariaLabel: string
  children: React.ReactElement
}

const Modal: React.FC<Props> = ({ children, open, handleClose, ariaLabel }) => {
  const classes = useStyles()
  return (
    <ModalMUI
      className={classes.modal}
      open={open}
      onClose={handleClose}
      aria-labelledby={ariaLabel}
      aria-describedby={ariaLabel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box className={classes.paper}>{children}</Box>
      </Fade>
    </ModalMUI>
  )
}

export default Modal
