export const AbsensiMemberActionTypes = {
  LOAD_ALL_ABSENSI_MEMBER_START: 'LOAD_ALL_ABSENSI_MEMBER_START',
  LOAD_ALL_ABSENSI_MEMBER_SUCCESS: 'LOAD_ALL_ABSENSI_MEMBER_SUCCESS',
  LOAD_ALL_ABSENSI_MEMBER_FAILURE: 'LOAD_ALL_ABSENSI_MEMBER_FAILURE',
  ADD_ABSENSI_MEMBER_START: 'ADD_ABSENSI_MEMBER_START',
  ADD_ABSENSI_MEMBER_SUCCESS: 'ADD_ABSENSI_MEMBER_SUCCESS',
  ADD_ABSENSI_MEMBER_FAILURE: 'ADD_ABSENSI_MEMBER_FAILURE',
}

export type AbsensiMemberState = {
  allAbsensiMember: Array<AbsensiMemberViewType> | null
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type AbsensiMemberViewType = {
  id: string
  nama: string
  tgl_absensi: string
  hari: string
  jam: string
  kategori_senam: string
  instruktur: string
  id_membership: string | number
}

export type AbsensiMemberType = {
  id: string
  id_member: string
  tgl_absensi: string
  id_kelas: string
  id_membership: string
}
