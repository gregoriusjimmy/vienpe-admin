import { AbsensiState, AbsensiActionTypes } from './absensi.types'

const INITIAL_STATE: AbsensiState = {
  allAbsensiMember: null,
  allAbsensiInstruktur: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const absensiReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case AbsensiActionTypes.LOAD_ALL_ABSENSI_MEMBER_START:
      return {
        ...state,
        isLoaded: false,
        isFetching: true,
      }

    case AbsensiActionTypes.LOAD_ALL_ABSENSI_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        errorMessage: undefined,
        allAbsensiMember: action.payload,
      }

    case AbsensiActionTypes.LOAD_ALL_ABSENSI_MEMBER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }
    case AbsensiActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_START:
      return {
        ...state,
        isLoaded: false,
        isFetching: true,
      }

    case AbsensiActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        errorMessage: undefined,
        allAbsensiInstruktur: action.payload,
      }

    case AbsensiActionTypes.LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    case AbsensiActionTypes.ADD_ABSENSI_MEMBER_START:
      return {
        ...state,
        isFetching: true,
      }

    case AbsensiActionTypes.ADD_ABSENSI_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allAbsensiMember: [...state.allAbsensiMember!, action.payload],
      }

    case AbsensiActionTypes.ADD_ABSENSI_MEMBER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case AbsensiActionTypes.ADD_ABSENSI_INSTURKTUR_START:
      return {
        ...state,
        isFetching: true,
      }

    case AbsensiActionTypes.ADD_ABSENSI_INSTURKTUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allAbsensiInstruktur: [...state.allAbsensiInstruktur!, action.payload],
      }

    case AbsensiActionTypes.ADD_ABSENSI_INSTURKTUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default absensiReducer
