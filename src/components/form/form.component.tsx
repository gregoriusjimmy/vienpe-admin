import React from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& .MuiTextField-root': {
        margin: theme.spacing(1, 2, 1, 0),
        width: '100%',
      },
    },
  })
)

type Props = {
  onSubmit: (onSubmit) => void
  children: React.ReactNode
}

const Form: React.FC<Props> = ({ onSubmit, children }) => {
  const classes = useStyles()
  return (
    <form className={classes.root} noValidate autoComplete='off' onSubmit={onSubmit}>
      {children}
    </form>
  )
}

export default Form
