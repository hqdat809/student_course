import * as Yup from "yup";
import {
  ECourseModalType,
  ICourseResponse,
  ICreateUpdateCourseRequest,
} from "../../../interfaces/course-interface";
import Modal from "../../../components/modal/Modal";
import { ErrorMessage, Form, Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./CourseModal.scss";

interface ICourseModalProps {
  isOpenModal: boolean;
  handleCloseModal: () => void;
  onAddCourse?: (values: ICreateUpdateCourseRequest) => void;
  onUpdateCourse?: (values: ICreateUpdateCourseRequest) => void;
  courseModalType?: ECourseModalType;
  selectedCourse?: ICourseResponse;
}

const CourseModal = ({
  isOpenModal,
  handleCloseModal,
  onAddCourse,
  onUpdateCourse,
  courseModalType,
  selectedCourse,
}: ICourseModalProps) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const handleSubmit = (values: ICreateUpdateCourseRequest, actions: any) => {
    console.log(values);
    if (courseModalType === ECourseModalType.CREATE_COURSE) {
      onAddCourse?.(values);
    } else if (courseModalType === ECourseModalType.UPDATE_COURSE) {
      /// update course
      onUpdateCourse?.(values);
    }
    actions.resetForm();
    handleCloseModal();
  };

  return (
    <Modal
      open={isOpenModal}
      handleCloseModal={handleCloseModal}
      title="Add Course Modal"
    >
      <div className="StudentModal__form">
        <Formik
          initialValues={
            courseModalType === ECourseModalType.CREATE_COURSE
              ? { name: "" }
              : { id: selectedCourse?.id, name: selectedCourse?.name }
          }
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <Form>
              <div className="StudentModal__form-field-row">
                <div className="StudentModal__form-field">
                  <TextField
                    variant="outlined"
                    label="Course's name"
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
                    placeholder="Enter course name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="StudentModal__form-error-text"
                  />
                </div>
              </div>
              <div className="StudentModal__form-action">
                {courseModalType === ECourseModalType.CREATE_COURSE ? (
                  <Button type="submit" variant="contained">
                    Add Course
                  </Button>
                ) : (
                  <Button type="submit" variant="contained">
                    Update Course
                  </Button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default CourseModal;
