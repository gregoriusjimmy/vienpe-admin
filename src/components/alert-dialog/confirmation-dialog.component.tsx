import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '80%',
      maxHeight: 435,
    },
  })
)
type Props = {
  // classes: Record<'paper', string>
  title: string
  // value: string
  open: boolean
  content: any
  onClose: (value?: any) => void
  [otherProps: string]: any
}

const ConfirmationDialog: React.FC<Props> = ({ onClose, open, title, content, ...other }) => {
  const classes = useStyles()

  const handleCancel = () => {
    onClose(false)
  }

  const handleOk = () => {
    onClose(true)
  }

  return (
    <Dialog
      classes={{
        paper: classes.paper,
      }}
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth='xs'
      aria-labelledby='confirmation-dialog-title'
      open={open}
      {...other}
    >
      <DialogTitle id='confirmation-dialog-title'>{title}</DialogTitle>
      <DialogContent dividers>{`${content}`}</DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleOk} color='primary'>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
export default ConfirmationDialog
