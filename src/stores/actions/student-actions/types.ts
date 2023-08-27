import {
  TCreateStudentRequest,
  TEnrollCourseRequest,
  TUpdateStudentRequest,
} from "../../../interfaces/student-interface";
import { EStudentActions } from "./constants";

export type TGetStudentsAction = {
  type: EStudentActions.GET_STUDENTS;
};

export type TCreateStudentAction = {
  type: EStudentActions.CREATE_STUDENT;
  payload: TCreateStudentRequest;
  cb?: () => void;
};

export type TUpdateStudentAction = {
  type: EStudentActions.UPDATE_STUDENT;
  payload: TUpdateStudentRequest;
  cb?: () => void;
};

export type TDeleteStudentAction = {
  type: EStudentActions.DELETE_STUDENT;
  payload: number[];
  cb?: () => void;
};

export type TEnrollCourseAction = {
  type: EStudentActions.ENROLL_COURSE;
  payload: TEnrollCourseRequest;
  cb?: () => void;
};

export type TCancelCourseAction = {
  type: EStudentActions.CANCEL_COURSE;
  payload: TEnrollCourseRequest;
  cb?: () => void;
};
