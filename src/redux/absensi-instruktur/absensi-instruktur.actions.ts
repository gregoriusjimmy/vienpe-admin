import { fetchPost, fetchGet } from '../../fetch/fetch'
import { addSuccessNotificaiton, addErrorNotification } from '../notification/notification.actions'
import {
  AbsensiInstrukturActionTypes,
  AbsensiInstrukturType,
  AbsensiInstrukturViewType,
} from './absensi-instruktur.types'

export const loadAllAbsensiInstrukturStart = () => ({
  type: AbsensiInstrukturActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_START,
})

export const loadAllAbsensiInstrukturSuccess = (
  allAbsensiInstruktur: Array<AbsensiInstrukturViewType>
) => ({
  type: AbsensiInstrukturActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS,
  payload: allAbsensiInstruktur,
})

export const loadAllAbsensiInstrukturFailure = (errorMessage: string) => ({
  type: AbsensiInstrukturActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE,
  payload: errorMessage,
})

export const loadAllAbsensiInstrukturStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllAbsensiInstrukturStart())
    fetchGet(process.env.REACT_APP_ABSENSI_INSTRUKTUR_URL)
      .then((response) => dispatch(loadAllAbsensiInstrukturSuccess(response.data)))
      .catch((error) => dispatch(loadAllAbsensiInstrukturFailure(error.message)))
  }
}

export const addAbsensiInstrukturStart = () => ({
  type: AbsensiInstrukturActionTypes.ADD_ABSENSI_INSTURKTUR_START,
})
export const addAbsensiInstrukturSuccess = (newAbsensiInstruktur: AbsensiInstrukturType) => ({
  type: AbsensiInstrukturActionTypes.ADD_ABSENSI_INSTURKTUR_SUCCESS,
  payload: newAbsensiInstruktur,
})

export const addAbsensiInstrukturFailure = (errorMessage: string) => ({
  type: AbsensiInstrukturActionTypes.ADD_ABSENSI_INSTURKTUR_FAILURE,
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
          addSuccessNotificaiton(
            `menambahkan absensi dengan instruktur id ${absensiInstrukturForm.id_instruktur}`
          )
        )
      })
      .catch((error) => {
        dispatch(addAbsensiInstrukturFailure(error.message))
        dispatch(addErrorNotification(`menambahkan absensi, reason: ${error.message}`))
      })
  }
}
