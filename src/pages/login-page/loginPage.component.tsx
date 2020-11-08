import React from 'react';
import Login from '../../components/login/login.component';
import { LoginPageContainer } from './loginPage.styles';

const LoginPage: React.FC = () => {
  return (
    <LoginPageContainer>
      <Login />
    </LoginPageContainer>
  );
};

export default LoginPage;
