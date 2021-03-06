import React, { useState } from 'react'
import { TextField, Grid, MenuItem } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { connect } from 'react-redux'
import SubmitButton from '../submit-button/submit-button.component'
import { RootState } from '../../redux/root-reducer'
import CircularLoading from '../circular-loading/circular-loading.component'
import { addKelasStartAsync } from '../../redux/kelas/kelas.actions'
import { selectIsKelasFetching } from '../../redux/kelas/kelas.selectors'
import { selectAllInstruktur } from '../../redux/instruktur/instruktur.selectors'
import { InstrukturType } from '../../redux/instruktur/instruktur.types'
import { Autocomplete } from '@material-ui/lab'
import ReactHookFormSelect from '../react-hook-form-select/react-hook-form-select.component'
import moment from 'moment'
import Form from '../form/form.component'

type FORM_DATA = {
  hari: 'SENIN' | 'SELASA' | 'RABU' | 'KAMIS' | 'JUMAT' | 'SABTU' | 'MINGGU'
  jam: any
  aktif: boolean
  kategori_senam: string
  nama_instruktur: string
}

type Props = {
  allInstruktur: Array<InstrukturType> | null
  isFetching: boolean
  addKelasStartAsync: (kelasForm, successCallback: () => void) => void
  handleModalClose: () => void
}
const KelasForm: React.FC<Props> = ({
  allInstruktur,
  isFetching,
  addKelasStartAsync,
  handleModalClose,
}) => {
  const [selectedInstruktur, setSelectedInstruktur] = useState<InstrukturType>()

  const HARI = ['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU']
  const KATEGORI_SENAM = ['Aerobik', 'Goyang Dumang', 'Break Dance']

  const schema = yup.object().shape({
    hari: yup.string().required(),
    jam: yup.string().required(),
    kategori_senam: yup.string().required(),
    nama_instruktur: yup.string().required(),
  })

  const { register, errors, handleSubmit, control } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues) => {
    if (!selectedInstruktur) return alert('please select instruktur')
    formValues.id_instruktur = selectedInstruktur.id
    formValues.created_at = moment(new Date()).format('DD-MM-YYYY')
    addKelasStartAsync(formValues, handleModalClose)
  }

  const getInstrukturOptions = {
    options: allInstruktur!,
    getOptionLabel: (option: InstrukturType) => option.nama,
  }

  return (
    <FormCard title='Daftar Kelas'>
      {isFetching ? (
        <CircularLoading height={'200px'} />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Autocomplete
                {...getInstrukturOptions}
                id='nama-instruktur'
                disableClearable
                onChange={(e, value) => setSelectedInstruktur(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={register}
                    name='nama_instruktur'
                    label='Nama instruktur'
                    margin='normal'
                    error={!!errors.nama_instruktur}
                    helperText={errors.nama_instruktur?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={selectedInstruktur ? `${selectedInstruktur.id}` : ''}
                disabled
                margin='normal'
                name='id_instruktur'
                label='ID'
              />
            </Grid>
            <Grid item xs={6}>
              <ReactHookFormSelect
                name='hari'
                label='Hari'
                defaultValue=''
                control={control}
                error={!!errors.hari}
                helperText={errors.hari?.message}
                style={{ marginTop: '8px' }}
                fullWidth
              >
                {HARI.map((hari, idx) => (
                  <MenuItem key={idx} value={hari}>
                    {hari}
                  </MenuItem>
                ))}
              </ReactHookFormSelect>
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                name='jam'
                type='time'
                InputLabelProps={{ shrink: true }}
                label='Jam mulai'
                error={!!errors.jam}
                helperText={errors.jam?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <ReactHookFormSelect
                name='kategori_senam'
                label='Kategori'
                defaultValue=''
                control={control}
                error={!!errors.kategori_senam}
                helperText={errors.kategori_senam?.message}
                style={{ marginTop: '8px' }}
                fullWidth
              >
                {KATEGORI_SENAM.map((senam, idx) => (
                  <MenuItem key={idx} value={senam}>
                    {senam}
                  </MenuItem>
                ))}
              </ReactHookFormSelect>
            </Grid>

            <Grid container justify='flex-end'>
              <Grid item>
                <SubmitButton buttonType='add' />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </FormCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  allInstruktur: selectAllInstruktur(state),
  isFetching: selectIsKelasFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  addKelasStartAsync: (kelasForm, successCallback) =>
    dispatch(addKelasStartAsync(kelasForm, successCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(KelasForm)
