import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import apiConnector from "../apiConnector";

const {
    CREATE_COURSE_API,
    COURSE_DETAILS_API,
    GET_ALL_COURSE_API,
    EDIT_COURSE_API,
    DELETE_COURSE_API,

    COURSE_CATEGORIES_API,

    CREATE_SECTION_API,
    UPDATE_SECTION_API,
    DELETE_SECTION_API,

    CREATE_SUBSECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SUBSECTION_API,

    GET_ALL_INSTRUCTOR_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,

    CREATE_RATING_API,
} = courseEndpoints;
// *********************************Course**********************************************
export const addCourseDetails = async (formData) => {
    let result = null;
    const toastId = toast.loading("Loading....")
    try {
        console.log("FORM DATA ->",formData)
        const response = await apiConnector("POST", CREATE_COURSE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("ADD COURSE RESPONSE ...", response.data)
        if (!response) {
            throw new Error("Course Not Add Course details");
        }
        toast.success("Course Details Added Successfully")
        result = response?.data
    } catch (error) {
        console.log("CREATE COURSE API ERROR..............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
}

export const getCourseDetails = async (courseId,token) => {
    let result = null;
    const toastId = toast.loading("Loading...")
    console.log("Here is course id->",courseId)
    try {
        const response = await apiConnector("POST", COURSE_DETAILS_API, { courseId })
        console.log("COURSE_DETAILS_API API RESPONSE............", response.data)
        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data
    } catch (error) {
        console.log("COURSE_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    return result;
}

export const getAllCourses = async () => {
    let result = []
    const toastId = toast.loading("Loading....")
    try {
        const response = await apiConnector("GET", GET_ALL_COURSE_API)
        console.log("GET ALL COURESE API IS -----", response.data)
        if (!response?.data) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data;
    } catch (error) {
        console.log("GET_ALL_COURSE_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

export const editCourse = async (formData, token) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try {
        // console.log("This is form data -> ",formData)
        const response = await apiConnector("PUT", EDIT_COURSE_API, formData, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        })
        console.log("EDIT_COURSE_RESPONSE.....", response.data)
        if (!response?.data) {
            throw new Error("Could Not Update Course Details")
        }
        toast.success("Course Details Updated Successfully");
        result = response?.data;
    } catch (error) {
        console.log("EDIT COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}

// delete a course
export const deleteCourse = async (courseId, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        console.log("Course ID->",courseId)
        const response = await apiConnector("DELETE", DELETE_COURSE_API, {courseId}, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE COURSE API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Course")
        }
        result = response?.data
        toast.success("Course Deleted")
    } catch (error) {
        console.log("DELETE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}
// *********************************Section**********************************************
// fetching the available course categories
export const fetchCourseCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", COURSE_CATEGORIES_API)
        // console.log("COURSE_CATEGORIES_API API RESPONSE............", response)
        if (!response?.data.success) {
            throw new Error("Could Not Fetch Course Categories")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}
// *********************************Section**********************************************
export const createSection = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let result = null
    try {
        console.log("Section Details in api ->",data)
        const response = await apiConnector("POST", CREATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_SECTION_RESPONSE.......", response.data);
        if (!response?.data) {
            throw new Error("Coude Not Create section");
        }
        toast.success("Course Section Created");
        result = response?.data;
    } catch (error) {
        console.log("CREATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result;
}

export const updateSecction = async (data, token) => {
    let result = null
    console.log("Update Section data->",data)
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("PUT", UPDATE_SECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("UPDATE_SECTION_RESPONSE.......", response.data);
        if (!response?.data) {
            throw new Error("Could not Update Section")
        }
        toast.success("Section Update Successfully");
        result = response?.data;
    } catch (error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const deleteSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    console.log("Delete Section Data -> ",data)
    try {
        const response = await apiConnector("DELETE", DELETE_SECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SECTION API RESPONSE............", response.data)
        if (!response?.data) {
            throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = response?.data
    } catch (error) {
        console.log("DELETE SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// *********************************Sub Section**********************************************
export const createSubSection = async (data, token) => {
    let result = null
    // console.log("Sub Details section ->",Object.fromEntries(data.entries()))
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`
        })
        console.log("CREATE_SUBSECTION_API......", response.data);
        if (!response.data) {
            throw new Error("Could Not add Lecture")
        }
        toast.success("Lecture Added")
        result = response?.data;
    } catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}
export const updateSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    console.log("Sub Details section ->",Object.fromEntries(data.entries()))
    
    try {
        const response = await apiConnector("PUT", UPDATE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("UPDATE SUB-SECTION API RESPONSE............", response.data)
        if (!response?.data) {
            throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = response?.data
    } catch (error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const deleteSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SUB-SECTION API RESPONSE............", response.data)
        if (!response?.data) {
            throw new Error("Could Not Delete Lecture")
        }
        toast.success("Lecture Deleted")
        result = response?.data
    } catch (error) {
        console.log("DELETE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}


// *********************************Others**********************************************
export const fetchInstructorCourses = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector(
            "GET",
            GET_ALL_INSTRUCTOR_COURSE_API,
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("INSTRUCTOR COURSES API RESPONSE............", response.data)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Instructor Courses")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("INSTRUCTOR COURSES API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
export const getFullDetailsOfCourse = async (courseId, token) => {
    // const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_COURSE_DETAILS_AUTHENTICATED,
            {
                courseId
            },
            {
                Authorization: `Bearer ${token}`,
            } 
        )
        console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response.data.data)

        if (!response) {
            throw new Error(response)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error)
        // result = error.response.data
        // toast.error(error.response.data.message);
    }
    // toast.dismiss(toastId)
    // dispatch(setLoading(false));
    return result
}
export const markLectureAsComplete = async (data, token) => {
    let result = null
    console.log("mark complete data", data)
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", LECTURE_COMPLETION_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log(
            "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
            response
        )

        if (!response.data.message) {
            throw new Error(response.data.error)
        }
        toast.success("Lecture Completed")
        result = true
    } catch (error) {
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error)
        toast.error(error.message)
        result = false
    }
    toast.dismiss(toastId)
    return result
}

export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
        const response = await apiConnector("POST", CREATE_RATING_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE RATING API RESPONSE............", response)
        if (!response) {
            throw new Error("Could Not Create Rating")
        }
        toast.success("Rating Created")
        success = true
    } catch (error) {
        success = false
        console.log("CREATE RATING API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
}