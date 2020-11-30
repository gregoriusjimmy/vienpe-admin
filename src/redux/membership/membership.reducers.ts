import MembershipActionTypes from './membership.types'

const INITIAL_STATE = {
  allMembership: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const membershipReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MembershipActionTypes.LOAD_ALL_MEMBERSHIP_START:
      return {
        ...state,
        isFetching: true,
      }
    case MembershipActionTypes.LOAD_ALL_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        allMembership: action.payload,
      }

    case MembershipActionTypes.LOAD_ALL_MEMBERSHIP_FAILURE:
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

export default membershipReducer
