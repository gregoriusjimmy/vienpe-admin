import React from 'react'
import Login from '../../components/login/login.component'
import useStyles from './login-page.styles'

import VienpeWhite from '../../assets/vienpe-white.svg'
const LoginPage: React.FC = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <div className={classes.backgroundSpan}></div>
      <img src={VienpeWhite} alt='vienpe' />
      <Login />
    </div>
  )
}



export default LoginPage
