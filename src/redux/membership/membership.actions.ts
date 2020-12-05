import { fetchRead } from '../../fetch/fetch'
import { MembershipActionTypes, MembershipType } from './membership.types'

export const loadAllMembershipStart = () => ({
  type: MembershipActionTypes.LOAD_ALL_MEMBERSHIP_START,
})

export const loadAllMembershipSuccess = (allMembership) => ({
  type: MembershipActionTypes.LOAD_ALL_MEMBERSHIP_SUCCESS,
  payload: allMembership,
})

export const loadAllMembershipFailure = (errorMessage) => ({
  type: MembershipActionTypes.LOAD_ALL_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})

export const loadAllMembershipStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllMembershipStart())
    fetchRead(process.env.REACT_APP_MEMBERSHIP_URL)
      .then((data) => dispatch(loadAllMembershipSuccess(data)))
      .catch((error) => dispatch(loadAllMembershipFailure(error.message)))
  }
}

export const addMembership = (membership: MembershipType) => ({
  type: MembershipActionTypes.ADD_MEMBERSHIP,
  payload: membership,
})
