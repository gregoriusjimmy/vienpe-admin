import { TipeMembershipActionTypes, TipeMembershipType } from './tipe-membership.types'
import { fetchRead } from '../../fetch/fetch'
export const loadAllTipeMembershipStart = () => ({
  type: TipeMembershipActionTypes.LOAD_ALL_TIPE_MEMBERSHIP_START,
})

export const loadAllTipeMembershipSuccess = (allTipeMembership: Array<TipeMembershipType>) => ({
  type: TipeMembershipActionTypes.LOAD_ALL_TIPE_MEMBERSHIP_SUCCESS,
  payload: allTipeMembership,
})

export const loadAllTipeMembershipFailure = (errorMessage: string) => ({
  type: TipeMembershipActionTypes.LOAD_ALL_TIPE_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})

export const loadAllTipeMembershipStartAsync = () => {
  return (dispatch) => {
    dispatch(loadAllTipeMembershipStart())
    fetchRead(process.env.REACT_APP_TIPE_MEMBERSHIP_URL)
      .then((data: Array<TipeMembershipType>) => dispatch(loadAllTipeMembershipSuccess(data)))
      .catch((error) => dispatch(loadAllTipeMembershipFailure(error.message)))
  }
}

export const addTipeMembership = (tipeMembership: TipeMembershipType) => ({
  type: TipeMembershipActionTypes.ADD_TIPE_MEMBERSHIP,
  payload: tipeMembership,
})
