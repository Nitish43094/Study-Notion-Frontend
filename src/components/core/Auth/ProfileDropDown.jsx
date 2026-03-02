import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../../services/operations/authAPI";

const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false)

  const logoutHandler = () => {
    dispatch(logout(navigate));
  };

  return (
    <div className="absolute right-0 mt-3 w-56 rounded-md bg-richblack-800 shadow-lg z-50">
      {/* User Info */}
      <div className="border-b border-richblack-700 px-4 py-3">
        <p className="text-sm font-semibold text-richblack-5">
          {user?.firstName} {user?.lastName}
        </p>
        <p className="text-xs text-richblack-300 truncate">
          {user?.email}
        </p>
      </div>

      {/* Menu */}
      <div className="py-2">
        <Link
          to="/dashboard/my-profile"
          className="block px-4 py-2 text-sm text-richblack-200 hover:bg-richblack-700 transition"
        >
          My Profile
        </Link>

        <Link
          to="/dashboard/settings"
          className="block px-4 py-2 text-sm text-richblack-200 hover:bg-richblack-700 transition"
        >
          Settings
        </Link>

        <button
          onClick={() => setModal(true)}
          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-richblack-700 transition"
        >
          Logout
        </button>
      </div>
      
      {
        modal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">

            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setModal(false)}
            ></div>

            {/* Modal Box */}
            <div className="relative bg-richblack-800 text-white 
                      w-[90%] max-w-md 
                      rounded-xl p-6 
                      shadow-2xl border border-richblack-600
                      animate-fadeIn">

              {/* Close Button */}
              <button
                onClick={() => setModal(false)}
                className="absolute top-4 right-4 text-xl text-richblack-300 hover:text-white transition"
              >
                ✕
              </button>

              {/* Title */}
              <h1 className="text-2xl font-bold mb-3">
                Confirm Logout
              </h1>

              {/* Subtitle */}
              <p className="text-richblack-300 mb-6">
                Are you sure you want to log out of your account?
              </p>

              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setModal(false)}
                  className="px-5 py-2 rounded-md bg-richblack-600 
                       hover:bg-richblack-500 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={logoutHandler}
                  className="px-5 py-2 rounded-md bg-red-500 
                       hover:bg-red-600 transition font-semibold"
                >
                  Log Out
                </button>
              </div>
            </div>
          </div>
        )
      }

    </div>
  );
};

export default ProfileDropDown;
