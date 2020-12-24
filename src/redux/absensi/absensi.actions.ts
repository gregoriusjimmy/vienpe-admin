import { fetchPost, fetchGet, fetchPut } from '../../fetch/fetch'
import { addSuccessNotificaiton, addErrorNotification } from '../notification/notification.actions'
import { AbsensiActionTypes, AbsensiType } from './absensi.types'

export const loadAllAbsensiStart = () => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_START,
})

export const loadAllAbsensiSuccess = (allAbsensi: Array<AbsensiType>) => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_SUCCESS,
  payload: allAbsensi,
})

export const loadAllAbsensiFailure = (errorMessage: string) => ({
  type: AbsensiActionTypes.LOAD_ALL_ABSENSI_FAILURE,
  payload: errorMessage,
})

export const loadAllAbsensiStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllAbsensiStart())
    fetchGet(process.env.REACT_APP_ABSENSI_URL)
      .then((response) => dispatch(loadAllAbsensiSuccess(response.data)))
      .catch((error) => dispatch(loadAllAbsensiFailure(error.message)))
  }
}

export const addAbsensiStart = () => ({
  type: AbsensiActionTypes.ADD_ABSENSI_START,
})

export const addAbsensiSuccess = (newAbsensi: AbsensiType) => ({
  type: AbsensiActionTypes.ADD_ABSENSI_SUCCESS,
  payload: newAbsensi,
})

export const addAbsensiFailure = (errorMessage: string) => ({
  type: AbsensiActionTypes.ADD_ABSENSI_FAILURE,
  payload: errorMessage,
})

export const addAbsensiStartAsync = (absensiForm: AbsensiType, succesCallback?: () => void) => {
  return (dispatch) => {
    dispatch(addAbsensiStart())
    fetchPost(process.env.REACT_APP_ABSENSI_URL, absensiForm)
      .then((response) => {
        dispatch(addAbsensiSuccess(absensiForm))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`menambahkan absensi ${absensiForm.nama}`))
      })
      .catch((error) => {
        dispatch(addAbsensiFailure(error.message))
        dispatch(addErrorNotification(`menambahkan absensi, reason: ${error.message}`))
      })
  }
}
