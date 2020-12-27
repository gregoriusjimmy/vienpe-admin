import { KelasActionTypes, KelasType } from './kelas.types'
import { fetchPost, fetchGet, getErrorMessage, fetchPut } from '../../fetch/fetch'
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
        dispatch(addKelasSuccess(response.data))
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
export const updateKelasAktifStart = () => ({
  type: KelasActionTypes.UPDATE_KELAS_AKTIF_START,
})

export const updateKelasAktifSuccess = (payload: {
  id: string | number
  aktif: boolean | string
}) => ({
  type: KelasActionTypes.UPDATE_KELAS_AKTIF_SUCCESS,
  payload: payload,
})

export const updateKelasAktifFailure = (errorMessage: string) => ({
  type: KelasActionTypes.UPDATE_KELAS_AKTIF_FAILURE,
  payload: errorMessage,
})

export const updateKelasAktifStartAsync = (
  kelas: { id: string; aktif: boolean },
  succesCallback?: () => void
) => {
  return (dispatch) => {
    dispatch(updateKelasAktifStart())
    fetchPut(process.env.REACT_APP_KELAS_AKTIF_URL, kelas)
      .then((response) => {
        dispatch(updateKelasAktifSuccess(response.data))
        if (succesCallback) succesCallback()
        let text = ''
        kelas.aktif === true ? (text = 'mengaktifkan') : (text = 'menonaktifkan')
        dispatch(addSuccessNotificaiton(`${text} kelas`))
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error)
        dispatch(updateKelasAktifFailure(errorMessage))
        dispatch(addErrorNotification(`update kelas, reason: ${errorMessage}`))
      })
  }
}
