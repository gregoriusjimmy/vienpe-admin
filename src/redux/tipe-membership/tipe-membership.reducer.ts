import TipeMembershipActionTypes from './tipe-membership.types'

const INITIAL_STATE = {
  allTipeMembership: null,
  isFetching: false,
  errorMessage: undefined,
}

const tipeMembershipReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TipeMembershipActionTypes.FETCH_ALL_TIPE_MEMBERSHIP_START:
      return {
        ...state,
        isFetching: true,
      }
    case TipeMembershipActionTypes.FETCH_ALL_TIPE_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        allTipeMembership: action.payload,
      }

    case TipeMembershipActionTypes.FETCH_ALL_TIPE_MEMBERSHIP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default tipeMembershipReducer
