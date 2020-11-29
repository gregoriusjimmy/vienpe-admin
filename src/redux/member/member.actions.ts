import MemberActionTypes from './member.types'

export const fetchAllMemberStart = () => ({
  type: MemberActionTypes.FETCH_ALL_MEMBER_START,
})

export const fetchAllMemberSuccess = (allMember) => ({
  type: MemberActionTypes.FETCH_ALL_MEMBER_SUCCESS,
  payload: allMember,
})

export const fetchAllMemberFailure = (errorMessage) => ({
  type: MemberActionTypes.FETCH_ALL_MEMBER_FAILURE,
  payload: errorMessage,
})

export const fetchAllMemberAsync = () => {
  return (dispatch) => {
    dispatch(fetchAllMemberStart())
  }
}
