import {
  ICreateUpdateCourseRequest,
  IGetCourseByPageRequest,
} from "../interfaces/course-interface";
import { ApiClient } from "./api-clients";

export const getCourses = async () => {
  const response = await ApiClient.get(`/all-course`);

  return response.data;
};

export const createCourse = async (payload: ICreateUpdateCourseRequest) => {
  const response = await ApiClient.post(`/course/create`, payload);

  return response.data;
};

export const updateCourse = async (payload: ICreateUpdateCourseRequest) => {
  const response = await ApiClient.post(
    `/course/update/${payload.id}`,
    payload
  );

  return response.data;
};

export const deleteCourse = async (payload: number[]) => {
  const response = await ApiClient.delete(`/course/delete`, {
    data: { ids: payload },
  });

  return response.data;
};

export const getCoursesByPage = async (payload: IGetCourseByPageRequest) => {
  const response = await ApiClient.get(
    `/courses?name=${payload.name}&pageNo=${payload.pageNo}&pageSize=${payload.pageSize}`
  );

  return response.data;
};
