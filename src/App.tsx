import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/login/login.pages';
import HomePage from './pages/hompage/homepage.components';
import { connect } from 'react-redux';

interface props {
  currentAdmin: {};
}

const App: React.FC<props> = ({ currentAdmin }) => {
  return (
    <div className='App'>
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
          render={() => (currentAdmin ? <HomePage /> : <LoginPage />)}
        />
      </Switch>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currentAdmin: state.admin.currentAdmin,
});
export default connect(mapStateToProps)(App);
