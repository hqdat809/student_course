export interface ICourseResponse {
  id: number;
  name: string;
  students: IStudentData[];
}

export interface IStudentData {
  id: number;
  name: string;
  age: number;
  address: string;
  email: string;
  roles: Role[];
  username: string;
}

export interface ICreateUpdateCourseRequest {
  id?: number;
  name?: string;
}

export enum ECourseModalType {
  CREATE_COURSE = "CREATE_COURSE",
  UPDATE_COURSE = "UPDATE_COURSE",
}

export interface IGetCourseByPageRequest {
  pageNo: number;
  pageSize: number;
  name: string;
}

export interface ICoursesByPageResponse {
  content: ICourseResponse[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface Role {
  id: number;
  name: string;
}
