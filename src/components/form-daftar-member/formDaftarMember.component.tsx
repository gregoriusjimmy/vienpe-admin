import React from 'react'
import { TextField, Button, Grid } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import useStyles from './formDaftarMember.styles'
import { fetchAdd } from '../../fetch/fetch'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { RootState } from '../../redux/root-reducer'
import { addMember } from '../../redux/member/member.actions'
import { MemberType } from '../../redux/member/member.types'

type FORM_DATA = {
  nama: ''
  email: '' | undefined
  no_telp: ''
  tgl_lahir: '' | undefined
}

type Props = {
  addMember: (member) => void
}

const FormDaftarMember: React.FC<Props> = ({ addMember }) => {
  const { root, submitBtn } = useStyles()

  const schema = yup.object().shape({
    nama: yup.string().required(),
    email: yup.string().email().nullable().default(undefined),
    no_telp: yup.string().required().max(14).min(10),
    tgl_lahir: yup.string().nullable().default(undefined),
  })

  const { register, errors, handleSubmit, reset } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues) => {
    console.log(formValues)

    if (!formValues.email) formValues.email = null
    if (!formValues.tgl_lahir) formValues.tgl_lahir = null
    const isSuccess = await fetchAdd(process.env.REACT_APP_MEMBER_URL, formValues)
    if (isSuccess) {
      const { nama, no_telp, email, tgl_lahir, status_membership } = formValues
      reset()
      addMember({
        nama,
        no_telp,
        email,
        tgl_lahir,
        status_membership: 'false',
      })
    }
  }

  return (
    <FormCard title='Daftar Member'>
      <form className={root} noValidate autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              inputRef={register}
              error={!!errors.nama}
              name='nama'
              fullWidth
              label='Nama'
              helperText={errors.nama?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              inputRef={register}
              error={!!errors.email}
              name='email'
              fullWidth
              label='Email'
              type='email'
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              error={!!errors.no_telp}
              name='no_telp'
              label='No Telp'
              helperText={errors.no_telp?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputRef={register}
              error={!!errors.tgl_lahir}
              name='tgl_lahir'
              label='Tanggal lahir'
              type='date'
              InputLabelProps={{ shrink: true }}
              helperText={errors.tgl_lahir?.message}
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

const mapDispatchToProps = (dispatch) => ({
  addMember: (member) => dispatch(addMember(member)),
})
export default connect(null, mapDispatchToProps)(FormDaftarMember)
