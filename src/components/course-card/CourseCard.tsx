import React, { useId } from "react";
import { ICourseResponse } from "../../interfaces/course-interface";
import "./CourseCard.scss";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { TRootState } from "../../stores/reducers";
import { IUserData } from "../../interfaces/auth-interface";

interface ICourseCardProps {
  courseData: ICourseResponse;
  onEnrollCourse: (courseId: number) => void;
}

const CourseCard = ({ courseData, onEnrollCourse }: ICourseCardProps) => {
  const userData = useSelector((state: TRootState) => state.authUser.userData);

  const isDisable = () => {
    return courseData.students.some((student) => student.id === userData?.id);
  };

  return (
    <div className="CourseCard">
      <div className="CourseCard__img"></div>
      <div className="CourseCard__info">
        <div className="CourseCard__name">{courseData.name}</div>
        <Button
          variant="contained"
          disabled={isDisable()}
          onClick={() => onEnrollCourse(courseData.id)}
          color="secondary"
        >
          {isDisable() ? "Enrolled" : "Enroll"}
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
