import React, { useState } from 'react'
import { TextField, Grid } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import FormCard from '../form-card/form-card.component'
import { connect } from 'react-redux'
import { selectAllMember, selectIsMemberFetching } from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { MemberType } from '../../redux/member/member.types'
import { updateMembershipStartAsync } from '../../redux/membership/membership.actions'
import { MembershipWithMemberType } from '../../redux/membership/membership.types'
import SubmitButton from '../submit-button/submit-button.component'
import CircularLoading from '../circular-loading/circular-loading.component'
import moment from 'moment'
import { selectAllMembership } from '../../redux/membership/membership.selectors'
import { combineAllMembershipWithMember } from '../../utils/utils'
import Form from '../form/form.component'

type FORM_DATA = {
  id: string | number
  tgl_mulai: string
  tgl_selesai: string
  sisa_point: number
}
type Props = {
  allMember: Array<MemberType> | null
  allMembershipWithMember: Array<MembershipWithMemberType>
  isFetching: boolean
  updateMembershipStartAsync: (membershipForm, member, successCallback: () => void) => void
  handleModalClose: () => void
}
const MembershipFormUpdate: React.FC<Props> = ({
  allMember,
  allMembershipWithMember,
  isFetching,
  handleModalClose,
  updateMembershipStartAsync,
}) => {
  const [tglSelesai, setTglSelesai] = useState('')
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)
  const [selectedMembership, setSelectedMembership] = useState<MembershipWithMemberType | null>(
    null
  )

  const schema = yup.object().shape({
    id: yup.string().required(),
    tgl_mulai: yup.string().required(),
    tgl_selesai: yup.string().required(),
    sisa_point: yup.number().required(),
  })

  const { register, errors, handleSubmit } = useForm<FORM_DATA>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (formValues) => {
    formValues.tgl_mulai = moment(formValues.tgl_mulai).format('DD-MM-YYYY')
    formValues.tgl_selesai = moment(formValues.tgl_selesai).format('DD-MM-YYYY')

    updateMembershipStartAsync(
      formValues,
      { ...selectedMember!, status_membership: true },
      handleModalClose
    )
  }

  const calculateTglSelesai = (e: any) => {
    const tglMulai = moment(e.target.value)
    const tglSelesai = tglMulai.clone().add(1, 'M').format('YYYY-MM-DD')
    setTglSelesai(tglSelesai)
  }
  const setMemberAndMembership = (value: MembershipWithMemberType) => {
    setSelectedMembership(value)
    const memberForUpdate = allMember!.find((member) => member.id === value.id_member)
    setSelectedMember(memberForUpdate!)
  }

  return (
    <FormCard title='Update Membership'>
      {isFetching ? (
        <CircularLoading height='200px' />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Autocomplete
                options={allMembershipWithMember}
                getOptionLabel={(option) =>
                  `${option.nama_member}, \t Tipe: ${option.tipe_membership}`
                }
                getOptionSelected={(option, value) => option.id === value.id}
                id='membership'
                value={selectedMembership!}
                disableClearable
                onChange={(e, value) => setMemberAndMembership(value)}
                renderInput={(params) => (
                  <TextField {...params} name='membership' label='Membership' margin='normal' />
                )}
              />
            </Grid>
            <Grid item xs={2}>
              <Autocomplete
                options={allMembershipWithMember}
                getOptionLabel={(option) => `${option.id}`}
                getOptionSelected={(option, value) => option.id === value.id}
                id='id-membership'
                disableClearable
                value={selectedMembership!}
                onChange={(e, value) => setMemberAndMembership(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={register}
                    name='id'
                    label='ID'
                    margin='normal'
                    error={!!errors.id}
                    helperText={errors.id?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                name='tgl_mulai_old'
                label='Tanggal mulai lama'
                type='date'
                value={
                  selectedMembership
                    ? moment(selectedMembership.tgl_mulai, 'DD-MM-YYYY').format('YYYY-MM-DD')
                    : ''
                }
                onChange={calculateTglSelesai}
                InputLabelProps={{ shrink: true }}
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                name='tgl_mulai'
                label='Tanggal mulai baru'
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
                name='tgl_selesai_old'
                type='date'
                value={
                  selectedMembership
                    ? moment(selectedMembership.tgl_selesai, 'DD-MM-YYYY').format('YYYY-MM-DD')
                    : ''
                }
                onChange={(e) => setTglSelesai(e.target.value)}
                InputLabelProps={{ shrink: true }}
                label='Tanggal selesai lama'
                disabled
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
                label='Tanggal selesai baru'
                error={!!errors.tgl_selesai}
                helperText={errors.tgl_selesai?.message}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                name='sisa_point_old'
                type='number'
                value={selectedMembership ? selectedMembership.sisa_point : ''}
                label='Sisa point'
                disabled
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                inputRef={register}
                name='sisa_point'
                type='number'
                label='Point baru'
                error={!!errors.sisa_point}
                helperText={errors.sisa_point?.message}
              />
            </Grid>
            <Grid container justify='flex-end'>
              <Grid item>
                <SubmitButton buttonType='edit' />
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
  allMembershipWithMember: combineAllMembershipWithMember(
    selectAllMembership(state)!,
    selectAllMember(state)!
  ),
  isFetching: selectIsMemberFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  updateMembershipStartAsync: (updatedMembershipForm, member, successCallback) =>
    dispatch(updateMembershipStartAsync(updatedMembershipForm, member, successCallback)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MembershipFormUpdate)
