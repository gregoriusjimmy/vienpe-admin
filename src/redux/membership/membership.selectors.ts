import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { MembershipState } from './membership.types'

const selectMembership = (state: RootState): MembershipState => state.membership

export const selectAllMembership = createSelector(
  [selectMembership],
  (membership) => membership.allMembership
)

export const selectIsAllMembershipLoaded = createSelector(
  [selectMembership],
  (membership) => membership.isLoaded
)
