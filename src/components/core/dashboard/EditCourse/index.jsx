import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import RenderSteps from "../addCourses/RenderSteps";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetaiilsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

const EditCourse = () =>{
    const dispatch = useDispatch()
    const {courseId} = useParams();
    const {course} = useSelector((state)=> state.course)
    const [loading,setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)

    useEffect(()=>{
        const populateCourseDetails = async() =>{
            setLoading(true)
            const result = await getFullDetailsOfCourse(courseId,token)
            console.log("Edit Course Details ->",result)
            if(result){
                dispatch(setEditCourse(true))
                dispatch(setCourse(result))
            }
            setLoading(false)
        }
        populateCourseDetails();
    },[])
    if(loading){
        return(
            <div>
                Loading....
            </div>
        )
    }
    return(
        <div className="text-white">
            <h1>Edit Course</h1>
            <div>
                {
                    course ? (<RenderSteps />) : (<p>Course Not found</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse;