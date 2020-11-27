import { combineReducers } from 'redux'

import adminReducer from './admin/admin.reducer'
import memberReducer from './member/member.reducers'
import membershipReducer from './membership/membership.reducers'
// rootReducer
export default combineReducers({
  admin: adminReducer,
  member: memberReducer,
  membership: membershipReducer,
})
