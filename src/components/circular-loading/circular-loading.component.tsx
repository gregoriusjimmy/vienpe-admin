import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Box } from '@material-ui/core'

const CircularLoading: React.FC = () => {
  return (
    <Box display='flex' width='100%' height='40vw' alignItems='center' justifyContent='center'>
      <CircularProgress />
    </Box>
  )
}

export default CircularLoading
