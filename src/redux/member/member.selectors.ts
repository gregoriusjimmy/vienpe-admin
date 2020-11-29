import { createSelector } from 'reselect'

const selectMember = (state) => state.member

export const selectAllMember = createSelector([selectMember], (member) => member.allMemberData)
