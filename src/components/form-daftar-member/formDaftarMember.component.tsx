import React, { useState } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import useStyles from './formDaftarMember.styles'
import { fetchAdd } from '../../fetch/fetch'

const INITIAL_FORM = { nama: '', email: '' || undefined, no_telp: '', tgl_lahir: '' || undefined }

const FormDaftarMember: React.FC = () => {
  const { root, submitBtn } = useStyles()
  const [formValues, setFormValues] = useState(INITIAL_FORM)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!formValues.tgl_lahir) setFormValues({ ...formValues, tgl_lahir: undefined })
    const isSucces = await fetchAdd(process.env.REACT_APP_MEMBER_URL, formValues)
    if (isSucces) setFormValues(INITIAL_FORM)
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const { nama, email, no_telp, tgl_lahir } = formValues
  return (
    <FormCard title='Daftar Member'>
      <form className={root} noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container spacing={1}>
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
              value={email || ''}
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
              value={tgl_lahir || ''}
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
        </Grid>
      </form>
    </FormCard>
  )
}

export default FormDaftarMember
