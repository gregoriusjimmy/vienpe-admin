import React, { useState } from 'react'
import { TextField, Grid, MenuItem, FormControlLabel, Checkbox } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormCard from '../form-card/form-card.component'
import useStyles from './absensi-form.styles'
import { connect } from 'react-redux'
import {
  selectAllMember,
  selectAllMemberIdNameStatus,
  selectIsMemberFetching,
} from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MemberType } from '../../redux/member/member.types'
import SubmitButton from '../submit-button/submit-button.component'
import CircularLoading from '../circular-loading/circular-loading.component'
import moment from 'moment'
import { KelasType } from '../../redux/kelas/kelas.types'
import { addAbsensiStartAsync } from '../../redux/absensi/absensi.actions'
import { selectAllKelas } from '../../redux/kelas/kelas.selectors'

type FORM_DATA = {
  id_member: string
  id_kelas: string
  tgl_absensi: string
  use_membership: boolean | string
}
type Props = {
  allMember: Array<MemberType> | null
  allKelas: Array<KelasType> | null
  addAbsensiStartAsync: (absensiForm, successCallback: () => void) => void
}

const AbsensiForm: React.FC<Props> = ({ allMember, allKelas, addAbsensiStartAsync }) => {
  const classes = useStyles()
  const [selectedMember, setSelectedMember] = useState<MemberType>({
    id: '',
    nama: '',
    no_telp: '',
    email: '',
    tgl_lahir: '',
    status_membership: '',
  })
  const [selectedHari, setSelectedHari] = useState('')
  const [selectedJam, setSelectedJam] = useState('')
  const [selectedKelas, setSelectedKelas] = useState<KelasType>()

  const schema = yup.object().shape({
    id_member: yup.string().required(),
    nama_member: yup.string().required(),
    tgl_absensi: yup.string().required(),
    use_membership: yup.boolean().required(),
  })

  const { register, errors, handleSubmit } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues) => {
    // if (!selectedMember) return alert('please select member')
    // formValues.id_member = selectedMember.id
    // formValues.tgl_mulai = moment(formValues.tgl_mulai).format('DD-MM-YYYY')
    // formValues.tgl_selesai = moment(formValues.tgl_selesai).format('DD-MM-YYYY')
    // const { id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point } = formValues
    // const orderedFormValues = { id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point }
    // if (edit) {
    //   updateMemberStartAsync({
    //     id: selectedMember!.id,
    //     ...orderedFormValues,
    //     status_membership: statusMembership,
    //   })
    // } else {
    //   addMemberStartAsync(orderedFormValues)
    // }
    // addAbsensiStartAsync()
  }

  const getSelectedMemberOptions = {
    options: allMember!,
  }
  const getSelectedKelasOptions = {
    options: allKelas!,
  }

  const getTodayDate = () => {
    return moment(new Date()).format('YYYY-MM-DD')
  }
  const handleChangeSelectedMember = (value: MemberType) => {
    setSelectedMember(value)
  }
  const getOptionsJam = (hari) => {}
  return (
    <FormCard title='Form Absen' withoutModal>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
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
              value={selectedMember}
              onChange={(e: any, value: MemberType) => handleChangeSelectedMember(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputRef={register}
                  name='id_member'
                  label='ID member'
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
              value={selectedMember}
              onChange={(e: any, value: MemberType) => handleChangeSelectedMember(value)}
              renderInput={(params) => (
                <TextField {...params} name='nama_member' label='Nama member' margin='normal' />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControlLabel
              control={
                <Checkbox
                  inputRef={register}
                  checked={selectedMember?.status_membership === 'true'}
                  disabled
                  name='status_membership'
                />
              }
              label='Status Membership'
              disabled
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              {...getSelectedKelasOptions}
              getOptionLabel={(option) =>
                `Hari: ${option.hari}, Jam: ${option.jam}, Jenis: ${
                  option.kategori_senam
                }, Tgl dibuat ${option.created_at}, ${option.keterangan && `Keterangan:`} ${
                  option.keterangan
                }`
              }
              onChange={(e, value) => setSelectedKelas(value)}
              filterSelectedOptions
              id='kelas'
              disableClearable
              renderInput={(params) => (
                <TextField {...params} name='kelas' label='Kelas' margin='normal' />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              options={['SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU', 'MINGGU']}
              getOptionLabel={(option) => option}
              id='hari'
              onChange={(e, value: string) => setSelectedHari(value)}
              disableClearable
              renderInput={(params) => (
                <TextField {...params} name='hari' label='Hari' margin='normal' />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              {...getSelectedKelasOptions}
              getOptionLabel={(option) => option.jam}
              filterOptions={(options, state) =>
                options.filter((option) => option.hari === selectedHari)
              }
              onChange={(e, value) => setSelectedKelas(value)}
              filterSelectedOptions
              id='jam'
              disableClearable
              renderInput={(params) => (
                <TextField {...params} name='hari' label='Jam' margin='normal' />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              {...getSelectedKelasOptions}
              getOptionLabel={(option) => option.kategori_senam}
              filterOptions={(options, state) =>
                options.filter(
                  (option) =>
                    option.hari === selectedKelas?.hari && option.jam === selectedKelas.jam
                )
              }
              onChange={(e, value) => setSelectedKelas(value)}
              filterSelectedOptions
              id='kategori_senam'
              disableClearable
              renderInput={(params) => (
                <TextField {...params} name='kategori_senam' label='Kategori' margin='normal' />
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Autocomplete
              {...getSelectedKelasOptions}
              getOptionLabel={(option) => option.kategori_senam}
              filterOptions={(options, state) =>
                options.filter(
                  (option) =>
                    option.hari === selectedKelas?.hari &&
                    option.jam === selectedKelas.jam &&
                    selectedKelas.kategori_senam
                )
              }
              onChange={(e, value) => setSelectedKelas(value)}
              filterSelectedOptions
              id='kategori_senam'
              disableClearable
              renderInput={(params) => (
                <TextField {...params} name='kategori_senam' label='Kategori' margin='normal' />
              )}
            />
          </Grid>
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
      </form>
    </FormCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  allMemberIdNameStatus: selectAllMemberIdNameStatus(state),
})

const mapDispatchToProps = (dispatch) => ({
  addAbsensiStartAsync: (absensiForm, successCallback) =>
    dispatch(addAbsensiStartAsync(absensiForm, successCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AbsensiForm)
