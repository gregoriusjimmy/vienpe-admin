import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/login/loginPage.component';
import HomePage from './pages/hompage/homepage.components';
import { connect } from 'react-redux';
import { GlobalStyle } from './global.styles';

interface props {
  currentAdmin: {};
}

const App: React.FC<props> = ({ currentAdmin }) => {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route
          exact
          path='/'
          render={() =>
            currentAdmin ? <HomePage /> : <Redirect to='/login' />
          }
        />
        <Route
          exact
          path='/login'
          render={() => (currentAdmin ? <Redirect to='/' /> : <LoginPage />)}
        />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});
export default connect(mapStateToProps)(App);
