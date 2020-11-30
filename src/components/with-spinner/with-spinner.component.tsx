import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

const WithSpinner = (WrappedComponent) => {
  const Spinner = ({ isLoading, ...otherProps }) => {
    return isLoading ? <CircularProgress /> : <WrappedComponent {...otherProps} />
  }
  return Spinner
}
export default WithSpinner
