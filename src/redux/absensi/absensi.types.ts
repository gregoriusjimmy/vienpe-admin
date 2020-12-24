export const AbsensiActionTypes = {
  LOAD_ALL_ABSENSI_START: 'LOAD_ALL_ABSENSI_START',
  LOAD_ALL_ABSENSI_SUCCESS: 'LOAD_ALL_ABSENSI_SUCCESS',
  LOAD_ALL_ABSENSI_FAILURE: 'LOAD_ALL_ABSENSI_FAILURE',
  ADD_ABSENSI_START: 'ADD_ABSENSI_START',
  ADD_ABSENSI_SUCCESS: 'ADD_ABSENSI_SUCCESS',
  ADD_ABSENSI_FAILURE: 'ADD_ABSENSI_FAILURE',
}

export type AbsensiState = {
  allAbsensi: null | []
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type AbsensiType = {
  nama: string
  tgl_absensi: string
  hari: string
  jam: string
  kategori_senam: string
  instruktur: string
  status_membership: boolean | string
  use_membership: boolean | string
}
