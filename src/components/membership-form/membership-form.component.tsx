import React, { useState } from 'react'
import { TextField, Button, Grid, MenuItem } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import FormCard from '../form-card/form-card.component'
import useStyles from './membership-form.styles'
import { connect } from 'react-redux'
import { selectAllMember } from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MemberType } from '../../redux/member/member.types'
import ReactHookFormSelect from '../react-hook-form-select/reactHookFormSelect.component'
import { selectAllTipeMembership } from '../../redux/tipe-membership/tipe-membership.selectors'
import { addMembershipStartAsync } from '../../redux/membership/membership.actions'
import { MembershipType } from '../../redux/membership/membership.types'

type FORM_DATA = {
  tipe_membership: string
  tgl_mulai: string
  tgl_selesai: string
  sisa_point: number
  nama_member: string
}
type Props = {
  allMember: Array<MemberType> | null
  allTipeMembership: Array<{ tipe: string; keterangan: string }> | null
  addMembershipStartAsync: (membershipForm, member) => void
  edit?: true
  selectedMembership?: MembershipType | null
}
const MembershipForm: React.FC<Props> = ({
  allMember,
  allTipeMembership,
  edit,
  selectedMembership,
  addMembershipStartAsync,
}) => {
  const classes = useStyles()
  const [tglSelesai, setTglSelesai] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberType>()

  const schema = yup.object().shape({
    nama_member: yup.string().required(),
    tipe_membership: yup.string().required(),
    tgl_mulai: yup.string().required(),
    tgl_selesai: yup.string().required(),
    sisa_point: yup.number().required(),
  })

  const { register, errors, handleSubmit, control, reset } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues) => {
    if (!selectedMember) return alert('select member')
    formValues.id_member = selectedMember.id
    const { id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point } = formValues
    const orderedFormValues = { id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point }
    // if (edit) {
    //   updateMemberStartAsync({
    //     id: selectedMember!.id,
    //     ...orderedFormValues,
    //     status_membership: statusMembership,
    //   })
    // } else {
    //   addMemberStartAsync(orderedFormValues)
    // }
    addMembershipStartAsync(orderedFormValues, { ...selectedMember, status_membership: true })
  }

  const findMemberId = (event, inputedMemberName: string) => {
    const findMember = allMember!.find(
      (member) => member.nama.toLowerCase() === inputedMemberName.toLowerCase()
    )
    if (findMember) setSelectedMember(findMember)
  }
  const calculateTglSelesai = (e: any) => {
    const convertedTglMulai: Date = new Date(e.target.value)
    // addting 1 month
    convertedTglMulai.setMonth(convertedTglMulai.getMonth() + 1)
    //regex for removing the time from iso format
    const isoStringTglSelesai = convertedTglMulai.toISOString().split(/[T ]/i, 1)[0]
    setTglSelesai(isoStringTglSelesai)
  }

  const getNamaMemberOptions = {
    options: allMember!,
    getOptionLabel: (option: MemberType) => option.nama,
  }

  return (
    <FormCard title='Daftar Membership'>
      <form
        className={classes.root}
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              {...getNamaMemberOptions}
              id='nama-member'
              disableClearable
              onInputChange={findMemberId}
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
          <Grid item xs={12}>
            <Button className={classes.submitBtn} type='submit' variant='contained' color='primary'>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormCard>
  )
}

const mapStateToProps = (state: RootState) => ({
  allMember: selectAllMember(state),
  allTipeMembership: selectAllTipeMembership(state),
})

const mapDispatchToProps = (dispatch) => ({
  addMembershipStartAsync: (membershipForm, member) =>
    dispatch(addMembershipStartAsync(membershipForm, member)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MembershipForm)
