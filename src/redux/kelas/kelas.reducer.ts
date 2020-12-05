import { KelasActionTypes, KelasState } from './kelas.types'

const INITIAL_STATE: KelasState = {
  allKelas: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const kelasReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case KelasActionTypes.LOAD_ALL_KELAS_START:
      return {
        ...state,
        errorMessage: undefined,
        isFetching: true,
      }

    case KelasActionTypes.LOAD_ALL_KELAS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        allKelas: action.payload,
      }

    case KelasActionTypes.LOAD_ALL_KELAS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default kelasReducer
