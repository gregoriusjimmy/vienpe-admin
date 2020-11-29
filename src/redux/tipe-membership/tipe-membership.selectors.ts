import { createSelector } from 'reselect'

const selectTipeMembership = (state) => state.tipeMembership

export const selectAllTipeMembership = createSelector(
  [selectTipeMembership],
  (tipeMembership) => tipeMembership.allTipeMembership
)
