import { TipeMembershipActionTypes, TipeMembershipType } from './tipe-membership.types'
import { fetchAdd, fetchRead } from '../../fetch/fetch'
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

export const addTipeMembershipStart = () => ({
  type: TipeMembershipActionTypes.ADD_TIPE_MEMBERSHIP_START,
})

export const addTipeMembershipSuccess = (newTipeMemberhsip: TipeMembershipType) => ({
  type: TipeMembershipActionTypes.ADD_TIPE_MEMBERSHIP_SUCCESS,
  payload: newTipeMemberhsip,
})

export const addTipeMembershipFailure = (errorMessage: string) => ({
  type: TipeMembershipActionTypes.ADD_TIPE_MEMBERSHIP_FAILURE,
  payload: errorMessage,
})

export const addTipeMembershipStartAsync = (tipeMembershipForm: TipeMembershipType) => {
  return (dispatch) => {
    dispatch(addTipeMembershipStart())
    fetchAdd(process.env.REACT_APP_MEMBERSHIP_URL, tipeMembershipForm)
      .then((response) => {
        dispatch(addTipeMembershipSuccess(tipeMembershipForm))
        alert('success')
      })
      .catch((error) => dispatch(addTipeMembershipFailure(error.message)))
  }
}
