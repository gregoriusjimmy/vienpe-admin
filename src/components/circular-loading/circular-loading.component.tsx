import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Box } from '@material-ui/core'

type Props = {
  height?: string
}

const CircularLoading: React.FC<Props> = ({ height = '40vw' }) => {
  return (
    <Box display='flex' width='100%' height={height} alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Box>
  )
}

export default CircularLoading
