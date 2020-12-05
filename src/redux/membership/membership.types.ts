export const MembershipActionTypes = {
  LOAD_ALL_MEMBERSHIP_START: 'LOAD_ALL_MEMBERSHIP_START',
  LOAD_ALL_MEMBERSHIP_SUCCESS: 'LOAD_ALL_MEMBERSHIP_SUCCESS',
  LOAD_ALL_MEMBERSHIP_FAILURE: 'LOAD_ALL_MEMBERSHIP_FAILURE',
  ADD_MEMBERSHIP: 'ADD_MEMBERSHIP',
}
export type MembershipState = {
  allMembership: null | []
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type MembershipType = {
  id: string
  id_member: string
  tipe_membership: string
  tgl_mulai: string
  tgl_selesai: string
  sisa_point: number
}
