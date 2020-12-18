import { RootState } from '../root-reducer'
import { NotificationState } from './notification.types'

export const selectNotification = (state: RootState): NotificationState => state.notification
