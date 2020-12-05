import { createSelector } from 'reselect'
import { RootState } from '../root-reducer'
import { MemberState } from './member.types'

const selectMember = (state: RootState): MemberState => state.member

export const selectAllMember = createSelector([selectMember], (member) => member.allMember)

export const selectIsMemberFetching = createSelector([selectMember], (member) => member.isFetching)

export const selectIsAllMemberLoaded = createSelector([selectMember], (member) => member.isLoaded)

// export const selectNextMemberId = createSelector(
//   [selectAllMember],
//   (allMember) => allMember?.slice(-1)[0]['id']! + 1
// )
