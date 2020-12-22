import { KelasActionTypes, KelasType } from './kelas.types'
import { fetchAdd, fetchRead, handleErrors } from '../../fetch/fetch'
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
    fetchRead(process.env.REACT_APP_KELAS_URL)
      .then((data) => dispatch(loadAllKelasSuccess(data)))
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
    fetchAdd(process.env.REACT_APP_KELAS_URL, kelasForm)
      .then(handleErrors)
      .then((response) => {
        dispatch(addKelasSuccess(kelasForm))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`menambahkan kelas`))
      })
      .catch((error) => {
        dispatch(addKelasFailure(error.message))
        dispatch(addErrorNotification(`menambahkan kelas, reason: ${error.message}`))
      })
  }
}
