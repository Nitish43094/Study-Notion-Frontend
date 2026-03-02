import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxDropdownMenu } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import SubSectionModal from "./SubSectionModal";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetaiilsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // ================= Delete Section =================
  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection(
      { sectionId, courseId: course?.data?._id },
      token
    );
    if (result) dispatch(setCourse(result));
    setConfirmationModal(null);
  };

  // ================= Delete SubSection =================
  const handleDeleteSubSection = async (subSectionId, sectionId) => {

    const result = await deleteSubSection(
      { subSectionId, sectionId, courseId:course?.data?._id },
      token
    );
    if (result){
      // agar subsection return ho rha ho ga api me tab ye karna hai 
      // const updateCourseContent = course.courseContent.map((subSection) => 
      // subSection._id === subSectionId ? result : subSection)
      // const updateCourse = {...course,courseContent:updateCourseContent};
      // dispatch(setCourse(updateCourse))
      console.log("After Deleting subSectuon -> ",result)
      dispatch(setCourse(result));
    } 
    setConfirmationModal(null);
  };

  return (
    <div className="space-y-4">
      {course?.data?.courseContent?.map((section) => (
        <details
          key={section._id}
          className="group rounded-lg border border-richblack-600 bg-richblack-700"
        >
          {/* ================= Section Header ================= */}
          <summary className="flex cursor-pointer items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <RxDropdownMenu className="text-lg text-richblack-200" />
              <p className="font-medium">{section.sectionName}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleChangeEditSectionName(
                    section._id,
                    section.sectionName
                  );
                }}
              >
                <FaEdit />
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setConfirmationModal({
                    text1: "Delete This Section",
                    text2:
                      "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () =>
                      handleDeleteSection(section._id),
                    btn2Handler: () =>
                      setConfirmationModal(null),
                  });
                }}
              >
                <MdDelete />
              </button>

              <IoIosArrowDropdownCircle className="text-xl transition-transform duration-300 group-open:rotate-180" />
            </div>
          </summary>

          {/* ================= Sub Sections ================= */}
          <div className="px-4 pb-4 space-y-3">
            {section.subSection?.map((data,ind) => (
              <div
                key={ind}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-md bg-richblack-800 p-3"
              >
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => setViewSubSection(data)}
                >
                  <RxDropdownMenu />
                  <p>{data.title}</p>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() =>
                      setEditSubSection({
                        ...data,
                        sectionId: section._id,
                      })
                    }
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete Lecture",
                        text2: "This lecture will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () =>
                          handleDeleteSubSection(
                            data._id,
                            section._id
                          ),
                        btn2Handler: () =>
                          setConfirmationModal(null),
                      })
                    }
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}

            {/* ================= Add Lecture ================= */}
            <button
              onClick={() => setAddSubSection(section._id)}
              className="flex items-center gap-2 text-yellow-50 font-medium"
            >
              <span>+</span>
              Add Lecture
            </button>
          </div>
        </details>
      ))}

      {/* ================= Modals ================= */}
      {addSubSection && (
        <SubSectionModal
          modalData={addSubSection}
          setModalData={setAddSubSection}
          add={true}
        />
      )}

      {viewSubSection && (
        <SubSectionModal
          modalData={viewSubSection}
          setModalData={setViewSubSection}
          view={true}
        />
      )}

      {editSubSection && (
        <SubSectionModal
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
        />
      )}

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </div>
  );
};

export default NestedView;
