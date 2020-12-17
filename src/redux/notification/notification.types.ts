export const NotificationActionTypes = {
  ADD_SUCCESS_NOTIFICATION: 'ADD_SUCCESS_NOTIFICATION',
  ADD_ERROR_NOTIFICATION: 'ADD_ERROR_NOTIFICATION',
}

export type NotificationState = {
  success: undefined | string
  error: undefined | string
}
