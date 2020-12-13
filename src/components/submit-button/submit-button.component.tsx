import React from 'react'
import { Button } from '@material-ui/core'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { green, teal } from '@material-ui/core/colors'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minWidth: '100px',
      margin: theme.spacing(2, 0),
    },
    add: {
      color: 'white',
      backgroundColor: green[500],
      '&:hover': { backgroundColor: green[700] },
    },
    edit: {
      color: 'white',
      backgroundColor: teal[500],
      '&:hover': { backgroundColor: teal[700] },
    },
  })
)

type Props = {
  buttonType: 'add' | 'edit'
}

const SubmitButton: React.FC<Props> = ({ buttonType }) => {
  const classes = useStyles()
  return (
    <div>
      <Button
        className={`${classes.root} ${classes[buttonType]}`}
        type='submit'
        variant='contained'
      >
        {buttonType === 'add' ? 'Submit' : 'Update'}
      </Button>
    </div>
  )
}

export default SubmitButton
