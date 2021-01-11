import { KelasActionTypes, KelasState, KelasType } from './kelas.types'

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
        isLoaded: false,
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

    case KelasActionTypes.ADD_KELAS_START:
      return {
        ...state,
        isFetching: true,
      }

    case KelasActionTypes.ADD_KELAS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allKelas: [action.payload, ...state.allKelas!],
      }

    case KelasActionTypes.ADD_KELAS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    case KelasActionTypes.UPDATE_KELAS_AKTIF_START:
      return {
        ...state,
        isFetching: true,
      }

    case KelasActionTypes.UPDATE_KELAS_AKTIF_SUCCESS:
      const index = state.allKelas?.findIndex((kelas: KelasType) => kelas.id === action.payload.id)
      const allNewKelas: Array<KelasType> = [...state.allKelas!]
      allNewKelas[index!]['aktif'] = action.payload.aktif

      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allKelas: [...allNewKelas],
      }

    case KelasActionTypes.UPDATE_KELAS_AKTIF_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default kelasReducer
