import { MembershipActionTypes } from './membership.types'

const INITIAL_STATE = {
  allMembershipData: null,
  allTipeMembershipData: null,
}

const membershipReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MembershipActionTypes.SET_ALL_MEMBERSHIP_DATA:
      return {
        ...state,
        allMembershipData: action.payload,
      }
    case MembershipActionTypes.SET_ALL_TIPE_MEMBERSHIP_DATA:
      return {
        ...state,
        allTipeMembershipData: action.payload,
      }
    default:
      return state
  }
}

export default membershipReducer
