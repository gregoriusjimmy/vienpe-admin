import axios from 'axios'
import { fetchPost, fetchGet, fetchPut } from '../../fetch/fetch'
import { MemberType } from '../member/member.types'
import { addErrorNotification, addSuccessNotificaiton } from '../notification/notification.actions'
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
    fetchGet(process.env.REACT_APP_MEMBERSHIP_URL)
      .then((response) => dispatch(loadAllMembershipSuccess(response.data)))
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

export const addMembershipStartAsync = (
  membershipForm: MembershipType,
  member: MemberType,
  successCallback?: () => void
) => {
  return (dispatch) => {
    dispatch(addMembershipStart())
    axios
      .all([
        fetchPost(process.env.REACT_APP_MEMBERSHIP_URL, membershipForm),
        fetchPut(process.env.REACT_APP_MEMBER_URL, member),
      ])
      .then((response) => {
        dispatch(addMembershipSuccess(membershipForm))
        if (successCallback) successCallback()
        dispatch(addSuccessNotificaiton(`menambahkan membership ${member.nama}`))
      })
      .catch((error) => {
        dispatch(addMembershipFailure(error.message))
        dispatch(addErrorNotification(`menambahkan membership, reason: ${error.message}`))
      })
  }
}

export const updateMembershipStart = () => ({
  type: MembershipActionTypes.UPDATE_MEMBERSHIP_START,
})

export const updateMembershipSuccess = (updatedMembership: MembershipType) => ({
  type: MembershipActionTypes.UPDATE_MEMBERSHIP_SUCCESS,
  payload: updatedMembership,
})

export const updateMembershipFailure = (errorMessage: string) => ({
  type: MembershipActionTypes.UPDATE_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})

export const updateMembershipStartAsync = (updatedMembership: MembershipType) => {
  return (dispatch) => {
    dispatch(updateMembershipStart())
    fetchPut(process.env.REACT_APP_MEMBERSHIP_URL, updatedMembership)
      .then((response) => {
        dispatch(updateMembershipSuccess(updatedMembership))
      })
      .catch((error) => dispatch(updateMembershipFailure(error.message)))
  }
}
