import { MemberActionTypes } from './member.types'

export const setAllMemberData = (allMemberData) => ({
  type: MemberActionTypes.SET_ALL_MEMBER_DATA,
  payload: allMemberData,
})
