import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import LoginPage from './pages/login-page/login-page.component'
import { connect } from 'react-redux'
import { GlobalStyle } from './global.styles'
import Layout from './components/containers/layout/layout.component'
import { RootState } from './redux/root-reducer'
import ErrorBoundary from './components/error-boundary/error-boundary.component'
type Props = {
  currentAdmin: {}
}

const App: React.FC<Props> = ({ currentAdmin }) => {
  return (
    <div>
      <GlobalStyle />
      <ErrorBoundary>
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
      </ErrorBoundary>
    </div>
  )
}

const mapStateToProps = (state: RootState) => ({
  currentAdmin: state.admin.currentAdmin,
})
export default connect(mapStateToProps)(App)
