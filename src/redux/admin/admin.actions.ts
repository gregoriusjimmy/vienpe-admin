import { AdminActionTypes } from './admin.types'

export const setCurrentAdmin = (admin) => ({
  type: AdminActionTypes.SET_CURRENT_ADMIN,
  payload: admin,
})
