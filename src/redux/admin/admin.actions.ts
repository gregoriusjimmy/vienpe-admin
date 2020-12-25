import { fetchPost, getErrorMessage } from '../../fetch/fetch'
import { AdminActionTypes } from './admin.types'

export const setCurrentAdminStart = () => ({
  type: AdminActionTypes.SET_CURRENT_ADMIN_START,
})

export const setCurrentAdminSuccess = (admin) => ({
  type: AdminActionTypes.SET_CURRENT_ADMIN_SUCCESS,
  payload: admin,
})

export const SetCurrentAdminFailure = (errorMessage) => ({
  type: AdminActionTypes.SET_CURRENT_ADMIN_FAILURE,
  payload: errorMessage,
})

export const SetCurrentAdminStartAsync = (admin) => {
  return (dispatch) => {
    dispatch(setCurrentAdminStart())
    fetchPost(process.env.REACT_APP_ADMIN_LOGIN_URL, admin)
      .then((response) => {
        dispatch(setCurrentAdminSuccess(response.data))
      })
      .catch((error) => {
        const errorMessage = getErrorMessage(error)
        dispatch(SetCurrentAdminFailure(errorMessage))
        alert(errorMessage)
      })
  }
}

export const logoutCurrentAdmin = () => ({
  type: AdminActionTypes.LOGOUT_CURRENT_ADMIN,
})
