import React, { useState } from 'react'

import { connect } from 'react-redux'
import { setCurrentAdmin } from '../../redux/admin/admin.actions'

import { Box, TextField, Button } from '@material-ui/core'
import useStyles from './login.styles'

interface Props {
  setCurrentAdmin: (admin: {}) => void
}

const Login: React.FC<Props> = ({ setCurrentAdmin }) => {
  const { formContainer, loginTitle } = useStyles()
  const [adminCredentials, setAdminCredentials] = useState({
    username: '',
    password: '',
  })
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentAdmin({ id: 123, name: 'admin' })
    console.log('done')
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target
    setAdminCredentials({ ...adminCredentials, [name]: value })
  }

  const { username, password } = adminCredentials
  return (
    <Box className={formContainer} boxShadow='2'>
      <h1 className={loginTitle}> Admin Login </h1>
      <Box mx='auto' width='80%' flexDirection='column' justifyContent='center'>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          <TextField
            margin='normal'
            name='username'
            id='username'
            label='Username'
            variant='standard'
            onChange={handleChange}
            value={username}
            fullWidth
          />

          <TextField
            margin='normal'
            name='password'
            id='password'
            label='Password'
            type='password'
            variant='standard'
            onChange={handleChange}
            value={password}
            fullWidth
          />
          <Box mt='34px'>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}
const mapDispatchToProps = (dispatch) => ({
  setCurrentAdmin: (admin) => dispatch(setCurrentAdmin(admin)),
})
export default connect(null, mapDispatchToProps)(Login)
