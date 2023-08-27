import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  ICourseResponse,
  ICoursesByPageResponse,
} from "../../interfaces/course-interface";
import {
  createCourse,
  deleteCourse,
  getCourses,
  getCoursesByPage,
} from "../../services/course-services";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import {
  createCourseFailureAction,
  createCourseRequestAction,
  createCourseSuccessAction,
  deleteCourseFailureAction,
  deleteCourseRequestAction,
  deleteCourseSuccessAction,
  getCourseByPageFailureAction,
  getCourseByPageRequestAction,
  getCourseByPageSuccessAction,
  getCoursesFailureAction,
  getCoursesRequestAction,
  getCoursesSuccessAction,
  updateCourseFailureAction,
  updateCourseRequestAction,
  updateCourseSuccessAction,
} from "../actions/course-actions";
import { ECourseAction } from "../actions/course-actions/constants";
import {
  TCreateCoursesAction,
  TDeleteCourseAction,
  TGetCoursesByPageAction,
  TUpdateCourseAction,
} from "../actions/course-actions/types";

function* getCoursesSaga() {
  try {
    yield put(getCoursesRequestAction());
    const response: ICourseResponse[] = yield call(getCourses);
    yield put(getCoursesSuccessAction(response));
  } catch (error: any) {
    yield put(getCoursesFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Get courses failure");
  }
}

function* createCoursesSaga({ payload, cb }: TCreateCoursesAction) {
  try {
    yield put(createCourseRequestAction());
    yield call(createCourse, payload);
    yield put(createCourseSuccessAction());
    cb?.();
    toastSuccess("Create course success");
  } catch (error: any) {
    yield put(createCourseFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Create courses failure");
  }
}

function* updateCoursesSaga({ payload, cb }: TUpdateCourseAction) {
  try {
    yield put(updateCourseRequestAction());
    yield call(createCourse, payload);
    yield put(updateCourseSuccessAction());
    cb?.();
    toastSuccess("Update course success");
  } catch (error: any) {
    yield put(updateCourseFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Update courses failure");
  }
}

function* deleteCoursesSaga({ payload, cb }: TDeleteCourseAction) {
  try {
    yield put(deleteCourseRequestAction());
    yield call(deleteCourse, payload);
    yield put(deleteCourseSuccessAction());
    cb?.();
    toastSuccess("Delete course success");
  } catch (error: any) {
    yield put(deleteCourseFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Delete courses failure");
  }
}

function* getCoursesByPageSaga({ payload }: TGetCoursesByPageAction) {
  try {
    yield put(getCourseByPageRequestAction());
    const response: ICoursesByPageResponse = yield call(
      getCoursesByPage,
      payload
    );
    yield put(getCourseByPageSuccessAction(response));
    // toastSuccess("Delete course success");
  } catch (error: any) {
    yield put(getCourseByPageFailureAction(error));
    (error as Error).message
      ? toastError((error as Error).message)
      : toastError("Delete courses failure");
  }
}

function* watchOnAuth() {
  yield takeLatest(ECourseAction.GET_COURSES, getCoursesSaga);
  yield takeLatest(ECourseAction.CREATE_COURSE, createCoursesSaga);
  yield takeLatest(ECourseAction.UPDATE_COURSE, updateCoursesSaga);
  yield takeLatest(ECourseAction.DELETE_COURSE, deleteCoursesSaga);
  yield takeLatest(ECourseAction.GET_COURSES_BY_PAGE, getCoursesByPageSaga);
}

export default function* courseSaga() {
  yield all([fork(watchOnAuth)]);
}
