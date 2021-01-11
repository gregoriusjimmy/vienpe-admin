import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { AbsensiInstrukturState } from './absensi-instruktur.types'

export const selectAbsensiInstruktur = (state: RootState): AbsensiInstrukturState =>
  state.absensiInstruktur

export const selectAllAbsensiInstruktur = createSelector(
  [selectAbsensiInstruktur],
  (absensiInstruktur) => absensiInstruktur.allAbsensiInstruktur
)

export const selectIsAbsensiInstrukturFetching = createSelector(
  [selectAbsensiInstruktur],
  (absensiInstruktur) => absensiInstruktur.isFetching
)

export const selectIsAllAbsensiInstrukturLoaded = createSelector(
  [selectAbsensiInstruktur],
  (absensiInstruktur) => absensiInstruktur.isLoaded
)
