import { AxiosError } from "axios";
import {
  IGetStudentsResponse,
  IStudentInfo,
} from "../../interfaces/student-interface";
import {
  cancelCourse,
  createStudent,
  deleteStudent,
  enrollCourse,
  getStudents,
  updateStudent,
} from "../../services/student-services";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import {
  cancelCourseFailureAction,
  cancelCourseRequestAction,
  cancelCourseSuccessAction,
  createStudentAction,
  createStudentFailureAction,
  createStudentRequestAction,
  createStudentSuccessAction,
  deleteStudentFailureAction,
  deleteStudentRequestAction,
  deleteStudentSuccessAction,
  enrollCourseFailureAction,
  enrollCourseRequestAction,
  enrollCourseSuccessAction,
  getStudentsFailureAction,
  getStudentsRequestAction,
  getStudentsSuccessAction,
  updateStudentFailureAction,
  updateStudentRequestAction,
  updateStudentSuccessAction,
} from "../actions/student-actions";
import { EStudentActions } from "../actions/student-actions/constants";
import {
  TCreateStudentAction,
  TDeleteStudentAction,
  TEnrollCourseAction,
  TGetStudentsAction,
  TUpdateStudentAction,
} from "./../actions/student-actions/types";
import { put, call, all, fork, takeLatest } from "redux-saga/effects";

function* getStudentsSaga() {
  try {
    yield put(getStudentsRequestAction());
    const response: IStudentInfo[] = yield call(getStudents);
    yield put(getStudentsSuccessAction(response));
  } catch (error: any) {
    yield put(getStudentsFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get students failure");
  }
}

function* createStudentSaga({ payload, cb }: TCreateStudentAction) {
  try {
    yield put(createStudentRequestAction());
    const response: IStudentInfo = yield call(createStudent, payload);
    yield put(createStudentSuccessAction(response));
    cb?.();
    toastSuccess("Create student success!");
  } catch (error: any) {
    yield put(createStudentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Create student failure");
  }
}

function* updateStudentSaga({ payload, cb }: TUpdateStudentAction) {
  try {
    yield put(updateStudentRequestAction());
    const response: IStudentInfo = yield call(updateStudent, payload);
    yield put(updateStudentSuccessAction(response));
    cb?.();
    toastSuccess("Update student success!");
  } catch (error: any) {
    yield put(updateStudentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Update student failure");
  }
}

function* deleteStudentSaga({ payload, cb }: TDeleteStudentAction) {
  try {
    yield put(deleteStudentRequestAction());
    yield call(deleteStudent, payload);
    yield put(deleteStudentSuccessAction());
    cb?.();
    toastSuccess("Delete student success");
  } catch (error: any) {
    yield put(deleteStudentFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Delete student failure");
  }
}

function* enrollCourseSaga({ payload, cb }: TEnrollCourseAction) {
  try {
    yield put(enrollCourseRequestAction());
    yield call(enrollCourse, payload);
    yield put(enrollCourseSuccessAction());
    cb?.();
    toastSuccess("Enroll courses success");
  } catch (error: any) {
    yield put(enrollCourseFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Enroll courses failure");
  }
}

function* cancelCourseSaga({ payload, cb }: TEnrollCourseAction) {
  try {
    yield put(cancelCourseRequestAction());
    yield call(cancelCourse, payload);
    yield put(cancelCourseSuccessAction());
    cb?.();
    toastSuccess("Cancel courses success");
  } catch (error: any) {
    yield put(cancelCourseFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Cancel courses failure");
  }
}

function* watchOnAuth() {
  yield takeLatest(EStudentActions.GET_STUDENTS, getStudentsSaga);
  yield takeLatest(EStudentActions.CREATE_STUDENT, createStudentSaga);
  yield takeLatest(EStudentActions.UPDATE_STUDENT, updateStudentSaga);
  yield takeLatest(EStudentActions.DELETE_STUDENT, deleteStudentSaga);
  yield takeLatest(EStudentActions.ENROLL_COURSE, enrollCourseSaga);
  yield takeLatest(EStudentActions.CANCEL_COURSE, cancelCourseSaga);
}

export default function* studentSaga() {
  yield all([fork(watchOnAuth)]);
}
