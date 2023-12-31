enum ECourseAction {
  GET_COURSES = "GET_COURSES",
  GET_COURSES_REQUEST = "GET_COURSES_REQUEST",
  GET_COURSES_SUCCESS = "GET_COURSES_SUCCESS",
  GET_COURSES_FAILURE = "GET_COURSES_FAILURE",

  CREATE_COURSE = "CREATE_COURSE",
  CREATE_COURSE_REQUEST = "CREATE_COURSE_REQUEST",
  CREATE_COURSE_SUCCESS = "CREATE_COURSE_SUCCESS",
  CREATE_COURSE_FAILURE = "CREATE_COURSE_FAILURE",

  UPDATE_COURSE = "UPDATE_COURSE",
  UPDATE_COURSE_REQUEST = "UPDATE_COURSE_REQUEST",
  UPDATE_COURSE_SUCCESS = "UPDATE_COURSE_SUCCESS",
  UPDATE_COURSE_FAILURE = "UPDATE_COURSE_FAILURE",

  DELETE_COURSE = "DELETE_COURSE",
  DELETE_COURSE_REQUEST = "DELETE_COURSE_REQUEST",
  DELETE_COURSE_SUCCESS = "DELETE_COURSE_SUCCESS",
  DELETE_COURSE_FAILURE = "DELETE_COURSE_FAILURE",

  GET_COURSES_BY_PAGE = "GET_COURSES_BY_PAGE",
  GET_COURSES_BY_PAGE_REQUEST = "GET_COURSES_BY_PAGE_REQUEST",
  GET_COURSES_BY_PAGE_SUCCESS = "GET_COURSES_BY_PAGE_SUCCESS",
  GET_COURSES_BY_PAGE_FAILURE = "GET_COURSES_BY_PAGE_FAILURE",
}

export { ECourseAction };
