import { handdleErrors } from './../../fetch/fetch'
import { MemberActionTypes, MemberType } from './member.types'
import { fetchAdd, fetchRead, fetchUpdate } from '../../fetch/fetch'
import { addSuccessNotificaiton, addErrorNotification } from '../notification/notification.actions'
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

export const addMemberStartAsync = (memberForm: MemberType, succesCallback?: () => void) => {
  return (dispatch) => {
    dispatch(addMemberStart())
    fetchAdd(process.env.REACT_APP_MEMBER_URL, memberForm)
      .then(handdleErrors)
      .then((response) => {
        dispatch(addMemberSuccess(memberForm))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`menambahkan member ${memberForm.nama}`))
      })
      .catch((error) => {
        dispatch(addMemberFailure(error.message))
        dispatch(addErrorNotification(`menambahkan member, reason: ${error.message}`))
      })
  }
}

export const updateMemberStart = () => ({
  type: MemberActionTypes.UPDATE_MEMBER_START,
})

export const updateMemberSuccess = (updatedMember: MemberType) => ({
  type: MemberActionTypes.UPDATE_MEMBER_SUCCESS,
  payload: updatedMember,
})

export const updateMemberFailure = (errorMessage: string) => ({
  type: MemberActionTypes.UPDATE_MEMBER_FAILURE,
  payload: errorMessage,
})

export const updateMemberStartAsync = (updatedMember: MemberType, succesCallback?: () => void) => {
  return (dispatch) => {
    dispatch(updateMemberStart())
    fetchUpdate(process.env.REACT_APP_MEMBER_URL, updatedMember)
      .then(handdleErrors)
      .then((response) => {
        dispatch(updateMemberSuccess(updatedMember))
        if (succesCallback) succesCallback()
        dispatch(addSuccessNotificaiton(`update member ${updatedMember.nama}`))
      })
      .catch((error) => {
        dispatch(updateMemberFailure(error.message))
        dispatch(addErrorNotification(`update member, reason: ${error.message}`))
      })
  }
}
