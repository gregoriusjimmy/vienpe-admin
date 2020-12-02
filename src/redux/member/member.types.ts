export const MemberActionTypes = {
  LOAD_ALL_MEMBER_START: 'LOAD_ALL_MEMBER_START',
  LOAD_ALL_MEMBER_SUCCESS: 'LOAD_ALL_MEMBER_SUCCESS',
  LOAD_ALL_MEMBER_FAILURE: 'LOAD_ALL_MEMBER_FAILURE',
}
export type MemberState = {
  allMember: null | []
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type MemberType = {
  id: string
  nama: string
  no_telp: string
  email: string | null
  tgl_lahir: string | null
  status_membership: boolean
  created_at: string
}
