import { IUserData, TSignInResponse } from "../../interfaces/auth-interface";
import { EAuthActions } from "../actions/auth-actions/constants";
import { EStudentActions } from "../actions/student-actions/constants";

type TAuthState = {
  token: string;
  refreshToken: string;
  userData: IUserData | null;
};

const initialState: TAuthState = {
  token: "",
  refreshToken: "",
  userData: null,
};

const authReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TAuthState => {
  switch (action.type) {
    case EAuthActions.SIGN_IN_SUCCESS:
      return {
        ...action.payload,
      };
    case EStudentActions.UPDATE_STUDENT_SUCCESS: {
      if (action.payload.id === state.userData?.id) {
        return {
          ...state,
          userData: {
            ...state.userData,
            ...action.payload,
          },
        };
      }
      return { ...state };
    }
    default:
      return state;
  }
};

export default authReducer;
