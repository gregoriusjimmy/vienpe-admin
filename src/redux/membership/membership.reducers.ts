import { MembershipActionTypes, MembershipState, MembershipType } from './membership.types'

const INITIAL_STATE: MembershipState = {
  allMembership: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const membershipReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case MembershipActionTypes.LOAD_ALL_MEMBERSHIP_START:
      return {
        ...state,
        allMembership: null,
        isLoaded: false,
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
        isFetching: true,
      }

    case MembershipActionTypes.ADD_MEMBERSHIP_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allMembership: [action.payload, ...state.allMembership!],
      }

    case MembershipActionTypes.ADD_MEMBERSHIP_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    case MembershipActionTypes.UPDATE_MEMBERSHIP_START:
      return {
        ...state,
        isFetching: true,
      }

    case MembershipActionTypes.UPDATE_MEMBERSHIP_SUCCESS:
      const index = state.allMembership?.findIndex(
        (membership: MembershipType) => membership.id === action.payload.id
      )
      const allNewMembership: Array<MembershipType> = [...state.allMembership!]
      allNewMembership[index!] = action.payload
      return {
        ...state,
        isFetching: false,
        allMembership: [...allNewMembership],
      }

    case MembershipActionTypes.UPDATE_MEMBERSHIP_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default membershipReducer
