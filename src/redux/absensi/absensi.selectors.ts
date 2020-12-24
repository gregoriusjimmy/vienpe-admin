// import { createSelector } from 'reselect'
// import { RootState } from '../root-reducer'
// import { MemberState, MemberType } from './member.types'

// export const selectMember = (state: RootState): MemberState => state.member

// export const selectAllMember = createSelector([selectMember], (member) => member.allMember)

// export const selectIsMemberFetching = createSelector([selectMember], (member) => member.isFetching)

// export const selectIsAllMemberLoaded = createSelector([selectMember], (member) => member.isLoaded)

// export const selectAllMemberNameWithId = createSelector([selectAllMember], (allMember) => {
//   if (!allMember) return null
//   return allMember.map((member: MemberType) => ({ id: member.id, nama: member.nama }))
// })

// export const selectMemberErrorMessage = createSelector(
//   [selectMember],
//   (member) => member.errorMessage
// )
export {}
