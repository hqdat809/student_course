import {
  ICourseResponse,
  ICoursesByPageResponse,
} from "../../interfaces/course-interface";
import { ECourseAction } from "../actions/course-actions/constants";

type TCourseState = {
  courses: ICourseResponse[];
  coursesByPage: ICoursesByPageResponse | null;
};

const initialState: TCourseState = {
  courses: [],
  coursesByPage: null,
};

const courseReducer = (
  state = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case ECourseAction.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
      };
    case ECourseAction.GET_COURSES_BY_PAGE_SUCCESS:
      return {
        ...state,
        coursesByPage: action.payload,
      };
    default:
      return state;
  }
};

export default courseReducer;
