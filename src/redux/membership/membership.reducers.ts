import { MembershipActionTypes, MembershipState } from './membership.types'

const INITIAL_STATE: MembershipState = {
  allMembership: null,
  isFetching: false,
  isLoaded: false,
  isAdding: false,
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
    case MembershipActionTypes.ADD_MEMBERSHIP_START:
      return {
        ...state,
        isAdding: true,
      }

    case MembershipActionTypes.ADD_MEMBERSHIP_SUCCESS:
      const id = state.allMembership?.slice(-1)[0]['id']! + 1
      return {
        ...state,
        isAdding: false,
        allMembership: [...state.allMembership!, { id: id, ...action.payload }],
      }

    case MembershipActionTypes.ADD_MEMBERSHIP_FAILURE:
      return {
        ...state,
        isAdding: false,
        errorMessage: action.payload,
      }
    default:
      return state
  }
}

export default membershipReducer
