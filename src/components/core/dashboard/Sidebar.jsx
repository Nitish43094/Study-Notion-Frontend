import React, { useState } from "react";
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLinks from "./SidebarLinks";
import { IoMdSettings } from "react-icons/io";
import { VscSignOut } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile)
    const { loading: authLoading } = useSelector((state) => state.auth)
    const [modal, setModal] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    if (authLoading || profileLoading) {
        return (
            <div className="mx-auto">
                Loading...
            </div>
        )
    }
    const logoutHandler = () => {
        dispatch(logout(navigate));
    };
    return (
        <div className="relative">

            {/* SIDEBAR */}
            <div
                className="
                    min-w-[220px] 
                    h-[calc(100vh-3.5rem)] 
                    bg-richblack-800 
                    border-r border-richblack-700 
                    py-10
                    flex flex-col 
                    justify-between
                    "
            >
                {/* TOP LINKS */}
                <div className="flex flex-col">
                    {sidebarLinks.map((link) => {
                        if (link.type && user.accountType !== link.type) return null;
                        return (
                            <SidebarLinks
                                key={link.id}
                                link={link}
                                iconName={link.icon}
                            />
                        );
                    })}
                </div>

                {/* DIVIDER */}
                <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-600"></div>

                {/* BOTTOM LINKS */}
                <div className="flex flex-col gap-2">
                    <SidebarLinks
                        link={{ name: "Settings", path: "/dashboard/settings" }}
                        iconName={"IoMdSettings"}
                    />

                    <button
                        onClick={() => setModal(true)}
                        className="flex items-center gap-2 px-6 py-2 text-sm text-richblack-300 hover:bg-richblack-700 transition"
                    >
                        <VscSignOut className="text-lg" />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>

            {/* MODAL */}
            {modal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">

                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setModal(false)}
                    ></div>

                    {/* Modal Box */}
                    <div
                        className="relative bg-richblack-800 text-white
        w-[90%] max-w-md
        rounded-xl p-6
        shadow-2xl border border-richblack-600
        animate-fadeIn"
                    >
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
                                className="px-5 py-2 rounded-md bg-richblack-600 hover:bg-richblack-500 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={logoutHandler}
                                className="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 transition font-semibold"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Sidebar;