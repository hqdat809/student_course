import { IStudentInfo } from "../../interfaces/student-interface";
import { EStudentActions } from "../actions/student-actions/constants";

type TStudentState = {
  students: IStudentInfo[];
};

const initialState: TStudentState = {
  students: [],
};

const studentReducer = (
  state = initialState,
  action: { type: string; payload: any }
): TStudentState => {
  switch (action.type) {
    case EStudentActions.GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };
    default:
      return state;
  }
};

export default studentReducer;
