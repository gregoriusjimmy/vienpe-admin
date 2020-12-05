export const TipeMembershipActionTypes = {
  LOAD_ALL_TIPE_MEMBERSHIP_START: 'LOAD_ALL_TIPE_MEMBERSHIP_START',
  LOAD_ALL_TIPE_MEMBERSHIP_SUCCESS: 'LOAD_ALL_TIPE_MEMBERSHIP_SUCCESS',
  LOAD_ALL_TIPE_MEMBERSHIP_FAILURE: 'LOAD_ALL_TIPE_MEMBERSHIP_FAILURE',
  ADD_TIPE_MEMBERSHIP: 'ADD_TIPE_MEMBERSHIP',
}

// export default TipeMembershipActionTypes

export type TipeMembershipState = {
  allTipeMembership: null | []
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type TipeMembershipType = {
  tipe: string
  keterangan: string
}
