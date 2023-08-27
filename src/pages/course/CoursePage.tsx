import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/course-card/CourseCard";
import { ICourseResponse } from "../../interfaces/course-interface";
import { TEnrollCourseRequest } from "../../interfaces/student-interface";
import {
  getCourseByPageAction,
  getCoursesAction,
} from "../../stores/actions/course-actions";
import { enrollCourseAction } from "../../stores/actions/student-actions";
import { TRootState } from "../../stores/reducers";
import "./CoursePage.scss";
import { Pagination } from "antd";
import type { PaginationProps } from "antd";
import SearchButton from "../../components/search-button/SearchButton";
import _ from "lodash";
import Skeleton from "@mui/material/Skeleton";

const CoursePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: TRootState) => state.authUser.userData);
  const coursesData = useSelector(
    (state: TRootState) => state.courses.coursesByPage
  );
  const [isLoading, setIsLoading] = useState<boolean>();
  const [pageNo, setPageNo] = useState<number>(0);
  const [searching, setSearching] = useState("");

  const handleDispatchGetCourses = () => {
    dispatch(
      getCourseByPageAction({
        pageNo: pageNo === 0 ? pageNo : pageNo - 1,
        pageSize: 12,
        name: "",
      })
    );
  };

  const handleEnrollCourse = (courseId: number) => {
    const payloadEnroll: TEnrollCourseRequest = {
      studentId: userData?.id || 0,
      courseIds: [courseId],
    };
    dispatch(enrollCourseAction(payloadEnroll, handleDispatchGetCourses));
  };

  const handleChangePage: PaginationProps["onChange"] = (
    pageNum: number,
    pageSize: number
  ) => {
    setPageNo(pageNum);
    dispatch(
      getCourseByPageAction({ pageNo: pageNum - 1, pageSize, name: "" })
    );
  };

  const handleSearchCourse = (text: string) => {
    setSearching(text);
    dispatch(getCourseByPageAction({ pageNo: 0, pageSize: 12, name: text }));
  };

  const debounceSearch = _.debounce(handleSearchCourse, 300);

  useEffect(() => {
    dispatch(getCourseByPageAction({ pageNo: pageNo, pageSize: 12, name: "" }));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, [coursesData]);

  return (
    <div className="CoursePage">
      <div className="CoursePage__actions">
        <div className="CoursePage__search">
          {searching && (
            <div className="CoursePage__text">{`Searching "${searching}"...`}</div>
          )}
          <SearchButton onSearch={debounceSearch} />
        </div>
      </div>
      <div className="CoursePage__list">
        <div className="row">
          {!isLoading
            ? coursesData?.content?.map((course: ICourseResponse) => (
                <div className="col-4">
                  <CourseCard
                    courseData={course}
                    onEnrollCourse={handleEnrollCourse}
                  />
                </div>
              ))
            : new Array(12).fill(0).map((i) => (
                <div className="col-4">
                  <Skeleton variant="rectangular" height={150} />
                  <div>
                    <Skeleton height={25} />
                    <Skeleton width="60%" />
                  </div>
                </div>
              ))}
        </div>
      </div>
      <div className="CoursePage__pagination">
        <Pagination
          defaultCurrent={1}
          total={coursesData?.totalElements}
          showSizeChanger={false}
          pageSize={12}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default CoursePage;
