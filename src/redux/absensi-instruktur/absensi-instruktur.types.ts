export const AbsensiInstrukturActionTypes = {
  LOAD_ALL_ABSENSI_INSTRUKTUR_START: 'LOAD_ALL_ABSENSI_INSTRUKTUR_START',
  LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS: 'LOAD_ALL_ABSENSI_INSTRUKTUR_SUCCESS',
  LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE: 'LOAD_ALL_ABSENSI_INSTRUKTUR_FAILURE',
  ADD_ABSENSI_INSTURKTUR_START: 'ADD_ABSENSI_INSTURKTUR_START',
  ADD_ABSENSI_INSTURKTUR_SUCCESS: 'ADD_ABSENSI_INSTURKTUR_SUCCESS',
  ADD_ABSENSI_INSTURKTUR_FAILURE: 'ADD_ABSENSI_INSTURKTUR_FAILURE',
}

export type AbsensiInstrukturState = {
  allAbsensiInstruktur: Array<AbsensiInstrukturViewType> | null
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type AbsensiInstrukturViewType = {
  id: string
  nama: string
  tgl_absensi: string
  hari: string
  jam: string
  kategori_senam: string
}

export type AbsensiInstrukturType = {
  id: string
  id_instruktur: string
  tgl_absensi: string
  id_kelas: string
}
