import { combineReducers } from 'redux'

import adminReducer from './admin/admin.reducer'
import memberReducer from './member/member.reducers'
import membershipReducer from './membership/membership.reducers'
import tipeMembershipReducer from './tipe-membership/tipe-membership.reducer'
// rootReducer
export default combineReducers({
  admin: adminReducer,
  member: memberReducer,
  membership: membershipReducer,
  tipeMembership: tipeMembershipReducer,
})
