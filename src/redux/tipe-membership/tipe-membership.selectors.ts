import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { TipeMembershipState } from './tipe-membership.types'
const selectTipeMembership = (state: RootState): TipeMembershipState => state.tipeMembership

export const selectAllTipeMembership = createSelector([selectTipeMembership], (tipeMembership) =>
  tipeMembership.allTipeMembership ? tipeMembership.allTipeMembership : null
)

export const selectIsAllTipeMembershipFetching = createSelector(
  [selectTipeMembership],
  (tipeMembership) => tipeMembership.isFetching
)

export const selectIsAllTipeMembershipLoaded = createSelector(
  [selectTipeMembership],
  (tipeMembership) => !!tipeMembership.allTipeMembership
)

export const selectTipeMembershipErrorMessage = createSelector(
  [selectTipeMembership],
  (tipeMembership) => tipeMembership.errorMessage
)
