import React from 'react';
import Login from '../../components/login/login.component';
import useStyles from './loginPage.styles';
import { Box } from '@material-ui/core';
const LoginPage: React.FC = () => {
  const { root } = useStyles();
  return (
    <Box height='100%' className={root}>
      <Login />
    </Box>
  );
};

export default LoginPage;
