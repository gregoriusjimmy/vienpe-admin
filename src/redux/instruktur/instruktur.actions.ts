import { InstrukturActionTypes, InstrukturType } from './instruktur.types'
import { fetchPost, fetchGet, fetchPut, getErrorMessage } from '../../fetch/fetch'
import { addSuccessNotificaiton, addErrorNotification } from '../notification/notification.actions'

export const loadAllInstrukturStart = () => ({
  type: InstrukturActionTypes.LOAD_ALL_INSTRUKTUR_START,
})

export const loadAllInstrukturSuccess = (allInstruktur: Array<InstrukturType>) => ({
  type: InstrukturActionTypes.LOAD_ALL_INSTRUKTUR_SUCCESS,
  payload: allInstruktur,
})

export const loadAllInstrukturFailure = (errorMessage: string) => ({
  type: InstrukturActionTypes.LOAD_ALL_INSTRUKTUR_FAILURE,
  payload: errorMessage,
})

export const loadAllInstrukturStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllInstrukturStart())
    fetchGet(process.env.REACT_APP_INSTRUKTUR_URL)
      .then((response) => dispatch(loadAllInstrukturSuccess(response.data)))
      .catch((error) => dispatch(loadAllInstrukturFailure(error.message)))
  }
}

export const addInstrukturStart = () => ({
  type: InstrukturActionTypes.ADD_INSTRUKTUR_START,
})

export const addInstrukturSuccess = (newInstruktur: InstrukturType) => ({
  type: InstrukturActionTypes.ADD_INSTRUKTUR_SUCCESS,
  payload: newInstruktur,
})

export const addInstrukturFailure = (errorMessage: string) => ({
  type: InstrukturActionTypes.ADD_INSTRUKTUR_FAILURE,
  payload: errorMessage,
})

export const addInstrukturStartAsync = (
  instrukturForm: InstrukturType,
  succesCallback?: () => void
) => {
  return (dispatch) => {
    dispatch(addInstrukturStart())
    fetchPost(process.env.REACT_APP_INSTRUKTUR_URL, instrukturForm)
      .then((response) => {
        dispatch(addInstrukturSuccess(response.data))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`menambahkan instruktur ${instrukturForm.nama}`))
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error)
        dispatch(addInstrukturFailure(errorMessage))
        dispatch(addErrorNotification(`menambahkan instruktur, reason: ${errorMessage}`))
      })
  }
}

export const updateInstrukturStart = () => ({
  type: InstrukturActionTypes.UPDATE_INSTRUKTUR_START,
})

export const updateInstrukturSuccess = (updatedInstruktur: InstrukturType) => ({
  type: InstrukturActionTypes.UPDATE_INSTRUKTUR_SUCCESS,
  payload: updatedInstruktur,
})

export const updateInstrukturFailure = (errorMessage: string) => ({
  type: InstrukturActionTypes.UPDATE_INSTRUKTUR_FAILURE,
  payload: errorMessage,
})

export const updateInstrukturStartAsync = (
  updatedInstruktur: InstrukturType,
  succesCallback?: () => void
) => {
  return (dispatch) => {
    dispatch(updateInstrukturStart())
    fetchPut(process.env.REACT_APP_INSTRUKTUR_URL, updatedInstruktur)
      .then((response) => {
        dispatch(updateInstrukturSuccess(response.data))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`update instruktur ${updatedInstruktur.nama}`))
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error)
        dispatch(updateInstrukturFailure(errorMessage))
        dispatch(addErrorNotification(`update instruktur, reason: ${errorMessage}`))
      })
  }
}
