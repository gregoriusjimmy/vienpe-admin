import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/login-page/loginPage.component'
import { connect } from 'react-redux'
import { GlobalStyle } from './global.styles'
import Layout from './components/containers/layout/layout.component'
type Props = {
  currentAdmin: {}
}

const App: React.FC<Props> = ({ currentAdmin }) => {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path='/login'
          name='Login Page'
          render={() => (currentAdmin ? <Redirect to='/' /> : <LoginPage />)}
        />
        <Route
          path='/'
          name='Home'
          render={() => (currentAdmin ? <Layout /> : <Redirect to='/login' />)}
        />
      </Switch>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
})
export default connect(mapStateToProps)(App)
