import React, { useEffect } from "react";
import "./SignIn.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { signInAction } from "../../stores/actions/auth-actions";
import {
  EAuthToken,
  TAuthToken,
  TSignInRequest,
} from "../../interfaces/auth-interface";
import { toastError, toastSuccess } from "../../utils/notifications-utils";
import { handleStorageToken } from "../../utils/storage-utils";
import { Navigate, useNavigate } from "react-router-dom";
import { COURSE, STUDENT } from "../../routes/paths";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const accessToken = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

  const handleSignInSuccess = (tokens: TAuthToken) => {
    toastSuccess("Sign In Successfully!!!");
    handleStorageToken(tokens);
    // navigate
    navigate("/course");
  };

  const handleSignInFailed = (errorMessage: string) => {
    toastError(errorMessage);
  };

  const handleSubmit = (values: TSignInRequest, actions: any) => {
    console.log(values);
    dispatch(signInAction(values, handleSignInSuccess, handleSignInFailed));
    actions.setSubmitting(false);
    setTimeout(() => {
      actions.resetForm();
    }, 1000);
  };

  if (accessToken) {
    return <Navigate to={COURSE} replace />;
  }

  return (
    <div className="SignIn">
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {(formikProps) => (
                  <Form>
                    <div className="divider d-flex align-items-center my-4">
                      <div className="text-center fw-bold mx-3 mb-0">
                        Sign In
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <Field
                        type="email"
                        name="email"
                        id="form3Example3"
                        className={`form-control form-control-lg  ${
                          formikProps.errors.email &&
                          formikProps.touched.email &&
                          "login-error-field"
                        }`}
                        placeholder="Enter a valid email address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="login-error-text"
                      />
                    </div>

                    <div className="form-outline mb-3">
                      <Field
                        type="password"
                        name="password"
                        id="form3Example4"
                        className={`form-control form-control-lg  ${
                          formikProps.errors.password &&
                          formikProps.touched.password &&
                          "login-error-field"
                        }`}
                        placeholder="Enter password"
                      />
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="login-error-text"
                      />
                    </div>

                    {/* Remember ME */}
                    {/* <div className="d-flex justify-content-between align-items-center">
  <div className="form-check mb-0">
    <input
      className="form-check-input me-2"
      type="checkbox"
      value=""
      id="form2Example3"
    />
    <label
      className="form-check-label"
      htmlFor="form2Example3"
    >
      Remember me
    </label>
  </div>
  <a href="#!" className="text-body">
    Forgot password?
  </a>
</div> */}

                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg btn-login"
                      >
                        Login
                      </button>
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Don't have an account?{" "}
                        <a href="#!" className="link-danger">
                          Register
                        </a>
                      </p>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
