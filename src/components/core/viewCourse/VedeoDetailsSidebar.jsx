import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const VedeoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videobarActive, setVideobarActive] = useState("");

  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const location = useLocation();

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    if (!courseSectionData?.length) return;

    const currentSection = courseSectionData.find(
      (sec) => sec._id === sectionId
    );

    const currentSubSection = currentSection?.subSection?.find(
      (sub) => sub._id === subSectionId
    );

    setActiveStatus(currentSection?._id || "");
    setVideobarActive(currentSubSection?._id || "");
  }, [courseSectionData, sectionId, subSectionId, location.pathname]);

  const progressPercent =
    totalNoOfLectures > 0
      ? Math.round((completedLectures?.length / totalNoOfLectures) * 100)
      : 0;

  return (
    <div className="h-full flex flex-col bg-richblack-800 text-white">

      {/* ===== Header ===== */}
      <div className="p-4 border-b border-richblack-700 sticky top-0 bg-richblack-800 z-10">

        {/* Buttons */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => navigate("/dashboard/enrolled-courses")}
            className="text-sm px-3 py-1 rounded bg-richblack-700 hover:bg-richblack-600 transition"
          >
            ← Back
          </button>

          <button
            onClick={() => setReviewModal(true)}
            className="text-sm px-3 py-1 rounded bg-yellow-400 text-black font-semibold hover:brightness-110"
          >
            Add Review
          </button>
        </div>

        {/* Course Title */}
        <h2 className="font-semibold text-lg line-clamp-2">
          {courseEntireData?.courseName}
        </h2>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-richblack-300 mb-1">
            <span>
              {completedLectures?.length || 0} / {totalNoOfLectures} Lectures
            </span>
            <span>{progressPercent}%</span>
          </div>

          <div className="w-full h-2 bg-richblack-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-yellow-400"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* ===== Sections List ===== */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">

        {courseSectionData?.map((section) => (
          <div
            key={section._id}
            className="border border-richblack-700 rounded-lg overflow-hidden"
          >
            {/* Section Header */}
            <button
              onClick={() =>
                setActiveStatus(
                  activeStatus === section._id ? "" : section._id
                )
              }
              className="w-full text-left px-4 py-3 bg-richblack-700 hover:bg-richblack-600 transition flex justify-between items-center"
            >
              <span className="font-medium">
                {section?.sectionName}
              </span>

              <span className="text-xs text-richblack-300">
                {section?.subSection?.length} Lectures
              </span>
            </button>

            {/* Subsections */}
            {activeStatus === section._id && (
              <div className="bg-richblack-900">

                {section?.subSection?.map((subSec) => {
                  const isActive = videobarActive === subSec._id;
                  const isCompleted = completedLectures?.includes(subSec._id);

                  return (
                    <div
                      key={subSec._id}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/subSection/${subSec?._id}`
                        );
                        setVideobarActive(subSec._id);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition
                        ${
                          isActive
                            ? "bg-yellow-400 text-black"
                            : "hover:bg-richblack-700"
                        }`}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        readOnly
                        className="accent-yellow-400"
                      />

                      {/* Lecture Title */}
                      <span className="text-sm line-clamp-2">
                        {subSec?.title}
                      </span>
                    </div>
                  );
                })}

              </div>
            )}
          </div>
        ))}

      </div>
    </div>
  );
};

export default VedeoDetailsSidebar;