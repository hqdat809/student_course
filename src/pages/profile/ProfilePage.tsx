import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { Button } from "@mui/material";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Table from "../../components/table/Table";
import { courseColumn } from "../../components/table/table-constants";
import { IUserData } from "../../interfaces/auth-interface";
import {
  ICourseResponse,
  IStudentData,
} from "../../interfaces/course-interface";
import {
  EEditProfileField,
  TEnrollCourseRequest,
  TUpdateStudentRequest,
} from "../../interfaces/student-interface";
import { getCoursesAction } from "../../stores/actions/course-actions";
import { TRootState } from "../../stores/reducers";
import { upperCaseFirstChart } from "../../utils/common-utils";
import "./ProfilePage.scss";
import {
  cancelCourseAction,
  updateStudentAction,
} from "../../stores/actions/student-actions";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<ICourseResponse[]>([]);
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const coursesData = useSelector((state: TRootState) =>
    state.courses.courses.filter((cour: ICourseResponse) =>
      cour.students.some((student: IStudentData) => student.id === userData?.id)
    )
  );
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    age: Yup.number().required("Age is required").min(0).max(200),
    address: Yup.string().required("Address is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });
  const handleSubmit = (values: TUpdateStudentRequest, actions: any) => {
    console.log(actions.dirty);
    const payload = {
      id: userData?.id || 0,
      ...values,
    };
    dispatch(updateStudentAction(payload));
    // actions.setValues(values);
    setIsEdit(false);
  };

  const handleDispatchGetCourses = () => {
    dispatch(getCoursesAction());
  };

  const handleCancelCourse = () => {
    const payload: TEnrollCourseRequest = {
      studentId: userData?.id || 0,
      courseIds: selectedCourses.map((course) => course.id),
    };
    dispatch(cancelCourseAction(payload, handleDispatchGetCourses));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    handleDispatchGetCourses();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const renderProfileField = (
    label: EEditProfileField,
    formikProps: FormikProps<any>
  ) => {
    return (
      <div className="ProfilePage__field">
        <div className="ProfilePage__label">{upperCaseFirstChart(label)}: </div>
        {isEdit ? (
          <div className="ProfilePage__editing">
            <Field
              name={label.toLowerCase()}
              type={typeof userData?.[label.toLowerCase() as keyof IUserData]}
              className={`${
                formikProps.errors[label.toLowerCase()] ? "Error-field" : ""
              } ProfilePage__editField`}
            />
            <div className="ProfilePage__error">
              {formikProps.errors[label.toLowerCase()] &&
                `${formikProps.errors[label.toLowerCase()]}`}
            </div>
          </div>
        ) : (
          <div className="ProfilePage__value">{`${
            userData?.[label.toLowerCase() as keyof IUserData]
          }`}</div>
        )}
      </div>
    );
  };

  return (
    <div className="ProfilePage">
      <div className="ProfilePage__info">
        <div className="ProfilePage__title">Profile Student</div>
        <div className="ProfilePage__content">
          <Formik
            initialValues={{
              name: userData?.name,
              email: userData?.email,
              age: userData?.age,
              address: userData?.address,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => {
              return (
                <Form>
                  {isEdit ? (
                    <div className="ProfilePage__confirm">
                      <Button
                        color="success"
                        type="submit"
                        disabled={!formikProps.dirty}
                      >
                        <CheckRoundedIcon />
                      </Button>
                      <Button
                        color="error"
                        onClick={() => {
                          setIsEdit(false);
                          formikProps.setValues({
                            name: userData?.name,
                            age: userData?.age,
                            address: userData?.address,
                            email: userData?.email,
                          });
                        }}
                      >
                        <CloseRoundedIcon />
                      </Button>
                    </div>
                  ) : (
                    <div
                      className="ProfilePage__editIcon"
                      onClick={() => {
                        setIsEdit(true);
                        console.log(userData);
                      }}
                    >
                      <EditRoundedIcon sx={{ width: "22px", height: "22px" }} />
                    </div>
                  )}
                  {Object.keys(EEditProfileField).map((key) =>
                    renderProfileField(key as EEditProfileField, formikProps)
                  )}
                </Form>
              );
            }}
          </Formik>
          <div className="ProfilePage__field">
            <div className="ProfilePage__label">Role: </div>
            <div className="ProfilePage__value">{userData?.roles[0].name}</div>
          </div>
        </div>
      </div>
      <div className="ProfilePage__course">
        <div className="ProfilePage__title">Enrolled Course</div>
        <Table
          columns={courseColumn}
          rows={coursesData}
          isLoading={isLoading}
          setSelection={setSelectedCourses}
        />
        <div className="ProfilePage__course-actions">
          <Button
            color="error"
            variant="contained"
            disabled={!selectedCourses.length}
            onClick={handleCancelCourse}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
