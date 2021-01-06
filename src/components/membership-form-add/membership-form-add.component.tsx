import React, { useState } from 'react'
import { TextField, Grid, MenuItem } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormCard from '../form-card/form-card.component'
import { connect } from 'react-redux'
import { selectAllMember, selectIsMemberFetching } from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MemberType } from '../../redux/member/member.types'
import ReactHookFormSelect from '../react-hook-form-select/react-hook-form-select.component'
import { selectAllTipeMembership } from '../../redux/tipe-membership/tipe-membership.selectors'
import { addMembershipStartAsync } from '../../redux/membership/membership.actions'
import SubmitButton from '../submit-button/submit-button.component'
import CircularLoading from '../circular-loading/circular-loading.component'
import moment from 'moment'
import Form from '../form/form.component'

type FORM_DATA = {
  id_member: string | number
  tipe_membership: string
  tgl_mulai: string
  tgl_selesai: string
  sisa_point: number
  nama_member: string
}
type Props = {
  allMember: Array<MemberType> | null
  allTipeMembership: Array<{ tipe: string; keterangan: string }> | null
  isFetching: boolean
  addMembershipStartAsync: (membershipForm, member, successCallback: () => void) => void
  handleModalClose: () => void
}
const MembershipFormAdd: React.FC<Props> = ({
  allMember,
  allTipeMembership,
  isFetching,
  handleModalClose,
  addMembershipStartAsync,
}) => {
  const [tglSelesai, setTglSelesai] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberType>()

  const schema = yup.object().shape({
    nama_member: yup.string().required(),
    tipe_membership: yup.string().required(),
    tgl_mulai: yup.string().required(),
    tgl_selesai: yup.string().required(),
    sisa_point: yup.number().required(),
  })

  const { register, errors, handleSubmit, control } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues: FORM_DATA) => {
    if (!selectedMember) return alert('please select member')
    formValues.tgl_mulai = moment(formValues.tgl_mulai).format('DD-MM-YYYY')
    formValues.tgl_selesai = moment(formValues.tgl_selesai).format('DD-MM-YYYY')
    formValues.id_member = selectedMember.id

    addMembershipStartAsync(
      formValues,
      { ...selectedMember, status_membership: true },
      handleModalClose
    )
  }

  const calculateTglSelesai = (e: any) => {
    const tglMulai = moment(e.target.value)
    const tglSelesai = tglMulai.clone().add(1, 'M').format('YYYY-MM-DD')
    setTglSelesai(tglSelesai)
  }

  const getMemberOptions = {
    options: allMember!,
    getOptionLabel: (option: MemberType) => option.nama,
  }

  return (
    <FormCard title='Daftar Membership'>
      {isFetching ? (
        <CircularLoading height='200px' />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Autocomplete
                {...getMemberOptions}
                id='nama-member'
                disableClearable
                onChange={(e, value) => setSelectedMember(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={register}
                    name='nama_member'
                    label='Nama member'
                    margin='normal'
                    error={!!errors.nama_member}
                    helperText={errors.nama_member?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={selectedMember ? `${selectedMember.id}` : ''}
                disabled
                margin='normal'
                name='id_member'
                label='ID'
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                name='tgl_mulai'
                label='Tanggal mulai'
                type='date'
                onChange={calculateTglSelesai}
                InputLabelProps={{ shrink: true }}
                error={!!errors.tgl_mulai}
                helperText={errors.tgl_mulai?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                name='tgl_selesai'
                type='date'
                value={tglSelesai}
                onChange={(e) => setTglSelesai(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label='Tanggal selesai'
                error={!!errors.tgl_selesai}
                helperText={errors.tgl_selesai?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <ReactHookFormSelect
                name='tipe_membership'
                label='Tipe membership'
                control={control}
                defaultValue={allTipeMembership![0].tipe}
                error={!!errors.tipe_membership}
                helperText={errors.tipe_membership?.message}
                fullWidth
              >
                {allTipeMembership!.map((tipeMembership, idx) => (
                  <MenuItem key={idx} value={tipeMembership.tipe}>
                    {tipeMembership.tipe}
                  </MenuItem>
                ))}
              </ReactHookFormSelect>
            </Grid>
            <Grid item xs={6}>
              <ReactHookFormSelect
                name='sisa_point'
                label='Starting point'
                control={control}
                defaultValue={8}
                error={!!errors.sisa_point}
                helperText={errors.sisa_point?.message}
                fullWidth
              >
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={16}>16</MenuItem>
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
  allMember: selectAllMember(state),
  allTipeMembership: selectAllTipeMembership(state),
  isFetching: selectIsMemberFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  addMembershipStartAsync: (membershipForm, member, successCallback) =>
    dispatch(addMembershipStartAsync(membershipForm, member, successCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MembershipFormAdd)
