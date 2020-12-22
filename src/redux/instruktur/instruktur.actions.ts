import { InstrukturActionTypes, InstrukturType } from './instruktur.types'
import { fetchPost, fetchGet, fetchPut } from '../../fetch/fetch'
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
        dispatch(addInstrukturSuccess(instrukturForm))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`menambahkan member ${instrukturForm.nama}`))
      })
      .catch((error) => {
        dispatch(addInstrukturFailure(error.message))
        dispatch(addErrorNotification(`menambahkan member, reason: ${error.message}`))
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
        dispatch(updateInstrukturSuccess(updatedInstruktur))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`update member ${updatedInstruktur.nama}`))
      })
      .catch((error) => {
        dispatch(updateInstrukturFailure(error.message))
        dispatch(addErrorNotification(`update member, reason: ${error.message}`))
      })
  }
}
