import { AbsensiState, AbsensiActionTypes } from './absensi.types'

const INITIAL_STATE: AbsensiState = {
  allAbsensi: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const absensiReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case AbsensiActionTypes.LOAD_ALL_ABSENSI_START:
      return {
        ...state,
        isLoaded: false,
        isFetching: true,
      }

    case AbsensiActionTypes.LOAD_ALL_ABSENSI_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        errorMessage: undefined,
        allAbsensi: action.payload,
      }

    case AbsensiActionTypes.LOAD_ALL_ABSENSI_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    case AbsensiActionTypes.ADD_ABSENSI_START:
      return {
        ...state,
        isFetching: true,
      }

    case AbsensiActionTypes.ADD_ABSENSI_SUCCESS:
      let id
      if (state.allAbsensi) id = state.allAbsensi?.slice(-1)[0]['id']! + 1
      else id = 1

      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allAbsensi: [...state.allAbsensi!, { id: id, ...action.payload }],
      }

    case AbsensiActionTypes.ADD_ABSENSI_FAILURE:
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
