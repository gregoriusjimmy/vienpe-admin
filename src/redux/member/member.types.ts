export const MemberActionTypes = {
  LOAD_ALL_MEMBER_START: 'LOAD_ALL_MEMBER_START',
  LOAD_ALL_MEMBER_SUCCESS: 'LOAD_ALL_MEMBER_SUCCESS',
  LOAD_ALL_MEMBER_FAILURE: 'LOAD_ALL_MEMBER_FAILURE',
  ADD_MEMBER_START: 'ADD_MEMBER_START',
  ADD_MEMBER_SUCCESS: 'ADD_MEMBER_SUCCESS',
  ADD_MEMBER_FAILURE: 'ADD_MEMBER_FAILURE',
  UPDATE_MEMBER_START: 'UPDATE_MEMBER_START',
  UPDATE_MEMBER_SUCCESS: 'UPDATE_MEMBER_SUCCESS',
  UPDATE_MEMBER_FAILURE: 'UPDATE_MEMBER_FAILURE',
}

export type LOAD_ALL_MEMBE_START = { isLoaded: false }

export type MemberState = {
  allMember: null | []
  isFetching: boolean
  isLoaded: boolean
  isAdding: boolean
  isUpdating: boolean
  errorMessage: undefined | string
}

export type MemberType = {
  id: string
  nama: string
  no_telp: string
  email: string | null
  tgl_lahir: string | null
  status_membership: boolean
}
