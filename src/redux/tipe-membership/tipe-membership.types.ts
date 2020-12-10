export const TipeMembershipActionTypes = {
  LOAD_ALL_TIPE_MEMBERSHIP_START: 'LOAD_ALL_TIPE_MEMBERSHIP_START',
  LOAD_ALL_TIPE_MEMBERSHIP_SUCCESS: 'LOAD_ALL_TIPE_MEMBERSHIP_SUCCESS',
  LOAD_ALL_TIPE_MEMBERSHIP_FAILURE: 'LOAD_ALL_TIPE_MEMBERSHIP_FAILURE',
  ADD_TIPE_MEMBERSHIP_START: 'ADD_TIPE_MEMBERSHIP_START',
  ADD_TIPE_MEMBERSHIP_SUCCESS: 'ADD_TIPE_MEMBERSHIP_SUCCESS',
  ADD_TIPE_MEMBERSHIP_FAILURE: 'ADD_TIPE_MEMBERSHIP_FAILURE',
}

// export default TipeMembershipActionTypes

export type TipeMembershipState = {
  allTipeMembership: null | []
  isFetching: boolean
  isLoaded: boolean
  isAdding: boolean
  errorMessage: undefined | string
}

export type TipeMembershipType = {
  tipe: string
  keterangan: string
}
