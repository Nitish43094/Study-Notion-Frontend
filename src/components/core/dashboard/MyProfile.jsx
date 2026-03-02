import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 text-white overflow-x-hidden">
      {/* Page heading */}
      <h1 className="mb-8 text-2xl sm:text-3xl font-bold">
        My Profile
      </h1>

      {/* Content wrapper (same as Settings) */}
      <div className="flex flex-col gap-6 max-w-5xl">

        {/* Section 1 */}
        <div className="bg-richblack-800 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
            <img
              src={user?.image}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
            />

            <div className="text-center sm:text-left w-full">
              <p className="text-lg font-semibold break-words">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-300 break-all">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate("/dashboard/settings")}
            className="bg-yellow-400 text-black px-5 py-2 rounded-md font-medium hover:bg-yellow-300 transition w-full md:w-auto"
          >
            Edit
          </button>
        </div>

        {/* Section 2 */}
        <div className="bg-richblack-800 rounded-xl p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold">About</p>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="text-yellow-400 hover:underline text-sm"
            >
              Edit
            </button>
          </div>

          <p className="text-richblack-300 break-words text-sm sm:text-base">
            {user?.additionlDetails?.about ||
              "Write something about yourself"}
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-richblack-800 rounded-xl p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <p className="text-lg font-semibold">Personal Details</p>
            <button
              onClick={() => navigate("/dashboard/settings")}
              className="text-yellow-400 hover:underline text-sm"
            >
              Edit
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <Detail label="First Name" value={user?.firstName} />
            <Detail label="Last Name" value={user?.lastName} />
            <Detail label="Email" value={user?.email} />
            <Detail label="Gender" value={user?.additionlDetails?.gender} />
            <Detail label="Phone Number" value={user?.additionlDetails?.contactNumber} />
            <Detail label="Date Of Birth" value={user?.additionlDetails?.dateOfBirth} />
          </div>
        </div>

      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div className="w-full break-words">
    <p className="text-richblack-400 text-sm">{label}</p>
    <p className="font-medium text-sm sm:text-base break-all">
      {value || `Enter Your ${label}`}
    </p>
  </div>
);

export default MyProfile;
