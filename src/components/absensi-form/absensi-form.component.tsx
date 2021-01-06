import React, { useState } from 'react'
import { TextField, Grid, FormControlLabel, Checkbox, Box } from '@material-ui/core'
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
import CircularLoading from '../circular-loading/circular-loading.component'
import moment from 'moment'
import { KelasWithInstrukturType } from '../../redux/kelas/kelas.types'
import { addAbsensiMemberStartAsync } from '../../redux/absensi/absensi.actions'
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

type FORM_DATA = {
  id_member: string | number
  tgl_absensi: string
  kelas: string
  use_membership: boolean | string
}
type Props = {
  allMember: Array<MemberType> | null
  allKelasWithInstruktur: Array<KelasWithInstrukturType> | null
  allMembershipWithTipeMembership: Array<MembershipWithTipeMembershipType> | null
  addAbsensiMemberStartAsync: (absensiForm, successCallback: () => void) => void
}

const AbsensiForm: React.FC<Props> = ({
  allMember,
  allKelasWithInstruktur,
  allMembershipWithTipeMembership,
  addAbsensiMemberStartAsync,
}) => {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)

  const [selectedHari, setSelectedHari] = useState('')
  const [selectedKelas, setSelectedKelas] = useState<KelasWithInstrukturType>()
  const [
    selectedMembership,
    setSelectedMembership,
  ] = useState<MembershipWithTipeMembershipType | null>()
  const [useMembership, setUseMembership] = useState(true)

  const schema = yup.object().shape({
    id_member: yup.string().required(),
    tgl_absensi: yup.string().required(),
    kelas: yup.string().required(),
    use_membership: yup.boolean(),
  })

  const { register, errors, handleSubmit } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = (formValues) => {
    console.log(formValues)
  }

  const getSelectedMemberOptions = {
    options: allMember!,
  }
  const getSelectedKelasOptions = {
    options: allKelasWithInstruktur!.sort((a, b) => b.hari.localeCompare(a.hari)),
  }

  const getTodayDate = () => {
    return moment(new Date()).format('YYYY-MM-DD')
  }
  const handleChangeSelectedMember = (value: MemberType) => {
    setSelectedMember(value)
  }

  return (
    <FormCard title='Form Absen' withoutModal>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container justify='flex-end'>
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
                <TextField
                  {...params}
                  inputRef={register}
                  name='id_member'
                  label='ID Member'
                  margin='normal'
                  error={!!errors.id_member}
                  helperText={errors.id_member?.message}
                />
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
                <TextField {...params} name='nama_member' label='Nama Member' margin='normal' />
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
          <Grid item xs={2}>
            <Autocomplete
              options={['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU']}
              getOptionLabel={(option) => `${option}`}
              onChange={(e, value) => setSelectedHari(value)}
              id='hari-kelas'
              disableClearable
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
                <Box mt='25px' ml='10px'>
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
          {/* <Grid item xs={4}>
            <Autocomplete
              {...getNamaMemberOptions}
              id='hari'
              disableClearable
              onInputChange={findMemberId}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={register}
                  name='hari'
                  label='Hari'
                  margin='normal'
                  error={!!errors.nama_member}
                  helperText={errors.nama_member?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              {...getNamaMemberOptions}
              id='hari'
              disableClearable
              onInputChange={findMemberId}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={register}
                  name='hari'
                  label='Hari'
                  margin='normal'
                  error={!!errors.nama_member}
                  helperText={errors.nama_member?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              {...getNamaMemberOptions}
              id='hari'
              disableClearable
              onInputChange={findMemberId}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={register}
                  name='hari'
                  label='Hari'
                  margin='normal'
                  error={!!errors.nama_member}
                  helperText={errors.nama_member?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              inputRef={register}
              disabled
              name='tgl_selesai'
              type='date'
              value={tglSelesai}
              onChange={(e) => setTglSelesai(e.target.value)}
              InputLabelProps={{ shrink: true }}
              label='Instruktur'
              error={!!errors.tgl_selesai}
              helperText={errors.tgl_selesai?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  inputRef={register}
                  checked={statusMembership}
                  onChange={() => setStatusMembership(!statusMembership)}
                  name='status_membership'
                />
              }
              label='Status Membership'
              disabled
            />
          </Grid> */}

          <Grid container justify='flex-end'>
            <Grid item>
              <SubmitButton buttonType='add' />
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </FormCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  allMember: selectAllMember(state),
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
  addAbsensiMemberStartAsync: (absensiForm, successCallback) =>
    dispatch(addAbsensiMemberStartAsync(absensiForm, successCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AbsensiForm)
