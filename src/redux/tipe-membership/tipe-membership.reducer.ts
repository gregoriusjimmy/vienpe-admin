import { TipeMembershipActionTypes, TipeMembershipState } from './tipe-membership.types'

const INITIAL_STATE: TipeMembershipState = {
  allTipeMembership: null,
  isFetching: false,
  isLoaded: false,
  isAdding: false,
  errorMessage: undefined,
}

const tipeMembershipReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case TipeMembershipActionTypes.LOAD_ALL_TIPE_MEMBERSHIP_START:
      return {
        ...state,
        errorMeesage: undefined,
        isFetching: true,
      }
    case TipeMembershipActionTypes.LOAD_ALL_TIPE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        allTipeMembership: action.payload,
      }

    case TipeMembershipActionTypes.LOAD_ALL_TIPE_MEMBERSHIP_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    case TipeMembershipActionTypes.ADD_TIPE_MEMBERSHIP_START:
      return {
        ...state,
        isAdding: true,
      }

    case TipeMembershipActionTypes.ADD_TIPE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isAdding: false,
        allTipeMembership: [...state.allTipeMembership!, action.payload],
      }

    case TipeMembershipActionTypes.ADD_TIPE_MEMBERSHIP_FAILURE:
      return {
        ...state,
        isAdding: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export default tipeMembershipReducer
