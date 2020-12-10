import { MemberActionTypes, MemberType } from './member.types'
import { fetchAdd, fetchRead } from '../../fetch/fetch'
export const loadAllMemberStart = () => ({
  type: MemberActionTypes.LOAD_ALL_MEMBER_START,
})

export const loadAllMemberSuccess = (allMember: Array<MemberType>) => ({
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
      .then((data: Array<MemberType>) => dispatch(loadAllMemberSuccess(data)))
      .catch((error) => dispatch(loadAllMemberFailure(error.message)))
  }
}

export const addMemberStart = () => ({
  type: MemberActionTypes.ADD_MEMBER_START,
})

export const addMemberSuccess = (newMember: MemberType) => ({
  type: MemberActionTypes.ADD_MEMBER_SUCCESS,
  payload: newMember,
})

export const addMemberFailure = (errorMessage: string) => ({
  type: MemberActionTypes.ADD_MEMBER_FAILURE,
  payload: errorMessage,
})

export const addMemberStartAsync = (memberForm: MemberType) => {
  return (dispatch) => {
    dispatch(addMemberStart())
    fetchAdd(process.env.REACT_APP_MEMBERSHIP_URL, memberForm)
      .then((response) => {
        dispatch(addMemberSuccess(memberForm))
        alert('success')
      })
      .catch((error) => dispatch(addMemberFailure(error.message)))
  }
}
