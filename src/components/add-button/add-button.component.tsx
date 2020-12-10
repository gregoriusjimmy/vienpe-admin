import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import AddIcon from '@material-ui/icons/Add'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: '#fff',
      backgroundColor: theme.palette.success.main,
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  })
)

type Props = {
  text: string
  handleClick: () => void
}

const AddButton: React.FC<Props> = ({ text, handleClick }) => {
  const classes = useStyles()
  return (
    <Button
      variant='contained'
      disableElevation
      className={classes.root}
      onClick={handleClick}
      startIcon={<AddIcon />}
    >
      {text}
    </Button>
  )
}

export default AddButton
