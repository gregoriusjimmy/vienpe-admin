import MemberActionTypes from './member.types'

const INITIAL_STATE = {
  allMember: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const memberReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MemberActionTypes.LOAD_ALL_MEMBER_START:
      return {
        ...state,
        isFetching: true,
      }

    case MemberActionTypes.LOAD_ALL_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        allMember: action.payload,
      }

    case MemberActionTypes.LOAD_ALL_MEMBER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default memberReducer
