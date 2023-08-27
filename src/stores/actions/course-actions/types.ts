import {
  ICreateUpdateCourseRequest,
  IGetCourseByPageRequest,
} from "../../../interfaces/course-interface";
import { ECourseAction } from "./constants";

export type TGetCoursesAction = {
  type: ECourseAction.GET_COURSES;
};

export type TCreateCoursesAction = {
  type: ECourseAction.CREATE_COURSE;
  payload: ICreateUpdateCourseRequest;
  cb?: () => void;
};

export type TUpdateCourseAction = {
  type: ECourseAction.UPDATE_COURSE;
  payload: ICreateUpdateCourseRequest;
  cb?: () => void;
};

export type TDeleteCourseAction = {
  type: ECourseAction.DELETE_COURSE;
  payload: number[];
  cb?: () => void;
};

export type TGetCoursesByPageAction = {
  type: ECourseAction.GET_COURSES_BY_PAGE;
  payload: IGetCourseByPageRequest;
};
