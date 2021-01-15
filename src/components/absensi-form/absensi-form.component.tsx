import React, { useState } from 'react'
import { TextField, Grid, FormControlLabel, Checkbox, Box, Switch } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormCard from '../form-card/form-card.component'
import { connect } from 'react-redux'
import { selectAllMember } from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MemberType } from '../../redux/member/member.types'
import SubmitButton from '../submit-button/submit-button.component'
import moment from 'moment'
import { KelasWithInstrukturType } from '../../redux/kelas/kelas.types'
import { selectAllKelas } from '../../redux/kelas/kelas.selectors'
import { selectAllInstruktur } from '../../redux/instruktur/instruktur.selectors'
import { MembershipWithTipeMembershipType } from '../../redux/membership/membership.types'
import {
  combineAllKelasWithInstruktur,
  combineAllMembershipWithTipeMembership,
} from '../../utils/utils'
import { selectAllMembership } from '../../redux/membership/membership.selectors'
import { selectAllTipeMembership } from '../../redux/tipe-membership/tipe-membership.selectors'
import Form from '../form/form.component'
import { InstrukturType } from '../../redux/instruktur/instruktur.types'
import { addAbsensiMemberStartAsync } from '../../redux/absensi-member/absensi-member.actions'
import { addAbsensiInstrukturStartAsync } from '../../redux/absensi-instruktur/absensi-instruktur.actions'
import theme from '../../theme'

type FORM_DATA = {
  tgl_absensi: string
  kelas: string
}
type Props = {
  allMember: Array<MemberType> | null
  allInstruktur: Array<InstrukturType> | null
  allKelasWithInstruktur: Array<KelasWithInstrukturType> | null
  allMembershipWithTipeMembership: Array<MembershipWithTipeMembershipType> | null
  addAbsensiMemberStartAsync: (absensiForm, useMembership: boolean) => void
  addAbsensiInstrukturStartAsync: (absensiForm) => void
}

