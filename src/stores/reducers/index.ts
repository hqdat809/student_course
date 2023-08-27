import { combineReducers } from "redux";
import authReducer from "./auth-reducers";
import studentReducer from "./student-reducers";
import courseReducer from "./course-reducer";

const rootReducer = combineReducers({
  authUser: authReducer,
  students: studentReducer,
  courses: courseReducer,
});

export type TRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
