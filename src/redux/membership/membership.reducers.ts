import MembershipActionTypes from './membership.types'

const INITIAL_STATE = {
  allMembership: null,
  isFetching: false,
  errorMessage: undefined,
}

const membershipReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MembershipActionTypes.FETCH_ALL_MEMBERSHIP_START:
      return {
        ...state,
        isFetching: true,
      }
    case MembershipActionTypes.FETCH_ALL_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        allMembership: action.payload,
      }

    case MembershipActionTypes.FETCH_ALL_MEMBERSHIP_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
      }
    
    default:
      return state
  }
}

export default membershipReducer
