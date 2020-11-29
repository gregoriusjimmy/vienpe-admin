import MemberActionTypes from './member.types'

const INITIAL_STATE = {
  allMember: null,
  isFetching: false,
  errorMessage: undefined,
}

const memberReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MemberActionTypes.FETCH_ALL_MEMBER_START:
      return {
        ...state,
        isFetching: true,
      }

    case MemberActionTypes.FETCH_ALL_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        allMember: action.payload,
      }

    case MemberActionTypes.FETCH_ALL_MEMBER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default memberReducer
