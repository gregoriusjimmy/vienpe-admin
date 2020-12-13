import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './form-card.styles'
type Props = {
  title: String
  children: JSX.Element
}
const FormCard: React.FC<Props> = ({ title, children }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography variant='h5' className={classes.title}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  )
}

export default FormCard
