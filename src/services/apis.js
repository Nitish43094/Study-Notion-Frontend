const BASE_URL = import.meta.env.VITE_BASE_URL;

export const categories = {
  CREATE_CATEGORY_API : BASE_URL + "/course/createCategories",
  CATEGORIES_API: `${BASE_URL}/course/showAllCategoriess`,
};

export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoriesDetails"
}

export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const studentEndpoint = {
  COURSE_PAYMENT_API : BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API : BASE_URL + "/payment/verifySignature",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact/contact",
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changePassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSE_API: BASE_URL + "/profile/getEnrolledCourse",
  GET_INSTRUCTOR_DASHBOARD_DETAILS : BASE_URL + "/profile/instructorDashboard",
}

export const courseEndpoints = {
    GET_ALL_COURSE_API : BASE_URL + "/course/getAllCources",
    COURSE_DETAILS_API : BASE_URL + "/course/getCourseDetails",
    CREATE_COURSE_API : BASE_URL + "/course/createCourse",
    EDIT_COURSE_API : BASE_URL + "/course/editCourse",
    DELETE_COURSE_API : BASE_URL + "/course/deleteCourse",

    COURSE_CATEGORIES_API : BASE_URL + "/course/showAllCategoriess",
    CREATE_SECTION_API : BASE_URL + "/course/createSection",
    GET_ALL_SECTION_API : BASE_URL + "/course/getallSection",
    UPDATE_SECTION_API : BASE_URL + "/course/updateSection",
    DELETE_SECTION_API : BASE_URL + "/course/deleteSection",

    CREATE_SUBSECTION_API : BASE_URL + "/course/createSubSection",
    UPDATE_SUBSECTION_API : BASE_URL + "/course/updateSubSection",
    DELETE_SUBSECTION_API : BASE_URL + "/course/deleteSubSection",

    GET_ALL_INSTRUCTOR_COURSE_API : BASE_URL + "/course/all-course",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED : BASE_URL + "/course/getFullCourseDetailse",
    LECTURE_COMPLETION_API : BASE_URL + "/course/updateCourseProgress",
    CREATE_RATING_API : BASE_URL + "/course/createRating",
    GET_ALL_RATING_API: BASE_URL + "/course/getAllRating",
}