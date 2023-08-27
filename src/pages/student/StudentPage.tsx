import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import { studentColumn } from "../../components/table/table-constants";
import {
  EStudentModalType,
  IStudentInfo,
  TCreateStudentRequest,
  TUpdateStudentRequest,
} from "../../interfaces/student-interface";
import {
  createStudentAction,
  deleteStudentAction,
  enrollCourseAction,
  getStudentsAction,
  updateStudentAction,
} from "../../stores/actions/student-actions";
import { TRootState } from "../../stores/reducers";
import { toastError } from "../../utils/notifications-utils";
import "./StudentPage.scss";
import EnrollCourseModal from "./modal/EnrollCourseModal";
import StudentModal from "./modal/StudentModal";
import { getCoursesAction } from "../../stores/actions/course-actions";

const StudentPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<IStudentInfo[]>([]);
  const [isOpenModalEnroll, setIsOpenModalAddEnroll] = useState(false);
  const [studentModalType, setStudentModalType] = useState<EStudentModalType>(
    EStudentModalType.CREATE_STUDENT
  );
  const studentsData = useSelector(
    (state: TRootState) => state.students.students
  );
  const profileData = useSelector(
    (state: TRootState) => state.authUser.userData
  );

  const handleOpenModalEnroll = () => {
    setIsOpenModalAddEnroll(true);
  };

  const handleCloseModalEnroll = () => {
    setIsOpenModalAddEnroll(false);
  };

  const handleOpenModalAdd = () => {
    setIsOpenModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setIsOpenModalAdd(false);
  };

  const handleDispatchGetStudents = () => {
    dispatch(getStudentsAction());
    console.log("call get students");
  };

  const handleAddStudent = (values: TCreateStudentRequest) => {
    console.log("dispatch: ", values);
    dispatch(createStudentAction(values, handleDispatchGetStudents));
  };

  const handleUpdateStudent = (values: TUpdateStudentRequest) => {
    console.log("dispatch: ", values);
    dispatch(updateStudentAction(values, handleDispatchGetStudents));
  };

  const handleClickCreate = () => {
    setStudentModalType(EStudentModalType.CREATE_STUDENT);
    handleOpenModalAdd();
  };

  const handleClickDelete = () => {
    const selectedStudentIds = selectedStudent.map((st) => st.id);

    if (selectedStudentIds.some((id) => id === profileData?.id)) {
      toastError("You can't delete this user");
    } else {
      dispatch(
        deleteStudentAction(selectedStudentIds, handleDispatchGetStudents)
      );
    }
  };

  const handleEnrollCourse = (studentId: number, courseIds: number[]) => {
    dispatch(
      enrollCourseAction({ studentId: studentId, courseIds: courseIds }, () => {
        handleDispatchGetStudents();
        dispatch(getCoursesAction());
      })
    );
  };

  const handleClickUpdate = () => {
    if (selectedStudent.length === 1) {
      // dispatch update
      setStudentModalType(EStudentModalType.UPDATE_STUDENT);
      handleOpenModalAdd();
    } else if (selectedStudent.length > 1) {
      toastError("Trust select 1 student to update!!");
    } else {
      toastError("You should select 1 student to update!!");
    }
  };

  useEffect(() => {
    handleDispatchGetStudents();
  }, []);

  useEffect(() => {
    console.log("loading change");
    console.log(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [studentsData]);

  return (
    <div className="StudentPage">
      <div className="StudentPage__actions">
        <div className="StudentPage__actions-left">
          <Button
            variant="outlined"
            disabled={selectedStudent.length > 1 || !selectedStudent.length}
            onClick={handleClickUpdate}
          >
            Update Student
          </Button>
          <Button variant="contained" onClick={handleClickCreate}>
            Create Student
          </Button>
        </div>
        <div className="StudentPage__actions-right">
          <Button
            variant="contained"
            color="secondary"
            onClick={handleOpenModalEnroll}
            disabled={selectedStudent.length > 1 || !selectedStudent.length}
          >
            Enroll
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={selectedStudent.length === 0}
            onClick={handleClickDelete}
          >
            Delete
          </Button>
        </div>
      </div>
      <Table
        columns={studentColumn}
        rows={studentsData}
        isLoading={isLoading}
        setSelection={setSelectedStudent}
      />
      <StudentModal
        isOpenModal={isOpenModalAdd}
        onAddStudent={handleAddStudent}
        onUpdateStudent={handleUpdateStudent}
        handleCloseModal={handleCloseModalAdd}
        studentModalType={studentModalType}
        selectedStudent={selectedStudent[0]}
      />
      <EnrollCourseModal
        isOpenModal={isOpenModalEnroll}
        handleCloseModal={handleCloseModalEnroll}
        selectedStudent={selectedStudent[0]}
        onEnrollCourses={handleEnrollCourse}
      />
    </div>
  );
};

export default StudentPage;