const AbsensiForm: React.FC<Props> = ({
  allMember,
  allInstruktur,
  allKelasWithInstruktur,
  allMembershipWithTipeMembership,
  addAbsensiMemberStartAsync,
  addAbsensiInstrukturStartAsync,
}) => {
  const [isFormInstruktur, setIsFormInstruktur] = useState<boolean>(false)
  const [selectedInstruktur, setSelectedInstruktur] = useState<InstrukturType | null>(null)
  const [selectedId, setSelectedId] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)
  const [selectedHari, setSelectedHari] = useState<string | null>(null)
  const [selectedKelas, setSelectedKelas] = useState<KelasWithInstrukturType | null>(null)
  const [
    selectedMembership,
    setSelectedMembership,
  ] = useState<MembershipWithTipeMembershipType | null>()
  const [useMembership, setUseMembership] = useState(false)

  const schema = yup.object().shape({
    tgl_absensi: yup.string().required(),
    kelas: yup.string().required(),
    use_membership: yup.boolean(),
  })

  const { register, errors, handleSubmit, reset } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (formValues) => {
    delete formValues['kelas']
    delete formValues['is_form_instruktur']
    if (!selectedId) return alert('instruktur atau member belum dipilih')
    else if (isFormInstruktur) formValues.id_instruktur = selectedId
    else formValues.id_member = selectedId
    formValues.id_kelas = selectedKelas?.id
    if (useMembership && selectedMembership) {
      formValues.id_membership = selectedMembership.id
    }
    if (isFormInstruktur && selectedInstruktur) addAbsensiInstrukturStartAsync(formValues)
    else addAbsensiMemberStartAsync(formValues, useMembership)

    // clear state after submit
    reset()
    resetState()
  }

  const getSelectedMemberOptions = {
    options: allMember!,
  }
  const getSelectedInstrukturOptions = {
    options: allInstruktur!,
  }
  const getSelectedKelasOptions = {
    options: allKelasWithInstruktur!.sort((a, b) => b.hari.localeCompare(a.hari)),
  }

  const getTodayDate = () => {
    return moment(new Date()).format('YYYY-MM-DD')
  }
  const handleChangeSelectedMember = (value: MemberType) => {
    setSelectedMember(value)
    if (selectedMember?.status_membership === true) setUseMembership(true)
    setSelectedId(value.id)
  }
  const handleChangeSelectedInstruktur = (value: InstrukturType) => {
    setSelectedInstruktur(value)
    setSelectedId(value.id)
  }
  const resetState = () => {
    setSelectedMember(null)
    setSelectedMembership(null)
    setSelectedHari(null)
    setSelectedKelas(null)
    setSelectedId('')
    setSelectedInstruktur(null)
  }
  const handleSwitchForm = () => {
    resetState()
    setIsFormInstruktur(!isFormInstruktur)
  }
  return (
    <Box mx={theme.spacing(0.5)} my={theme.spacing(1)}>
      <FormCard title='Form Absen' withoutModal>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify='space-between'>
                <Box mt='20px'>
                  <Grid item xs={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={isFormInstruktur}
                          onChange={handleSwitchForm}
                          color='primary'
                          name='is_form_instruktur'
                        />
                      }
                      label='Instruktur?'
                    />
                  </Grid>
                </Box>
                <Grid item xs={2}>
                  <TextField
                    inputRef={register}
                    name='tgl_absensi'
                    label='Tanggal absen'
                    type='date'
                    defaultValue={getTodayDate()}
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.tgl_absensi}
                    helperText={errors.tgl_absensi?.message}
                  />
                </Grid>
              </Grid>
            </Grid>
            {isFormInstruktur ? (
              <React.Fragment>
                <Grid item xs={2}>
                  <Autocomplete
                    {...getSelectedInstrukturOptions}
                    getOptionLabel={(option) => `${option.id}`}
                    getOptionSelected={(option, value) => option.id === value.id}
                    id='id-instruktur'
                    disableClearable
                    value={selectedInstruktur!}
                    onChange={(e: any, value: InstrukturType) =>
                      handleChangeSelectedInstruktur(value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='id_instruktur'
                        label='ID Instruktur'
                        margin='normal'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Autocomplete
                    {...getSelectedInstrukturOptions}
                    getOptionLabel={(option) => option.nama}
                    getOptionSelected={(option, value) => option.id === value.id}
                    id='nama-instruktur'
                    disableClearable
                    value={selectedInstruktur!}
                    onChange={(e: any, value: InstrukturType) =>
                      handleChangeSelectedInstruktur(value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='nama_instruktur'
                        label='Nama Instruktur'
                        margin='normal'
                      />
                    )}
                  />
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Grid item xs={2}>
                  <Autocomplete
                    {...getSelectedMemberOptions}
                    getOptionLabel={(option) => `${option.id}`}
                    getOptionSelected={(option, value) => option.id === value.id}
                    id='id-member'
                    disableClearable
                    value={selectedMember!}
                    onChange={(e: any, value: MemberType) => handleChangeSelectedMember(value)}
                    renderInput={(params) => (
                      <TextField {...params} name='id_member' label='ID Member' margin='normal' />
                    )}
                  />
                </Grid>
                <Grid item xs={7}>
                  <Autocomplete
                    {...getSelectedMemberOptions}
                    getOptionLabel={(option) => option.nama}
                    getOptionSelected={(option, value) => option.id === value.id}
                    id='nama-member'
                    disableClearable
                    value={selectedMember!}
                    onChange={(e: any, value: MemberType) => handleChangeSelectedMember(value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='nama_member'
                        label='Nama Member'
                        margin='normal'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Box mt='25px' ml='10px'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedMember?.status_membership === 'true'}
                          disabled
                          name='status_membership'
                        />
                      }
                      label='Status Membership'
                      disabled
                    />
                  </Box>
                </Grid>
              </React.Fragment>
            )}
            <Grid item xs={2}>
              <Autocomplete
                options={['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU']}
                getOptionLabel={(option) => (option ? `${option}` : '')}
                onChange={(e, value) => setSelectedHari(value)}
                id='hari-kelas'
                disableClearable
                value={selectedHari!}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name='hari'
                    label='Hari'
                    margin='normal'
                    variant='outlined'
                  />
                )}
              />
            </Grid>
            <Grid item xs={9}>
              <Autocomplete
                {...getSelectedKelasOptions}
                getOptionLabel={(option) =>
                  `Pukul  ${option.jam} \t ${option.kategori_senam} \t Instruktur ${option.nama_instruktur} `
                }
                onChange={(e, value) => setSelectedKelas(value)}
                filterOptions={(options) =>
                  options.filter((option) => option.aktif === true && option.hari === selectedHari)
                }
                value={selectedKelas!}
                filterSelectedOptions
                id='kelas'
                disableClearable
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={register}
                    name='kelas'
                    label='Kelas'
                    margin='normal'
                    variant='outlined'
                    error={!!errors.kelas}
                    helperText={errors.kelas?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                value={selectedKelas ? `${selectedKelas.id}` : ''}
                name='id_kelas'
                label='ID Kelas'
                margin='normal'
                variant='outlined'
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>
            {selectedMember?.status_membership === 'true' && (
              <React.Fragment>
                <Grid item xs={9}>
                  <Autocomplete
                    options={allMembershipWithTipeMembership!}
                    getOptionLabel={(option) =>
                      `Tipe: ${option.tipe_membership} ${option.keterangan} \t Periode: ${option.tgl_mulai} - ${option.tgl_selesai} \t Sisa point: ${option.sisa_point}`
                    }
                    onChange={(e, value) => setSelectedMembership(value)}
                    filterOptions={(options) =>
                      options.filter((option) => option.id_member === selectedMember.id)
                    }
                    disabled={!useMembership}
                    filterSelectedOptions
                    id='membership'
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        name='membership'
                        label='Membership'
                        margin='normal'
                        variant='outlined'
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Box mt='10px' ml='10px'>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={useMembership}
                          onChange={() => setUseMembership(!useMembership)}
                          name='use_membership'
                        />
                      }
                      label='Pakai Membership'
                    />
                  </Box>
                </Grid>
              </React.Fragment>
            )}
            <Grid container justify='flex-end'>
              <Grid item>
                <SubmitButton buttonType='add' />
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </FormCard>
    </Box>
  )
}

const mapStateToProps = (state: RootState) => ({
  allMember: selectAllMember(state),
  allInstruktur: selectAllInstruktur(state),
  allKelasWithInstruktur: combineAllKelasWithInstruktur(
    selectAllKelas(state)!,
    selectAllInstruktur(state)!
  ),
  allMembershipWithTipeMembership: combineAllMembershipWithTipeMembership(
    selectAllMembership(state)!,
    selectAllTipeMembership(state)!
  ),
})

const mapDispatchToProps = (dispatch) => ({
  addAbsensiInstrukturStartAsync: (absensiForm) =>
    dispatch(addAbsensiInstrukturStartAsync(absensiForm)),
  addAbsensiMemberStartAsync: (absensiForm, useMembership) =>
    dispatch(addAbsensiMemberStartAsync(absensiForm, useMembership)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AbsensiForm)
