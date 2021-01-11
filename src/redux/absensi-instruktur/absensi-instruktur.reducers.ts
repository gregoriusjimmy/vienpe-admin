import { AbsensiInstrukturState, AbsensiInstrukturActionTypes } from './absensi-instruktur.types'

const INITIAL_STATE: AbsensiInstrukturState = {
  allAbsensiInstruktur: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const absensiInstrukturReducer = (
  state = INITIAL_STATE,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case AbsensiInstrukturActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_START:
      return {
        ...state,
        isLoaded: false,
        isFetching: true,
      }

    case AbsensiInstrukturActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        errorMessage: undefined,
        allAbsensiInstruktur: action.payload,
      }

    case AbsensiInstrukturActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    case AbsensiInstrukturActionTypes.ADD_ABSENSI_INSTURKTUR_START:
      return {
        ...state,
        isFetching: true,
      }

    case AbsensiInstrukturActionTypes.ADD_ABSENSI_INSTURKTUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allAbsensiInstruktur: [action.payload, ...state.allAbsensiInstruktur!],
      }

    case AbsensiInstrukturActionTypes.ADD_ABSENSI_INSTURKTUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default absensiInstrukturReducer
