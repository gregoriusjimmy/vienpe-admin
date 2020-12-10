import { MemberActionTypes, MemberState } from './member.types'

const INITIAL_STATE: MemberState = {
  allMember: null,
  isFetching: false,
  isLoaded: false,
  isAdding: false,
  isUpdating: false,
  errorMessage: undefined,
}

const memberReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case MemberActionTypes.LOAD_ALL_MEMBER_START:
      return {
        ...state,
        errorMessage: undefined,
        isLoaded: false,
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

    case MemberActionTypes.ADD_MEMBER_START:
      return {
        ...state,
        isAdding: true,
      }

    case MemberActionTypes.ADD_MEMBER_SUCCESS:
      const id = state.allMember?.slice(-1)[0]['id']! + 1
      return {
        ...state,
        isAdding: false,
        allMember: [...state.allMember!, { id: id, ...action.payload }],
      }

    case MemberActionTypes.ADD_MEMBER_FAILURE:
      return {
        ...state,
        isAdding: false,
        errorMessage: action.payload,
      }
    // case MemberActionTypes.UPDATE_MEMBER_START:
    //   return{
    //     ...state,
    //     isUpdating: true
    //   }

    // case MemberActionTypes.UPDATE_MEMBER_SUCCESS:
    //   return{
    //     ...state,
    //     isUpdating: false,
    //     allMember:
    //   }
    default:
      return state
  }
}

export default memberReducer
