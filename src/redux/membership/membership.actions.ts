import { MembershipActionTypes } from './membership.types'

export const setAllMembershipData = (allMembershipData) => ({
  type: MembershipActionTypes.SET_ALL_MEMBERSHIP_DATA,
  payload: allMembershipData,
})

export const setAllTipeMembershipData = (allTipeMembershipData) => ({
  type: MembershipActionTypes.SET_ALL_TIPE_MEMBERSHIP_DATA,
  payload: allTipeMembershipData,
})
