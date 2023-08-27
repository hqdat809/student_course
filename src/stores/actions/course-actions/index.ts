import {
  ICourseResponse,
  ICoursesByPageResponse,
  ICreateUpdateCourseRequest,
  IGetCourseByPageRequest,
} from "../../../interfaces/course-interface";
import { ECourseAction } from "./constants";
import {
  TCreateCoursesAction,
  TDeleteCourseAction,
  TGetCoursesAction,
  TGetCoursesByPageAction,
  TUpdateCourseAction,
} from "./types";

export const getCoursesAction = (): TGetCoursesAction => ({
  type: ECourseAction.GET_COURSES,
});

export const getCoursesRequestAction = () => ({
  type: ECourseAction.GET_COURSES_REQUEST,
});

export const getCoursesSuccessAction = (payload: ICourseResponse[]) => ({
  type: ECourseAction.GET_COURSES_SUCCESS,
  payload,
});

export const getCoursesFailureAction = (error: any) => ({
  type: ECourseAction.GET_COURSES_FAILURE,
  payload: error,
});

export const createCourseAction = (
  payload: ICreateUpdateCourseRequest,
  cb?: () => void
): TCreateCoursesAction => ({
  type: ECourseAction.CREATE_COURSE,
  payload,
  cb,
});

export const createCourseRequestAction = () => ({
  type: ECourseAction.CREATE_COURSE_REQUEST,
});

export const createCourseSuccessAction = () => ({
  type: ECourseAction.CREATE_COURSE_SUCCESS,
});

export const createCourseFailureAction = (error: any) => ({
  type: ECourseAction.CREATE_COURSE_FAILURE,
  payload: error,
});

export const updateCourseAction = (
  payload: ICreateUpdateCourseRequest,
  cb?: () => void
): TUpdateCourseAction => ({
  type: ECourseAction.UPDATE_COURSE,
  payload,
  cb,
});

export const updateCourseRequestAction = () => ({
  type: ECourseAction.UPDATE_COURSE_REQUEST,
});

export const updateCourseSuccessAction = () => ({
  type: ECourseAction.UPDATE_COURSE_SUCCESS,
});

export const updateCourseFailureAction = (error: any) => ({
  type: ECourseAction.UPDATE_COURSE_FAILURE,
  payload: error,
});

export const deleteCourseAction = (
  payload: number[],
  cb?: () => void
): TDeleteCourseAction => ({
  type: ECourseAction.DELETE_COURSE,
  payload,
  cb,
});

export const deleteCourseRequestAction = () => ({
  type: ECourseAction.DELETE_COURSE_REQUEST,
});

export const deleteCourseSuccessAction = () => ({
  type: ECourseAction.DELETE_COURSE_SUCCESS,
});

export const deleteCourseFailureAction = (error: any) => ({
  type: ECourseAction.DELETE_COURSE_FAILURE,
  payload: error,
});

export const getCourseByPageAction = (
  payload: IGetCourseByPageRequest
): TGetCoursesByPageAction => ({
  type: ECourseAction.GET_COURSES_BY_PAGE,
  payload,
});

export const getCourseByPageRequestAction = () => ({
  type: ECourseAction.GET_COURSES_BY_PAGE_REQUEST,
});

export const getCourseByPageSuccessAction = (
  payload: ICoursesByPageResponse
) => ({
  type: ECourseAction.GET_COURSES_BY_PAGE_SUCCESS,
  payload,
});

export const getCourseByPageFailureAction = (error: any) => ({
  type: ECourseAction.GET_COURSES_BY_PAGE_FAILURE,
  payload: error,
});
