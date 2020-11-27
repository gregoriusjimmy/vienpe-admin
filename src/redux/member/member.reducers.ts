import { MemberActionTypes } from './member.types'

const INITIAL_STATE = {
  allMemberData: null,
}

const memberReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MemberActionTypes.SET_ALL_MEMBER_DATA:
      return {
        ...state,
        allMemberData: action.payload,
      }
    default:
      return state
  }
}

export default memberReducer
