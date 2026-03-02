import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../services/operations/courseDetaiilsAPI";

import {
  setCompletedLectures,
  setCourseSectionData,
  setTotalNoOfLectures,
  setCourseEntireData,
} from "../slices/viewCourseSlice";

import VedeoDetailsSidebar from "../components/core/viewCourse/VedeoDetailsSidebar";
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal";

const ViewCourse = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token);

        if (!courseData) return;

        dispatch(
          setCourseSectionData(
            courseData?.courseDetails?.courseContent || []
          )
        );

        dispatch(setCourseEntireData(courseData?.courseDetails || {}));

        dispatch(setCompletedLectures(courseData?.completedVideos || []));

        let lectures = 0;
        courseData?.courseDetails?.courseContent?.forEach((sec) => {
          lectures += sec?.subSection?.length || 0;
        });

        dispatch(setTotalNoOfLectures(lectures));
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    if (courseId && token) {
      setCourseSpecificDetails();
    }
  }, [courseId, token, dispatch]);

  return (
    <>
      <div className="flex h-screen bg-richblack-900 text-white">

        {/* ===== Mobile Sidebar Overlay ===== */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* ===== Sidebar ===== */}
        <div
          className={`
          fixed lg:static z-50 top-0 left-0 h-full
          w-[280px] bg-richblack-800 border-r border-richblack-700
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
        >
          <VedeoDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        {/* ===== Main Content ===== */}
        <div className="flex flex-col flex-1 overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-richblack-700 bg-richblack-800 lg:hidden">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-richblack-700 hover:bg-richblack-600"
            >
              ☰
            </button>

            <p className="font-semibold">Course Player</p>

            <div />
          </div>

          {/* Video / Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && (
        <CourseReviewModal setReviewModal={setReviewModal} />
      )}
    </>
  );
};

export default ViewCourse;