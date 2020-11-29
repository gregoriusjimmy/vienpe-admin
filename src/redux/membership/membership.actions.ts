import MembershipActionTypes from './membership.types'

export const fetchAllMembershipStart = () => ({
  type: MembershipActionTypes.FETCH_ALL_MEMBERSHIP_START,
})

export const fetchAllMembershipSuccess = (allMembership) => ({
  type: MembershipActionTypes.FETCH_ALL_MEMBERSHIP_SUCCESS,
  payload: allMembership,
})

export const fetchAllMembershipFailure = (errorMessage) => ({
  type: MembershipActionTypes.FETCH_ALL_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})
