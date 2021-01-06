import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { connect } from 'react-redux'
import SubmitButton from '../submit-button/submit-button.component'
import { RootState } from '../../redux/root-reducer'
import CircularLoading from '../circular-loading/circular-loading.component'
import {
  addInstrukturStartAsync,
  updateInstrukturStartAsync,
} from '../../redux/instruktur/instruktur.actions'
import { selectIsInstrukturFetching } from '../../redux/instruktur/instruktur.selectors'
import { InstrukturType } from '../../redux/instruktur/instruktur.types'
import moment from 'moment'
import Form from '../form/form.component'

type FORM_DATA = {
  nama: ''
  email: '' | undefined
  no_telp: ''
  tgl_lahir: '' | undefined
}

type Props = {
  addInstrukturStartAsync: (instruktur: FORM_DATA, successCallback?) => Promise<any>
  updateInstrukturStartAsync: (instruktur?, successCallback?) => Promise<any>
  handleModalClose: () => void
  isFetching: boolean
  edit?: true
  selectedInstruktur?: InstrukturType | null
}

const InstrukturForm: React.FC<Props> = ({
  addInstrukturStartAsync,
  updateInstrukturStartAsync,
  handleModalClose,
  isFetching,
  edit,
  selectedInstruktur,
}) => {
  const schema = yup.object().shape({
    nama: yup.string().required(),
    email: yup.string().email().nullable().default(undefined),
    no_telp: yup.string().required().max(14).min(10),
    tgl_lahir: yup.string().nullable().default(undefined),
  })

  const { register, errors, handleSubmit } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues) => {
    if (!formValues.email) formValues.email = null
    if (!formValues.tgl_lahir) formValues.tgl_lahir = null
    else formValues.tgl_lahir = moment(formValues.tgl_lahir).format('DD-MM-YYYY')
    if (edit) {
      updateInstrukturStartAsync({ id: selectedInstruktur!.id, ...formValues }, handleModalClose)
    } else {
      addInstrukturStartAsync(formValues, handleModalClose)
    }
  }

  return (
    <FormCard title={`${edit ? 'Update' : 'Daftar'} Instruktur`}>
      {isFetching ? (
        <CircularLoading height={'200px'} />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={edit ? 10 : 12}>
              <TextField
                inputRef={register}
                error={!!errors.nama}
                defaultValue={selectedInstruktur?.nama}
                name='nama'
                fullWidth
                label='Nama'
                helperText={errors.nama?.message}
              />
            </Grid>
            {edit && (
              <Grid item xs={2}>
                <TextField value={selectedInstruktur?.id} disabled name='id' label='ID' />
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                error={!!errors.email}
                defaultValue={selectedInstruktur?.email}
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
                defaultValue={selectedInstruktur?.no_telp}
                name='no_telp'
                label='No Telp'
                helperText={errors.no_telp?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                error={!!errors.tgl_lahir}
                defaultValue={selectedInstruktur?.tgl_lahir}
                name='tgl_lahir'
                label='Tanggal lahir'
                type='date'
                InputLabelProps={{ shrink: true }}
                helperText={errors.tgl_lahir?.message}
              />
            </Grid>
            <Grid container justify='flex-end'>
              <Grid item>
                <SubmitButton buttonType={edit ? 'edit' : 'add'} />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </FormCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  isFetching: selectIsInstrukturFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  addInstrukturStartAsync: (instruktur, successCallback?) =>
    dispatch(addInstrukturStartAsync(instruktur, successCallback)),
  updateInstrukturStartAsync: (instruktur, successCallback?) =>
    dispatch(updateInstrukturStartAsync(instruktur, successCallback)),
})
export default connect(mapStateToProps, mapDispatchToProps)(InstrukturForm)
