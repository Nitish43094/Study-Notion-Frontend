import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { FaPlayCircle } from "react-icons/fa";
import { markLectureAsComplete } from '../../../services/operations/courseDetaiilsAPI'
// import markLectureAsComplete from your api

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef(null);

  const { token } = useSelector((state) => state.auth);
  const {
    courseSectionData,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  // ================= LOAD VIDEO DATA =================
  useEffect(() => {
    if (!courseSectionData?.length) return;

    if (!courseId || !sectionId || !subSectionId) {
      navigate("/dashboard/enrolled-courses");
      return;
    }

    const section = courseSectionData.find(
      (sec) => sec._id === sectionId
    );

    const subSection = section?.subSection.find(
      (sub) => sub._id === subSectionId
    );

    setVideoData(subSection || null);
    setVideoEnded(false);
  }, [courseSectionData, location.pathname]);

  // ================= FIRST VIDEO CHECK =================
  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    return sectionIndex === 0 && subIndex === 0;
  };

  // ================= LAST VIDEO CHECK =================
  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    const lastSectionIndex = courseSectionData.length - 1;
    const lastSubIndex =
      courseSectionData[lastSectionIndex]?.subSection.length - 1;

    return (
      sectionIndex === lastSectionIndex &&
      subIndex === lastSubIndex
    );
  };

  // ================= NEXT VIDEO =================
  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const subIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    const subSectionLength =
      courseSectionData[sectionIndex].subSection.length;

    if (subIndex < subSectionLength - 1) {
      // Same section next video
      const nextSubId =
        courseSectionData[sectionIndex].subSection[subIndex + 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${nextSubId}`
      );
    } else if (sectionIndex < courseSectionData.length - 1) {
      // Next section first video
      const nextSectionId =
        courseSectionData[sectionIndex + 1]._id;

      const nextSubId =
        courseSectionData[sectionIndex + 1].subSection[0]._id;

      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/subSection/${nextSubId}`
      );
    }
  };

  // ================= PREV VIDEO =================
  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (sec) => sec._id === sectionId
    );

    const subIndex = courseSectionData[sectionIndex].subSection.findIndex(
      (sub) => sub._id === subSectionId
    );

    if (subIndex > 0) {
      const prevSubId =
        courseSectionData[sectionIndex].subSection[subIndex - 1]._id;

      navigate(
        `/view-course/${courseId}/section/${sectionId}/subSection/${prevSubId}`
      );
    } else if (sectionIndex > 0) {
      const prevSectionId =
        courseSectionData[sectionIndex - 1]._id;

      const prevSubLength =
        courseSectionData[sectionIndex - 1].subSection.length;

      const prevSubId =
        courseSectionData[sectionIndex - 1].subSection[
          prevSubLength - 1
        ]._id;

      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/subSection/${prevSubId}`
      );
    }
  };

  // ================= MARK COMPLETE =================
  const handleLectureCompletion = async () => {
    try {
      setLoading(true);

      const res = await markLectureAsComplete({ courseId, subSectionId }, token);
      if (res) {
        dispatch(updateCompletedLectures(subSectionId));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  if (!videoData) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        No Data Found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-richblack-900 text-white p-4 md:p-8">

      {/* Video Section */}
      <div className="max-w-5xl mx-auto">
        <Player
          ref={playerRef}
          aspectRatio="16:9"
          playsInline
          onEnded={() => setVideoEnded(true)}
          src={videoData?.videoUrl}
        />

        {/* Controls */}
        {videoEnded && (
          <div className="mt-6 flex flex-col md:flex-row gap-4 items-center justify-between bg-richblack-800 p-4 rounded-lg">

            <div className="flex gap-3">
              {!completedLectures.includes(subSectionId) && (
                <button
                  disabled={loading}
                  onClick={handleLectureCompletion}
                  className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-300"
                >
                  {loading ? "Loading..." : "Mark as Completed"}
                </button>
              )}

              <button
                onClick={() => {
                  playerRef.current.seek(0);
                  setVideoEnded(false);
                }}
                className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-400"
              >
                Rewatch
              </button>
            </div>

            <div className="flex gap-3">
              {!isFirstVideo() && (
                <button
                  onClick={goToPrevVideo}
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  Prev
                </button>
              )}

              {!isLastVideo() && (
                <button
                  onClick={goToNextVideo}
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}

        {/* Video Info */}
        <div className="mt-8">
          <h1 className="text-2xl md:text-3xl font-semibold">
            {videoData?.title}
          </h1>
          <p className="mt-3 text-gray-400">
            {videoData?.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;