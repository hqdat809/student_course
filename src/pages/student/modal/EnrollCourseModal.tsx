import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/modal/Modal";
import Table from "../../../components/table/Table";
import { courseColumn } from "../../../components/table/table-constants";
import {
  ICourseResponse,
  IStudentData,
} from "../../../interfaces/course-interface";
import { TRootState } from "../../../stores/reducers";
import { Button } from "@mui/material";
import "./EnrollCourseModal.scss";
import { getCoursesAction } from "../../../stores/actions/course-actions";
import { IStudentInfo } from "../../../interfaces/student-interface";

interface IEnrollCourseModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  selectedStudent: IStudentInfo;
  onEnrollCourses: (studentId: number, courseIds: number[]) => void;
}

const EnrollCourseModal = ({
  isOpenModal,
  handleCloseModal,
  selectedStudent,
  onEnrollCourses,
}: IEnrollCourseModalProps) => {
  const dispatch = useDispatch();
  const [selectedCourses, setSelectedCourses] = useState<ICourseResponse[]>([]);
  const coursesData = useSelector((state: TRootState) =>
    state.courses.courses.filter(
      (course: ICourseResponse) =>
        !course.students.some(
          (student: IStudentData) => student.id === selectedStudent?.id
        )
    )
  );

  const onCloseModal = () => {
    setSelectedCourses([]);
    handleCloseModal();
  };

  const onClickEnroll = () => {
    handleCloseModal();
    const courseIds = selectedCourses.map((course) => course.id);
    onEnrollCourses(selectedStudent.id, courseIds);
  };

  useEffect(() => {
    dispatch(getCoursesAction());
  }, []);

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={onCloseModal}
      title="Enroll Course"
    >
      <div className="EnrollCourseModal">
        <Table
          columns={courseColumn}
          rows={coursesData}
          isLoading={false}
          setSelection={setSelectedCourses}
        />
        <div className="EnrollCourseModal__actions">
          <Button
            variant="contained"
            size="large"
            color="secondary"
            disabled={selectedCourses.length === 0}
            onClick={onClickEnroll}
          >
            Enroll
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EnrollCourseModal;
