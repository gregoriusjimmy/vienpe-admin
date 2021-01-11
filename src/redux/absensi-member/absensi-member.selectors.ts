import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { AbsensiMemberState } from './absensi-member.types'

export const selectAbsensiMember = (state: RootState): AbsensiMemberState => state.absensiMember

export const selectAllAbsensiMember = createSelector(
  [selectAbsensiMember],
  (absensiMember) => absensiMember.allAbsensiMember
)

export const selectIsAbsensiMemberFetching = createSelector(
  [selectAbsensiMember],
  (absensiMember) => absensiMember.isFetching
)

export const selectIsAllAbsensiMemberLoaded = createSelector(
  [selectAbsensiMember],
  (absensiMember) => absensiMember.isLoaded
)
