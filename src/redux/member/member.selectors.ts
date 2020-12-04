import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { MemberState } from './member.types'

const selectMember = (state: RootState): MemberState => state.member

export const selectAllMember = createSelector([selectMember], (member) => member.allMember)

export const selectIsAllMemberLoaded = createSelector([selectMember], (member) => member.isLoaded)
