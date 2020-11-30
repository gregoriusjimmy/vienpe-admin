import MemberActionTypes from './member.types'

export const loadAllMemberStart = () => ({
  type: MemberActionTypes.LOAD_ALL_MEMBER_START,
})

export const loadAllMemberSuccess = (allMember) => ({
  type: MemberActionTypes.LOAD_ALL_MEMBER_SUCCESS,
  payload: allMember,
})

export const loadAllMemberFailure = (errorMessage) => ({
  type: MemberActionTypes.LOAD_ALL_MEMBER_FAILURE,
  payload: errorMessage,
})

export const loadAllMemberAsync = () => {
  return (dispatch) => {
    dispatch(loadAllMemberStart())
  }
}
