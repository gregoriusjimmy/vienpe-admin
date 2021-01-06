import React, { useEffect, useState } from 'react'
import { TextField, Grid, FormControlLabel, Checkbox } from '@material-ui/core'
import FormCard from '../form-card/form-card.component'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { connect } from 'react-redux'
import { addMemberStartAsync, updateMemberStartAsync } from '../../redux/member/member.actions'
import { MemberType } from '../../redux/member/member.types'
import SubmitButton from '../submit-button/submit-button.component'
import { selectIsMemberFetching } from '../../redux/member/member.selectors'
import { RootState } from '../../redux/root-reducer'
import CircularLoading from '../circular-loading/circular-loading.component'
import moment from 'moment'
import Form from '../form/form.component'

type FORM_DATA = {
  nama: ''
  email: '' | undefined
  no_telp: ''
  tgl_lahir: '' | undefined
  status_membership?: boolean
}

type Props = {
  addMemberStartAsync: (member: FORM_DATA, successCallback?) => Promise<any>
  updateMemberStartAsync: (member, successCallback?) => Promise<any>
  handleModalClose: () => void
  isFetching: boolean
  edit?: true
  selectedMember?: MemberType | null
}

const MemberForm: React.FC<Props> = ({
  addMemberStartAsync,
  updateMemberStartAsync,
  handleModalClose,
  isFetching,
  edit,
  selectedMember,
}) => {
  const [statusMembership, setStatusMembership] = useState(false)

  useEffect(() => {
    // transform string 'true' to boolean
    if (selectedMember) {
      setStatusMembership(selectedMember.status_membership === 'true')
    }
  }, [selectedMember])

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
    formValues.status_membership = false

    if (edit) {
      updateMemberStartAsync(
        {
          id: selectedMember!.id,
          ...formValues,
          status_membership: statusMembership,
        },
        handleModalClose
      )
    } else {
      addMemberStartAsync(formValues, handleModalClose)
    }
  }

  return (
    <FormCard title={`${edit ? 'Edit' : 'Daftar'} Member`}>
      {isFetching ? (
        <CircularLoading height={'200px'} />
      ) : (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1}>
            <Grid item xs={edit ? 10 : 12}>
              <TextField
                inputRef={register}
                error={!!errors.nama}
                defaultValue={selectedMember?.nama}
                name='nama'
                fullWidth
                label='Nama'
                helperText={errors.nama?.message}
              />
            </Grid>
            {edit ? (
              <Grid item xs={2}>
                <TextField value={selectedMember?.id} disabled name='id' label='ID' />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <TextField
                inputRef={register}
                error={!!errors.email}
                defaultValue={selectedMember?.email}
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
                defaultValue={selectedMember?.no_telp}
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
            {edit && (
              <Grid item xs={12}>
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
                />
              </Grid>
            )}
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
  isFetching: selectIsMemberFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  addMemberStartAsync: (member, successCallback?) =>
    dispatch(addMemberStartAsync(member, successCallback)),
  updateMemberStartAsync: (member, successCallback?) =>
    dispatch(updateMemberStartAsync(member, successCallback)),
})
export default connect(mapStateToProps, mapDispatchToProps)(MemberForm)
