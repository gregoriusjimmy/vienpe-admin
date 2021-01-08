import { fetchPost, fetchGet } from '../../fetch/fetch'
import { addSuccessNotificaiton, addErrorNotification } from '../notification/notification.actions'
import { AbsensiActionTypes, AbsensiInstrukturType, AbsensiMemberType } from './absensi.types'

export const loadAllAbsensiMemberStart = () => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_MEMBER_START,
})

export const loadAllAbsensiMemberSuccess = (allAbsensiMember: Array<AbsensiMemberType>) => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_MEMBER_SUCCESS,
  payload: allAbsensiMember,
})

export const loadAllAbsensiMemberFailure = (errorMessage: string) => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_MEMBER_FAILURE,
  payload: errorMessage,
})

export const loadAllAbsensiMemberStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllAbsensiMemberStart())
    fetchGet(process.env.REACT_APP_ABSENSI_MEMBER_JOIN_URL)
      .then((response) => dispatch(loadAllAbsensiMemberSuccess(response.data)))
      .catch((error) => dispatch(loadAllAbsensiMemberFailure(error.message)))
  }
}
export const loadAllAbsensiInstrukturStart = () => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_START,
})

export const loadAllAbsensiInstrukturSuccess = (
  allAbsensiInstruktur: Array<AbsensiInstrukturType>
) => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS,
  payload: allAbsensiInstruktur,
})

export const loadAllAbsensiInstrukturFailure = (errorMessage: string) => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE,
  payload: errorMessage,
})

export const loadAllAbsensiInstrukturStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllAbsensiInstrukturStart())
    fetchGet(process.env.REACT_APP_ABSENSI_INSTRUKTUR_JOIN_URL)
      .then((response) => dispatch(loadAllAbsensiInstrukturSuccess(response.data)))
      .catch((error) => dispatch(loadAllAbsensiInstrukturFailure(error.message)))
  }
}

export const loadAllAbsensiStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllAbsensiMemberStartAsync())
    dispatch(loadAllAbsensiInstrukturStartAsync())
  }
}

export const addAbsensiMemberStart = () => ({
  type: AbsensiActionTypes.ADD_ABSENSI_MEMBER_START,
})

export const addAbsensiMemberSuccess = (newAbsensiMember: AbsensiMemberType) => ({
  type: AbsensiActionTypes.ADD_ABSENSI_MEMBER_SUCCESS,
  payload: newAbsensiMember,
})

export const addAbsensiMemberFailure = (errorMessage: string) => ({
  type: AbsensiActionTypes.ADD_ABSENSI_MEMBER_FAILURE,
  payload: errorMessage,
})

export const addAbsensiMemberStartAsync = (
  absensiMemberForm: AbsensiMemberType,
  useMembership:boolean
) => {
  return (dispatch) => {
    dispatch(addAbsensiMemberStart())
    fetchPost(process.env.REACT_APP_ABSENSI_MEMBER_URL, absensiMemberForm)
      .then((response) => {
        dispatch(addAbsensiMemberSuccess(response.data))
        dispatch(addSuccessNotificaiton(`menambahkan absensi dengan id ${absensiMemberForm.id}`))
      })
      .catch((error) => {
        dispatch(addAbsensiMemberFailure(error.message))
        dispatch(addErrorNotification(`menambahkan absensi, reason: ${error.message}`))
      })
  }
}

export const addAbsensiInstrukturStart = () => ({
  type: AbsensiActionTypes.ADD_ABSENSI_INSTURKTUR_START,
})
export const addAbsensiInstrukturSuccess = (newAbsensiMember: AbsensiMemberType) => ({
  type: AbsensiActionTypes.ADD_ABSENSI_INSTURKTUR_SUCCESS,
  payload: newAbsensiMember,
})

export const addAbsensiInstrukturFailure = (errorMessage: string) => ({
  type: AbsensiActionTypes.ADD_ABSENSI_INSTURKTUR_FAILURE,
  payload: errorMessage,
})

export const addAbsensiInstrukturStartAsync = (
  absensiInstrukturForm: AbsensiInstrukturType,
  succesCallback?: () => void
) => {
  return (dispatch) => {
    dispatch(addAbsensiInstrukturStart())
    fetchPost(process.env.REACT_APP_ABSENSI_INSTRUKTUR_URL, absensiInstrukturForm)
      .then((response) => {
        dispatch(addAbsensiInstrukturSuccess(response.data))
        if (succesCallback) succesCallback()
        dispatch(
          addSuccessNotificaiton(`menambahkan absensi dengan id ${absensiInstrukturForm.id}`)
        )
      })
      .catch((error) => {
        dispatch(addAbsensiInstrukturFailure(error.message))
        dispatch(addErrorNotification(`menambahkan absensi, reason: ${error.message}`))
      })
  }
}
