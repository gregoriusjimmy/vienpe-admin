import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import EditAttributesIcon from '@material-ui/icons/EditAttributes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#fff',
      backgroundColor: theme.palette.info.main,
      '&:hover': {
        backgroundColor: blue[700],
      },
    },
  })
)

type Props = {
  text: string
  handleClick: () => void
  [otherProps: string]: any
}

const UpdateButton: React.FC<Props> = ({ text, handleClick, ...otherProps }) => {
  const classes = useStyles()
  return (
    <Button
      {...otherProps}
      variant='contained'
      disableElevation
      className={classes.root}
      onClick={handleClick}
      startIcon={<EditAttributesIcon />}
    >
      {text}
    </Button>
  )
}

export default UpdateButton
