import { all, fork } from "redux-saga/effects";
import authSaga from "./auth-sagas";
import studentSaga from "./student-sagas";
import courseSaga from "./course-sagas";

export default function* rootSaga() {
  yield all([fork(authSaga), fork(studentSaga), fork(courseSaga)]);
}
