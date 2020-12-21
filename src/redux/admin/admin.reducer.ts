import { AdminActionTypes } from './admin.types'

const INITIAL_STATE = {
  currentAdmin: null,
  isFetcing: false,
  errorMessage: undefined,
}

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AdminActionTypes.SET_CURRENT_ADMIN_START:
      return {
        ...state,
        isFetching: true,
      }
    case AdminActionTypes.SET_CURRENT_ADMIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        currentAdmin: action.payload,
      }
    case AdminActionTypes.SET_CURRENT_ADMIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case AdminActionTypes.LOGOUT_CURRENT_ADMIN:
      return {
        ...state,
        currentAdmin: null,
      }
    default:
      return state
  }
}

export default adminReducer
