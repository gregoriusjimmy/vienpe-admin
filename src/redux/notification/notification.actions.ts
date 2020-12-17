import { NotificationActionTypes } from './notification.types'

export const addSuccessNotificaiton = (successMessage: string) => ({
  type: NotificationActionTypes.ADD_SUCCESS_NOTIFICATION,
  payload: successMessage,
})

export const addErrorNotification = (errorMessage: string) => ({
  type: NotificationActionTypes.ADD_ERROR_NOTIFICATION,
  payload: errorMessage,
})
