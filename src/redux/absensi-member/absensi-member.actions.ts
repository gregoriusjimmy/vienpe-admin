import { fetchPost, fetchGet } from '../../fetch/fetch'
import { addSuccessNotificaiton, addErrorNotification } from '../notification/notification.actions'
import {
  AbsensiMemberActionTypes,
  AbsensiMemberType,
  AbsensiMemberViewType,
} from './absensi-member.types'

export const loadAllAbsensiMemberStart = () => ({
  type: AbsensiMemberActionTypes.LOAD_ALL_ABSENSI_MEMBER_START,
})

export const loadAllAbsensiMemberSuccess = (allAbsensiMember: Array<AbsensiMemberViewType>) => ({
  type: AbsensiMemberActionTypes.LOAD_ALL_ABSENSI_MEMBER_SUCCESS,
  payload: allAbsensiMember,
})

export const loadAllAbsensiMemberFailure = (errorMessage: string) => ({
  type: AbsensiMemberActionTypes.LOAD_ALL_ABSENSI_MEMBER_FAILURE,
  payload: errorMessage,
})

export const loadAllAbsensiMemberStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllAbsensiMemberStart())
    fetchGet(process.env.REACT_APP_ABSENSI_MEMBER_URL)
      .then((response) => dispatch(loadAllAbsensiMemberSuccess(response.data)))
      .catch((error) => dispatch(loadAllAbsensiMemberFailure(error.message)))
  }
}

export const addAbsensiMemberStart = () => ({
  type: AbsensiMemberActionTypes.ADD_ABSENSI_MEMBER_START,
})

export const addAbsensiMemberSuccess = (newAbsensiMember: AbsensiMemberType) => ({
  type: AbsensiMemberActionTypes.ADD_ABSENSI_MEMBER_SUCCESS,
  payload: newAbsensiMember,
})

export const addAbsensiMemberFailure = (errorMessage: string) => ({
  type: AbsensiMemberActionTypes.ADD_ABSENSI_MEMBER_FAILURE,
  payload: errorMessage,
})

export const addAbsensiMemberStartAsync = (
  absensiMemberForm: AbsensiMemberType,
  useMembership: boolean
) => {
  return (dispatch) => {
    dispatch(addAbsensiMemberStart())
    fetchPost(process.env.REACT_APP_ABSENSI_MEMBER_URL, {
      absensiMember: absensiMemberForm,
      useMembership: useMembership,
    })
      .then((response) => {
        dispatch(addAbsensiMemberSuccess(response.data))
        dispatch(
          addSuccessNotificaiton(
            `menambahkan absensi dengan id member ${absensiMemberForm.id_member}`
          )
        )
      })
      .catch((error) => {
        dispatch(addAbsensiMemberFailure(error.message))
        dispatch(addErrorNotification(`menambahkan absensi, reason: ${error.message}`))
      })
  }
}
