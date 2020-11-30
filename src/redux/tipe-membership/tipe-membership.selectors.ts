import { createSelector } from 'reselect'

const selectTipeMembership = (state) => state.tipeMembership

export const selectAllTipeMembership = createSelector([selectTipeMembership], (tipeMembership) =>
  tipeMembership.allTipeMembership ? tipeMembership.allTipeMembership : null
)

export const selectIsAllTipeMembershipFetching = createSelector(
  [selectTipeMembership],
  (tipeMembership) => tipeMembership.isFetching
)

export const selectIsAllTipeMembershipLoaded = createSelector(
  [selectTipeMembership],
  (tipeMembership) => tipeMembership.isLoaded
)
