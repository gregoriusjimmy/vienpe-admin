import { AbsensiMemberState, AbsensiMemberActionTypes } from './absensi-member.types'

const INITIAL_STATE: AbsensiMemberState = {
  allAbsensiMember: null,
  isFetching: false,
  isLoaded: false,
  errorMessage: undefined,
}

const absensiMemberReducer = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
  switch (action.type) {
    case AbsensiMemberActionTypes.LOAD_ALL_ABSENSI_MEMBER_START:
      return {
        ...state,
        allAbsensiMember: null,
        isLoaded: false,
        isFetching: true,
      }

    case AbsensiMemberActionTypes.LOAD_ALL_ABSENSI_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isLoaded: true,
        errorMessage: undefined,
        allAbsensiMember: action.payload,
      }

    case AbsensiMemberActionTypes.LOAD_ALL_ABSENSI_MEMBER_FAILURE:
      return {
        ...state,
        isFetching: false,
        isLoaded: false,
        errorMessage: action.payload,
      }

    case AbsensiMemberActionTypes.ADD_ABSENSI_MEMBER_START:
      return {
        ...state,
        isFetching: true,
      }

    case AbsensiMemberActionTypes.ADD_ABSENSI_MEMBER_SUCCESS:
      return {
        ...state,
        isFetching: false,
        errorMessage: undefined,
        allAbsensiMember: [action.payload, ...state.allAbsensiMember!],
      }

    case AbsensiMemberActionTypes.ADD_ABSENSI_MEMBER_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }

    default:
      return state
  }
}

export default absensiMemberReducer
