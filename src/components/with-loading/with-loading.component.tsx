import React from 'react'

import CircularLoading from '../circular-loading/circular-loading.component'

type Props = {
  isLoading: boolean
}

const WithLoading = <T extends Props>(WrappedComponent: React.ComponentType<T>) => {
  const Spinner: React.FC<Props> = ({ isLoading, ...otherProps }) => {
    console.log(isLoading, otherProps)
    return isLoading ? <CircularLoading /> : <WrappedComponent {...(otherProps as T)} />
  }
  return Spinner
}
export default WithLoading
