import { fetchAdd, fetchRead, fetchUpdate } from '../../fetch/fetch'
import { MemberType } from '../member/member.types'
import { MembershipActionTypes, MembershipType } from './membership.types'

export const loadAllMembershipStart = () => ({
  type: MembershipActionTypes.LOAD_ALL_MEMBERSHIP_START,
})

export const loadAllMembershipSuccess = (allMembership: Array<MembershipType>) => ({
  type: MembershipActionTypes.LOAD_ALL_MEMBERSHIP_SUCCESS,
  payload: allMembership,
})

export const loadAllMembershipFailure = (errorMessage: string) => ({
  type: MembershipActionTypes.LOAD_ALL_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})

export const loadAllMembershipStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllMembershipStart())
    fetchRead(process.env.REACT_APP_MEMBERSHIP_URL)
      .then((data: Array<MembershipType>) => dispatch(loadAllMembershipSuccess(data)))
      .catch((error) => dispatch(loadAllMembershipFailure(error.message)))
  }
}

export const addMembershipStart = () => ({
  type: MembershipActionTypes.ADD_MEMBERSHIP_START,
})

export const addMembershipSuccess = (newMembership: MembershipType) => ({
  type: MembershipActionTypes.ADD_MEMBERSHIP_SUCCESS,
  payload: newMembership,
})

export const addMembershipFailure = (errorMessage: string) => ({
  type: MembershipActionTypes.ADD_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})

export const addMembershipStartAsync = (membershipForm: MembershipType, member: MemberType) => {
  return (dispatch) => {
    dispatch(addMembershipStart())
    Promise.all([
      fetchAdd(process.env.REACT_APP_MEMBERSHIP_URL, membershipForm),
      fetchUpdate(process.env.REACT_APP_MEMBER_URL, member),
    ])
      .then((response) => {
        dispatch(addMembershipSuccess(membershipForm))
        alert('success')
      })
      .catch((error) => dispatch(addMembershipFailure(error.message)))
  }
}
