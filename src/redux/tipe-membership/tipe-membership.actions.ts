import TipeMembershipActionTypes from './tipe-membership.types'
import { fetchRead } from '../../fetch/fetch'
export const fetchAllTipeMembershipStart = () => ({
  type: TipeMembershipActionTypes.FETCH_ALL_TIPE_MEMBERSHIP_START,
})

export const fetchAllTipeMembershipSuccess = (allTipeMembership) => ({
  type: TipeMembershipActionTypes.FETCH_ALL_TIPE_MEMBERSHIP_SUCCESS,
  payload: allTipeMembership,
})

export const fetchAllTipeMembershipFailure = (errorMessage) => ({
  type: TipeMembershipActionTypes.FETCH_ALL_TIPE_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})

export const fetchAllTipeMembershipStartAsync = () => {
  return (dispatch) => {
    dispatch(fetchAllTipeMembershipStart())
    fetchRead(process.env.REACT_APP_TIPE_MEMBERSHIP_URL)
      .then((data) => dispatch(fetchAllTipeMembershipSuccess(data)))
      .catch((error) => dispatch(fetchAllTipeMembershipFailure(error.message)))
  }
}
