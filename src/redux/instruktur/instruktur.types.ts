export const InstrukturActionTypes = {
  LOAD_ALL_INSTRUKTUR_START: 'LOAD_ALL_INSTRUKTUR_START',
  LOAD_ALL_INSTRUKTUR_SUCCESS: 'LOAD_ALL_INSTRUKTUR_SUCCESS',
  LOAD_ALL_INSTRUKTUR_FAILURE: 'LOAD_ALL_INSTRUKTUR_FAILURE',
  ADD_INSTRUKTUR_START: 'ADD_INSTRUKTUR_START',
  ADD_INSTRUKTUR_SUCCESS: 'ADD_INSTRUKTUR_SUCCESS',
  ADD_INSTRUKTUR_FAILURE: 'ADD_INSTRUKTUR_FAILURE',
  UPDATE_INSTRUKTUR_START: 'UPDATE_INSTRUKTUR_START',
  UPDATE_INSTRUKTUR_SUCCESS: 'UPDATE_INSTRUKTUR_SUCCESS',
  UPDATE_INSTRUKTUR_FAILURE: 'UPDATE_INSTRUKTUR_FAILURE',
}

export type InstrukturState = {
  allInstruktur: null | []
  isFetching: boolean
  isLoaded: boolean
  errorMessage: undefined | string
}

export type InstrukturType = {
  id: string
  nama: string
  no_telp: string
  email: string | null
  tgl_lahir: string | null
}

export type InstrukturNameWithIdType = {
  id: string
  nama: string
}
