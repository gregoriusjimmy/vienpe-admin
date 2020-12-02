import { MemberActionTypes } from './member.types'
import { fetchRead } from '../../fetch/fetch'
export const loadAllMemberStart = () => ({
  type: MemberActionTypes.LOAD_ALL_MEMBER_START,
})

export const loadAllMemberSuccess = (allMember: []) => ({
  type: MemberActionTypes.LOAD_ALL_MEMBER_SUCCESS,
  payload: allMember,
})

export const loadAllMemberFailure = (errorMessage: string) => ({
  type: MemberActionTypes.LOAD_ALL_MEMBER_FAILURE,
  payload: errorMessage,
})

export const loadAllMemberStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllMemberStart())
    fetchRead(process.env.REACT_APP_MEMBER_URL)
      .then((data) => dispatch(loadAllMemberSuccess(data)))
      .catch((error) => dispatch(loadAllMemberFailure(error.message)))
  }
}
