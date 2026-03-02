import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/core/dashboard/Sidebar";
import { FiMenu } from "react-icons/fi";

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (authLoading || profileLoading) {
        return (
            <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] text-white">
                Loading...
            </div>
        );
    }

    return (
        <div className="relative flex h-[calc(100vh-3.5rem)] bg-richblack-900 overflow-hidden">

            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(true)}
                className="absolute top-4 left-4 z-50 block lg:hidden text-richblack-5"
            >
                <FiMenu size={24} />
            </button>

            {/* Overlay (mobile) */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
          fixed z-50 h-full w-[250px] bg-richblack-800 border-r border-richblack-700
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:static lg:translate-x-0
        `}
            >
                <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
