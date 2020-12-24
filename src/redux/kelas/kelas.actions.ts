import { KelasActionTypes, KelasType } from './kelas.types'
import { fetchPost, fetchGet, getErrorMessage } from '../../fetch/fetch'
import { addErrorNotification, addSuccessNotificaiton } from '../notification/notification.actions'
export const loadAllKelasStart = () => ({
  type: KelasActionTypes.LOAD_ALL_KELAS_START,
})

export const loadAllKelasSuccess = (allKelas: Array<KelasType>) => ({
  type: KelasActionTypes.LOAD_ALL_KELAS_SUCCESS,
  payload: allKelas,
})

export const loadAllKelasFailure = (errorMessage: string) => ({
  type: KelasActionTypes.LOAD_ALL_KELAS_FAILURE,
  payload: errorMessage,
})

export const loadAllKelasStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllKelasStart())
    fetchGet(process.env.REACT_APP_KELAS_URL)
      .then((response) => dispatch(loadAllKelasSuccess(response.data)))
      .catch((error) => dispatch(loadAllKelasFailure(error.message)))
  }
}

export const addKelasStart = () => ({
  type: KelasActionTypes.ADD_KELAS_START,
})

export const addKelasSuccess = (newKelas: KelasType) => ({
  type: KelasActionTypes.ADD_KELAS_SUCCESS,
  payload: newKelas,
})

export const addKelasFailure = (errorMessage: string) => ({
  type: KelasActionTypes.ADD_KELAS_FAILURE,
  payload: errorMessage,
})

export const addKelasStartAsync = (kelasForm: KelasType, succesCallback?: () => void) => {
  return (dispatch) => {
    dispatch(addKelasStart())
    fetchPost(process.env.REACT_APP_KELAS_URL, kelasForm)
      .then((response) => {
        dispatch(addKelasSuccess(kelasForm))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`menambahkan kelas`))
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error)
        dispatch(addKelasFailure(errorMessage))
        dispatch(addErrorNotification(`menambahkan kelas, reason: ${errorMessage}`))
      })
  }
}
