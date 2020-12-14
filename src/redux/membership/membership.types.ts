export const MembershipActionTypes = {
  LOAD_ALL_MEMBERSHIP_START: 'LOAD_ALL_MEMBERSHIP_START',
  LOAD_ALL_MEMBERSHIP_SUCCESS: 'LOAD_ALL_MEMBERSHIP_SUCCESS',
  LOAD_ALL_MEMBERSHIP_FAILURE: 'LOAD_ALL_MEMBERSHIP_FAILURE',
  ADD_MEMBERSHIP_START: 'ADD_MEMBERSHIP_START',
  ADD_MEMBERSHIP_SUCCESS: 'ADD_MEMBERSHIP_SUCCESS',
  ADD_MEMBERSHIP_FAILURE: 'ADD_MEMBERSHIP_FAILURE',
  UPDATE_MEMBERSHIP_START: 'UPDATE_MEMBERSHIP_START',
  UPDATE_MEMBERSHIP_SUCCESS: 'UPDATE_MEMBERSHIP_SUCCESS',
  UPDATE_MEMBERSHIP_FAILURE: 'UPDATE_MEMBERSHIP_FAILURE',
}
export type MembershipState = {
  allMembership: null | []
  isFetching: boolean
  isLoaded: boolean
  isAdding: boolean
  isUpdating: boolean
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
