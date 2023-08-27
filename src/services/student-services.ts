import { AxiosError } from "axios";
import {
  TCreateStudentRequest,
  TEnrollCourseRequest,
  TUpdateStudentRequest,
} from "../interfaces/student-interface";
import { ApiClient } from "./api-clients";

export const getStudents = async () => {
  const response = await ApiClient.get(`/student`);

  return response.data;
};

export const createStudent = async (payload: TCreateStudentRequest) => {
  const response = await ApiClient.post("/student/create", payload);

  return response.data;
};

export const updateStudent = async (payload: TUpdateStudentRequest) => {
  const response = await ApiClient.put(
    `/student/update/${payload.id}`,
    payload
  );

  return response.data;
};

export const deleteStudent = async (payload: number[]) => {
  const response = await ApiClient.delete(`/student/delete`, {
    data: { ids: payload },
  });

  return response.data;
};

export const enrollCourse = async (payload: TEnrollCourseRequest) => {
  const response = await ApiClient.post(
    `/student/${payload.studentId}/register`,
    { ids: payload.courseIds }
  );

  return response.data;
};

export const cancelCourse = async (payload: TEnrollCourseRequest) => {
  const response = await ApiClient.post(
    `/student/${payload.studentId}/cancel`,
    { ids: payload.courseIds }
  );

  return response.data;
};
