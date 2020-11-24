import React, { useState } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import useStyles from './formDaftarMembership.styles'

const FormDaftarMembership: React.FC = () => {
  const { root, submitBtn } = useStyles()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target

    // setFormValues({ ...formValues, [name]: value })
    // console.log(formValues)
  }
  return (
    <FormCard title='Daftar Membership'>
      <form className={root} noValidate autoComplete='off' onSubmit={handleSubmit}>
        {/* <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              name='nama'
              id='nama'
              value={nama}
              fullWidth
              label='Nama'
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name='email'
              id='email'
              value={email}
              fullWidth
              label='Email'
              type='email'
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name='no_telp'
              id='no_telp'
              value={no_telp}
              label='No Telp'
              required
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name='tgl_lahir'
              id='tgl_lahir'
              value={tgl_lahir}
              label='Tanggal lahir'
              type='date'
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button className={submitBtn} type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Grid>
        </Grid> */}
      </form>
    </FormCard>
  )
}

export default FormDaftarMembership
