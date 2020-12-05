import { KelasActionTypes } from './kelas.types'
import { fetchRead } from '../../fetch/fetch'
export const loadAllKelasStart = () => ({
  type: KelasActionTypes.LOAD_ALL_KELAS_START,
})

export const loadAllKelasSuccess = (allKelas: []) => ({
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
