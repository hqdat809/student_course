export type TGetStudentRequest = {
  pageNo: number;
  pageSize: number;
};

export interface IGetStudentsResponse {
  content: IStudentInfo[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface IStudentInfo {
  id: number;
  name: string;
  age: number;
  address: string;
  email: string;
  courses: ICourse[];
}

export interface ICourse {
  id: number;
  name: string;
}

export type TCreateStudentRequest = {
  name: string;
  age: number;
  address: string;
  email: string;
  password: string;
};

export type TUpdateStudentRequest = {
  [x: string]: any;
  // id: number;
  // name: string | null;
  // age: number | null;
  // address: string | null;
  // email: string | null;
  // password: string | null;
};

export type TDeleteStudentRequest = {
  studentIds: number[];
};

export enum EStudentModalType {
  CREATE_STUDENT = "CREATE_STUDENT",
  UPDATE_STUDENT = "UPDATE_STUDENT",
}

export type TEnrollCourseRequest = {
  studentId: number;
  courseIds: number[];
};

export enum EEditProfileField {
  NAME = "NAME",
  AGE = "AGE",
  ADDRESS = "ADDRESS",
  EMAIL = "EMAIL",
}
