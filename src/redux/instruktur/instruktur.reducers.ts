import { InstrukturActionTypes, InstrukturState, InstrukturType } from './instruktur.types'

const INITIAL_STATE: InstrukturState = {
  allInstruktur: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const instrukturReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case InstrukturActionTypes.LOAD_ALL_INSTRUKTUR_START:
      return {
        ...state,
        isLoaded: false,
        isFetching: true,
      }

    case InstrukturActionTypes.LOAD_ALL_INSTRUKTUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        errorMessage: undefined,
        allInstruktur: action.payload,
      }

    case InstrukturActionTypes.LOAD_ALL_INSTRUKTUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    case InstrukturActionTypes.ADD_INSTRUKTUR_START:
      return {
        ...state,
        isFetching: true,
      }

    case InstrukturActionTypes.ADD_INSTRUKTUR_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allInstruktur: [...state.allInstruktur!, action.payload],
      }

    case InstrukturActionTypes.ADD_INSTRUKTUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case InstrukturActionTypes.UPDATE_INSTRUKTUR_START:
      return {
        ...state,
        isFetching: true,
      }

    case InstrukturActionTypes.UPDATE_INSTRUKTUR_SUCCESS:
      const index = state.allInstruktur?.findIndex(
        (instruktur: InstrukturType) => instruktur.id === action.payload.id
      )

      const allNewInstruktur: Array<InstrukturType> = [...state.allInstruktur!]
      allNewInstruktur[index!] = action.payload
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allInstruktur: [...allNewInstruktur],
      }

    case InstrukturActionTypes.UPDATE_INSTRUKTUR_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export default instrukturReducer
