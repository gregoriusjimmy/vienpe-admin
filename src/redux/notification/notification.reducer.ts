import { NotificationActionTypes, NotificationState } from './notification.types'

const INITIAL_STATE: NotificationState = {
  success: undefined,
  error: undefined,
}

const notificationReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case NotificationActionTypes.ADD_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: action.payload,
        error: undefined,
      }
    case NotificationActionTypes.ADD_ERROR_NOTIFICATION:
      return {
        ...state,
        success: undefined,
        error: action.payload,
      }
    default:
      return state
  }
}

export default notificationReducer
