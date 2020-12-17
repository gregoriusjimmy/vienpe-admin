import { combineReducers } from 'redux'

import adminReducer from './admin/admin.reducer'
import memberReducer from './member/member.reducers'
import membershipReducer from './membership/membership.reducers'
import tipeMembershipReducer from './tipe-membership/tipe-membership.reducer'
import kelasReducer from './kelas/kelas.reducer'
import notificationReducer from './notification/notification.reducer'
// rootReducer
export const rootReducer = combineReducers({
  admin: adminReducer,
  member: memberReducer,
  membership: membershipReducer,
  tipeMembership: tipeMembershipReducer,
  kelas: kelasReducer,
  notification: notificationReducer,
})

export type RootState = ReturnType<typeof rootReducer>
