import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { InstrukturState, InstrukturType } from './instruktur.types'

export const selectInstruktur = (state: RootState): InstrukturState => state.instruktur

export const selectAllInstruktur = createSelector(
  [selectInstruktur],
  (instruktur) => instruktur.allInstruktur
)

export const selectIsInstrukturFetching = createSelector(
  [selectInstruktur],
  (instruktur) => instruktur.isFetching
)

export const selectIsAllInstrukturLoaded = createSelector(
  [selectInstruktur],
  (instruktur) => instruktur.isLoaded
)

export const selectAllInstrukturNameWithId = createSelector(
  [selectAllInstruktur],
  (allInstruktur) => {
    if (!allInstruktur) return null
    return allInstruktur.map((instruktur: InstrukturType) => ({
      id: instruktur.id,
      nama: instruktur.nama,
    }))
  }
)

export const selectInstrukturErrorMessage = createSelector(
  [selectInstruktur],
  (instruktur) => instruktur.errorMessage
)
