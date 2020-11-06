import styled from 'styled-components';
import { Box, TextField } from '@material-ui/core';
export const FormLoginContainer = styled(Box)`
  width: 40%;
  padding: 18px 30px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 200px;
  border: px solid #64b5f6;
  border-radius: 9px;
  text-align: center;
`;

export const LoginTitle = styled.h1`
  text-align: center;
`;

export const InputForm = styled(TextField)`
  margin: auto;
`;
