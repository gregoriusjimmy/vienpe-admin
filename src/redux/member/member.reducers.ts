import { MemberActionTypes, MemberState, MemberType } from './member.types'

const INITIAL_STATE: MemberState = {
  allMember: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const memberReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case MemberActionTypes.LOAD_ALL_MEMBER_START:
      return {
        ...state,
        isLoaded: false,
        isFetching: true,
      }

    case MemberActionTypes.LOAD_ALL_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        errorMessage: undefined,
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
        isFetching: true,
      }

    case MemberActionTypes.ADD_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allMember: [...state.allMember!, action.payload],
      }

    case MemberActionTypes.ADD_MEMBER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case MemberActionTypes.UPDATE_MEMBER_START:
      return {
        ...state,
        isFetching: true,
      }

    case MemberActionTypes.UPDATE_MEMBER_SUCCESS:
      const index = state.allMember?.findIndex(
        (member: MemberType) => member.id === action.payload.id
      )
      const allNewMember: Array<MemberType> = [...state.allMember!]
      allNewMember[index!] = action.payload
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allMember: [...allNewMember],
      }

    case MemberActionTypes.UPDATE_MEMBER_FAILURE:
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
