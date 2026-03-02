import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import apiConnector from "../apiConnector";

const {
    GET_USER_DETAILS_API,
    GET_USER_ENROLLED_COURSE_API,
    GET_INSTRUCTOR_DASHBOARD_DETAILS,
} = profileEndpoints

export async function getUserEnrolledCourse(token) {
    const toastId = toast.loading("Loading....")
    let result = []
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSE_API, null,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET USER ENROLLED COURSE RESponse API....", response.data.courses)
        if (!response.data) {
            throw new Error(response.data);
        }
        toast.success("Get Enrolled Course Successfully")
        result = response?.data?.courses
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error.message)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export const getInstructorData = async(token) =>{
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const response = await apiConnector("GET",GET_INSTRUCTOR_DASHBOARD_DETAILS,null,{
            Authorization: `Bearer ${token}`,
        })
        console.log("INSTRUCTOR DashBoard API RESPONSE............", response)

        if(!response?.data?.success){
            throw new Error("Could Not Fetch Instructor DashBoard Details")
        }
        result = response?.data;

    }catch(error){
        console.log("INSTRUCTOR DASHBOARD API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result;
}