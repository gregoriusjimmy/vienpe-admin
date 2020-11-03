import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';
import { setCurrentAdmin } from '../../redux/admin/admin.actions';

const Login: React.FC = () => {
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(adminCredentials);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log('Fire');
    const { value, name } = e.target;
    setAdminCredentials({ ...adminCredentials, [name]: value });
    console.log(adminCredentials);
  };
  const { username, password } = adminCredentials;
  return (
    <Container maxWidth='sm'>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          name='username'
          id='username'
          label='Username'
          variant='filled'
          onChange={handleChange}
          value={username}
        />
        <TextField
          name='password'
          id='password'
          label='Password'
          type='password'
          variant='filled'
          onChange={handleChange}
          value={password}
        />
      </form>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => ({
  setCurrentAdmin: (admin) => dispatch(setCurrentAdmin(admin)),
});
export default connect(null, mapDispatchToProps)(Login);
