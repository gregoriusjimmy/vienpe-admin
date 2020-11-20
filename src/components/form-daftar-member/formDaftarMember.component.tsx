import React from 'react';
import { Box, Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core';
import useStyles from './formDaftarMember.styles';
const FormDaftarMember: React.FC = () => {
  const { root, submitBtn } = useStyles();
  return (
    <Card>
      <CardHeader title='Daftar Member'></CardHeader>
      <CardContent>
        <form className={root} noValidate autoComplete='off'>
          <TextField id='nama' label='Nama' fullWidth required />
          <TextField id='no_telp' label='No Telp' required />
          <TextField id='email' label='Email' type='email' />
          <TextField id='tgl_lahir' label='Tanggal lahir' type='date' InputLabelProps={{ shrink: true }} />
          <Button className={submitBtn} type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormDaftarMember;
