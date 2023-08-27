import {
  IStudentInfo,
  TEnrollCourseRequest,
  TUpdateStudentRequest,
} from "../../../interfaces/student-interface";
import { TCreateStudentRequest } from "./../../../interfaces/student-interface";
import { EStudentActions } from "./constants";
import {
  TCancelCourseAction,
  TCreateStudentAction,
  TDeleteStudentAction,
  TEnrollCourseAction,
  TGetStudentsAction,
  TUpdateStudentAction,
} from "./types";

export const getStudentsAction = (): TGetStudentsAction => ({
  type: EStudentActions.GET_STUDENTS,
});

export const getStudentsRequestAction = () => ({
  type: EStudentActions.GET_STUDENTS_REQUEST,
});

export const getStudentsSuccessAction = (payload: IStudentInfo[]) => ({
  type: EStudentActions.GET_STUDENTS_SUCCESS,
  payload,
});

export const getStudentsFailureAction = (error: any) => ({
  type: EStudentActions.GET_STUDENTS_FAILURE,
  payload: error,
});

export const createStudentAction = (
  payload: TCreateStudentRequest,
  cb: () => void
): TCreateStudentAction => ({
  type: EStudentActions.CREATE_STUDENT,
  payload,
  cb,
});

export const createStudentRequestAction = () => ({
  type: EStudentActions.CREATE_STUDENT_REQUEST,
});

export const createStudentFailureAction = (error: any) => ({
  type: EStudentActions.CREATE_STUDENT_FAILURE,
  error,
});

export const createStudentSuccessAction = (payload: IStudentInfo) => ({
  type: EStudentActions.CREATE_STUDENT_SUCCESS,
  payload,
});

export const updateStudentAction = (
  payload: TUpdateStudentRequest,
  cb?: () => void
): TUpdateStudentAction => ({
  type: EStudentActions.UPDATE_STUDENT,
  payload,
  cb,
});

export const updateStudentRequestAction = () => ({
  type: EStudentActions.UPDATE_STUDENT_REQUEST,
});

export const updateStudentFailureAction = (error: any) => ({
  type: EStudentActions.UPDATE_STUDENT_FAILURE,
  error,
});

export const updateStudentSuccessAction = (payload: IStudentInfo) => ({
  type: EStudentActions.UPDATE_STUDENT_SUCCESS,
  payload,
});

export const deleteStudentAction = (
  payload: number[],
  cb: () => void
): TDeleteStudentAction => ({
  type: EStudentActions.DELETE_STUDENT,
  payload,
  cb,
});

export const deleteStudentRequestAction = () => ({
  type: EStudentActions.DELETE_STUDENT_REQUEST,
});

export const deleteStudentFailureAction = (error: any) => ({
  type: EStudentActions.DELETE_STUDENT_FAILURE,
  error,
});

export const deleteStudentSuccessAction = () => ({
  type: EStudentActions.DELETE_STUDENT_SUCCESS,
});

export const enrollCourseAction = (
  payload: TEnrollCourseRequest,
  cb: () => void
): TEnrollCourseAction => ({
  type: EStudentActions.ENROLL_COURSE,
  payload,
  cb,
});

export const enrollCourseRequestAction = () => ({
  type: EStudentActions.ENROLL_COURSE_REQUEST,
});

export const enrollCourseFailureAction = (error: any) => ({
  type: EStudentActions.ENROLL_COURSE_FAILURE,
  error,
});

export const enrollCourseSuccessAction = () => ({
  type: EStudentActions.ENROLL_COURSE_SUCCESS,
});

export const cancelCourseAction = (
  payload: TEnrollCourseRequest,
  cb: () => void
): TCancelCourseAction => ({
  type: EStudentActions.CANCEL_COURSE,
  payload,
  cb,
});

export const cancelCourseRequestAction = () => ({
  type: EStudentActions.CANCEL_COURSE_REQUEST,
});

export const cancelCourseFailureAction = (error: any) => ({
  type: EStudentActions.CANCEL_COURSE_FAILURE,
  error,
});

export const cancelCourseSuccessAction = () => ({
  type: EStudentActions.CANCEL_COURSE_SUCCESS,
});
