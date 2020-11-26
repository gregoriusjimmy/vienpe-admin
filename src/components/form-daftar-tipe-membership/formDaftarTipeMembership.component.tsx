import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import useStyles from './formDaftarTipeMembership.styles'
import { fetchAdd } from '../../fetch/fetch'

const INITIAL_FORM = { tipe: '', keterangan: '' }

const FormDaftarTipeMembership: React.FC = () => {
  const { root, submitBtn } = useStyles()
  const [formValues, setFormValues] = useState(INITIAL_FORM)

  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_TIPEMEMBERSHIP_URL!)
    if (response.status === 400) {
      alert('Failed to fetch')
      return
    }
    const data: Array<{ tipe: String; keterangan: String }> = await response.json()
    const ALPHABHET = 'ABCDEFGHIJKLMNOPQRSTYVWXYZ'
    const nextAvailableTipe = ALPHABHET.charAt(data.length)
    setFormValues({ tipe: nextAvailableTipe, keterangan: '' })
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isSucces = await fetchAdd(process.env.REACT_APP_TIPEMEMBERSHIP_URL, formValues)
    if (isSucces) fetchData()
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const { tipe, keterangan } = formValues
  return (
    <FormCard title='Daftar Tipe Membership'>
      <form className={root} noValidate autoComplete='off' onSubmit={handleSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <TextField name='tipe' id='tipe' value={tipe} fullWidth label='tipe' disabled />
          </Grid>
          <Grid item xs={10}>
            <TextField
              name='keterangan'
              id='keterangan'
              value={keterangan}
              fullWidth
              label='keterangan'
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

export default FormDaftarTipeMembership
