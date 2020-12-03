import { Fade, Backdrop } from '@material-ui/core'
import ModalMUI from '@material-ui/core/Modal'
import React from 'react'

const Modal = ({ body, open, fadeIn, handleClose }) => {
  return (
    <ModalMUI
      open={open}
      onClose={handleClose}
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={fadeIn}>{body}</Fade>
    </ModalMUI>
  )
}

export default Modal
