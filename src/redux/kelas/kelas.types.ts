export const KelasActionTypes = {
  LOAD_ALL_KELAS_START: 'LOAD_ALL_KELAS_START',
  LOAD_ALL_KELAS_SUCCESS: 'LOAD_ALL_KELAS_SUCCESS',
  LOAD_ALL_KELAS_FAILURE: 'LOAD_ALL_KELAS_FAILURE',
  ADD_KELAS_START: 'ADD_KELAS_START',
  ADD_KELAS_SUCCESS: 'ADD_KELAS_SUCCESS',
  ADD_KELAS_FAILURE: 'ADD_KELAS_FAILURE',
  UPDATE_KELAS_AKTIF_START: 'UPDATE_KELAS_AKTIF_START',
  UPDATE_KELAS_AKTIF_SUCCESS: 'UPDATE_KELAS_AKTIF_SUCCESS',
  UPDATE_KELAS_AKTIF_FAILURE: 'UPDATE_KELAS_AKTIF_FAILURE',
}
export type KelasState = {
  allKelas: null | []
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type KelasType = {
  id: string
  id_instruktur: string
  kategori_senam: string
  hari: string
  jam: string
  aktif: string | boolean
  created_at: string | null
}
