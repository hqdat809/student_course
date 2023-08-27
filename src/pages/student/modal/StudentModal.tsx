import React, { ReactElement } from "react";
import Modal from "../../../components/modal/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./StudentModal.scss";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {
  EStudentModalType,
  IStudentInfo,
  TCreateStudentRequest,
  TUpdateStudentRequest,
} from "../../../interfaces/student-interface";

interface IStudentModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  onAddStudent?: (values: TCreateStudentRequest) => void;
  onUpdateStudent?: (values: TUpdateStudentRequest) => void;
  studentModalType?: EStudentModalType;
  selectedStudent?: IStudentInfo;
}

const StudentModal = ({
  isOpenModal,
  handleCloseModal,
  onAddStudent,
  onUpdateStudent,
  studentModalType,
  selectedStudent,
}: IStudentModalProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required"),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const updateValidationSchema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string().nullable(),
    age: Yup.number().nullable(),
    address: Yup.string().nullable(),
    email: Yup.string().email("Email not valid!!").nullable(),
    password: Yup.string().nullable(),
  });

  const handleSubmit = (
    values: TCreateStudentRequest | TUpdateStudentRequest,
    actions: any
  ) => {
    if (studentModalType === EStudentModalType.CREATE_STUDENT) {
      onAddStudent?.(values as TCreateStudentRequest);
    } else if (studentModalType === EStudentModalType.UPDATE_STUDENT) {
      Object.keys(values as TUpdateStudentRequest).map((key) => {
        if (
          (values as TUpdateStudentRequest)[
            key as keyof TUpdateStudentRequest
          ] === "" ||
          null
        ) {
          (values as TUpdateStudentRequest)[
            key as keyof TUpdateStudentRequest
          ] = (selectedStudent as never)[key];
        }
      });
      onUpdateStudent?.(values as TUpdateStudentRequest);
    }
    console.log(values);
    handleCloseModal();
    actions.resetForm();
  };

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={handleCloseModal}
      title={
        studentModalType === EStudentModalType.CREATE_STUDENT
          ? "Add Student Modal"
          : "Update Student Modal"
      }
    >
      <div className="StudentModal__form">
        <Formik
          initialValues={
            studentModalType === EStudentModalType.CREATE_STUDENT
              ? {
                  email: "",
                  password: "",
                  name: "",
                  age: 0,
                  address: "",
                }
              : {
                  id: selectedStudent?.id || 0,
                  email: selectedStudent?.email || null,
                  name: selectedStudent?.name || null,
                  age: selectedStudent?.age || null,
                  address: selectedStudent?.address || null,
                  password: null,
                }
          }
          validationSchema={
            studentModalType === EStudentModalType.CREATE_STUDENT
              ? validationSchema
              : updateValidationSchema
          }
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            return (
              <Form>
                <div className="StudentModal__form-field-row">
                  <div className="StudentModal__form-field">
                    <TextField
                      variant="outlined"
                      label="Student's name"
                      size="small"
                      type="text"
                      name="name"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.name}
                      className={`form-control ${
                        formikProps.errors.name &&
                        formikProps.touched.name &&
                        "StudentModal__form-error"
                      }`}
                      placeholder="Enter student name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="StudentModal__form-error-text"
                    />
                  </div>
                  <div className="StudentModal__form-field">
                    <TextField
                      variant="outlined"
                      size="small"
                      label="Age"
                      onChange={formikProps.handleChange}
                      onBlur={formikProps.handleBlur}
                      value={formikProps.values.age}
                      type="number"
                      name="age"
                      className={`form-control ${
                        formikProps.errors.age &&
                        formikProps.touched.age &&
                        "StudentModal__form-error"
                      }`}
                      placeholder="Enter student'age"
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="StudentModal__form-error-text"
                    />
                  </div>
                </div>
                <div className="StudentModal__form-field">
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Address"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.address}
                    type="text"
                    name="address"
                    className={`form-control ${
                      formikProps.errors.address &&
                      formikProps.touched.address &&
                      "StudentModal__form-error"
                    }`}
                    placeholder="Enter student's address"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="StudentModal__form-error-text"
                  />
                </div>

                <div className="StudentModal__form-field">
                  <TextField
                    variant="outlined"
                    size="small"
                    label="Email"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.email}
                    type="email"
                    name="email"
                    className={`form-control ${
                      formikProps.errors.email &&
                      formikProps.touched.email &&
                      "StudentModal__form-error"
                    }`}
                    placeholder="Enter a valid email address"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="StudentModal__form-error-text"
                  />
                </div>

                <div className="StudentModal__form-field">
                  <TextField
                    variant="outlined"
                    label="Password"
                    size="small"
                    onChange={formikProps.handleChange}
                    onBlur={formikProps.handleBlur}
                    value={formikProps.values.password}
                    type="password"
                    name="password"
                    className={`form-control ${
                      formikProps.errors.password &&
                      formikProps.touched.password &&
                      "StudentModal__form-error"
                    }`}
                    placeholder="Enter password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="StudentModal__form-error-text"
                  />
                </div>
                <div className="StudentModal__form-action">
                  {studentModalType === EStudentModalType.CREATE_STUDENT ? (
                    <Button type="submit" variant="contained">
                      Add Student
                    </Button>
                  ) : (
                    <Button type="submit" variant="contained">
                      Update Student
                    </Button>
                  )}
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Modal>
  );
};

export default StudentModal;
