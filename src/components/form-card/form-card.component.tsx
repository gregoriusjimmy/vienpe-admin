import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import useStyles from './form-card.styles'
type Props = {
  title: String
  children: JSX.Element
}
const FormCard: React.FC<Props> = ({ title, children }) => {
  const { content } = useStyles()
  return (
    <Card>
      <CardContent className={content}>
        <Typography variant='h5'>{title}</Typography>
        {children}
      </CardContent>
    </Card>
  )
}

export default FormCard
