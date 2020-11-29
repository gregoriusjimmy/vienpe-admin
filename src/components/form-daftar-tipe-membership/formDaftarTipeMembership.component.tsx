import React, { useState, useEffect } from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import useStyles from './formDaftarTipeMembership.styles'
import { fetchAdd } from '../../fetch/fetch'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { connect } from 'react-redux'

import { createStructuredSelector } from 'reselect'
import { selectAllTipeMembership } from '../../redux/tipe-membership/tipe-membership.selectors'

type FORM_DATA = {
  tipe: ''
  keterangan: ''
}

type Props = {
  allTipeMembership: []
}

const FormDaftarTipeMembership: React.FC<Props> = ({ allTipeMembership }) => {
  const { root, submitBtn } = useStyles()
  const [nextAvailableTipe, setNextAvailableTipe] = useState('')
  const schema = yup.object().shape({
    tipe: yup.string().required(),
    keterangan: yup.string().required(),
  })

  const { register, errors, handleSubmit, reset } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    const ALPHABHET = 'ABCDEFGHIJKLMNOPQRSTYVWXYZ'
    console.log(allTipeMembership)
    // const nextAvailableTipe = ALPHABHET.charAt(allTipeMembership.length)
    // setNextAvailableTipe(nextAvailableTipe)
  }, [])

  const onSubmit = async (formValues) => {
    const isSuccess = await fetchAdd(process.env.REACT_APP_TIPEMEMBERSHIP_URL, formValues)
  }

  return (
    <FormCard title='Daftar Tipe Membership'>
      <form className={root} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={2}>
            <TextField
              inputRef={register}
              name='tipe'
              value={nextAvailableTipe}
              fullWidth
              label='tipe'
              disabled
            />
          </Grid>
          <Grid item xs={10}>
            <TextField
              inputRef={register}
              error={!!errors.keterangan}
              name='keterangan'
              fullWidth
              label='keterangan'
              helperText={errors.keterangan?.message}
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
const mapStateToProps = createStructuredSelector({
  allTipeMembership: selectAllTipeMembership,
})

export default connect(mapStateToProps)(FormDaftarTipeMembership)
