export const AbsensiActionTypes = {
  LOAD_ALL_ABSENSI_MEMBER_START: 'LOAD_ALL_ABSENSI_MEMBER_START',
  LOAD_ALL_ABSENSI_MEMBER_SUCCESS: 'LOAD_ALL_ABSENSI_MEMBER_SUCCESS',
  LOAD_ALL_ABSENSI_MEMBER_FAILURE: 'LOAD_ALL_ABSENSI_MEMBER_FAILURE',
  LOAD_ALL_ABSENSI_INSTRUKTUR_START: 'LOAD_ALL_ABSENSI_INSTRUKTUR_START',
  LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS: 'LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS',
  LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE: 'LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE',
  ADD_ABSENSI_MEMBER_START: 'ADD_ABSENSI_MEMBER_START',
  ADD_ABSENSI_MEMBER_SUCCESS: 'ADD_ABSENSI_MEMBER_SUCCESS',
  ADD_ABSENSI_MEMBER_FAILURE: 'ADD_ABSENSI_MEMBER_FAILURE',
  ADD_ABSENSI_INSTURKTUR_START: 'ADD_ABSENSI_INSTURKTUR_START',
  ADD_ABSENSI_INSTURKTUR_SUCCESS: 'ADD_ABSENSI_INSTURKTUR_SUCCESS',
  ADD_ABSENSI_INSTURKTUR_FAILURE: 'ADD_ABSENSI_INSTURKTUR_FAILURE',
}

export type AbsensiState = {
  allAbsensiMember: Array<AbsensiMemberType> | null
  allAbsensiInstruktur: Array<AbsensiInstrukturType> | null
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type AbsensiMemberType = {
  id: string
  id_member: string
  tgl_absensi: string
  id_kelas: string
  use_membership: boolean
}
export type AbsensiInstrukturType = {
  id: string
  id_instruktur: string
  tgl_absensi: string
  id_kelas: string
}
