import { AdminActionTypes } from './admin.types'

const INITIAL_STATE = {
  currentAdmin: null,
  isFetcing: false,
}

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdminActionTypes.SET_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: action.payload,
      }
    default:
      return state
  }
}

export default adminReducer
