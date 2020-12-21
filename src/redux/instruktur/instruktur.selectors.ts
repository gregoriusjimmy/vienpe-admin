import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { InstrukturState } from './instruktur.types'

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

// export const selectAllMemberNameWithId = createSelector([selectAllMember], (allMember) => {
//   if (!allMember) return null
//   return allMember.map((member: MemberType) => ({ id: member.id, nama: member.nama }))
// })

export const selectInstrukturErrorMessage = createSelector(
  [selectInstruktur],
  (instruktur) => instruktur.errorMessage
)
