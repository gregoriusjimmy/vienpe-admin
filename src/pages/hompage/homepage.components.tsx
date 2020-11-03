import React from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';

const HomePage: React.FC = () => {
  return (
    <div>
      <TextField id='username' label='Username' variant='filled' />
    </div>
  );
};

export default HomePage;
