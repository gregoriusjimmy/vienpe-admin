import { combineReducers } from 'redux';

import adminReducer from './admin/admin.reducer';

// rootReducer
export default combineReducers({
  admin: adminReducer,
});
