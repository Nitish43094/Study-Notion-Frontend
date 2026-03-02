import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
    const [formData, setFormData] = useState({
        password: "",
        conformPassword: "",
    });
    const navigate = useNavigate()
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const changeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const { password, conformPassword } = formData;

    const HandleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password, conformPassword, token,navigate));
        setFormData({
            password: "",
            conformPassword: "",
        })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4">
            {loading ? (
                <div className="text-yellow-5 text-lg font-semibold animate-pulse">
                    Loading...
                </div>
            ) : (
                <div className="w-full max-w-md bg-richblack-800 rounded-2xl p-6 sm:p-8 shadow-lg">
                    {/* Heading */}
                    <h1 className="text-2xl sm:text-3xl font-bold text-richblack-5 mb-2">
                        Choose New Password
                    </h1>

                    <p className="text-sm sm:text-base text-richblack-200 mb-6">
                        Almost done. Enter your new password and you’re all set.
                    </p>

                    {/* Form */}
                    <form onSubmit={HandleOnSubmit} className="space-y-5">
                        {/* New Password */}
                        <label className="block">
                            <p className="text-sm text-richblack-5 mb-1">
                                New Password <span className="text-pink-200">*</span>
                            </p>
                            <input
                                type="password"
                                name="password"
                                required
                                value={password}
                                onChange={changeHandler}
                                placeholder="Enter new password"
                                className="w-full rounded-lg bg-richblack-700 px-4 py-3 text-richblack-5 placeholder:text-richblack-300 outline-none focus:ring-2 focus:ring-yellow-50"
                            />
                        </label>

                        {/* Confirm Password */}
                        <label className="block">
                            <p className="text-sm text-richblack-5 mb-1">
                                Confirm Password <span className="text-pink-200">*</span>
                            </p>
                            <input
                                type="password"
                                name="conformPassword"
                                required
                                value={conformPassword}
                                onChange={changeHandler}
                                placeholder="Confirm new password"
                                className="w-full rounded-lg bg-richblack-700 px-4 py-3 text-richblack-5 placeholder:text-richblack-300 outline-none focus:ring-2 focus:ring-yellow-50"
                            />
                        </label>

                        {/* Button */}
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-yellow-50 py-3 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
                        >
                            Reset Password
                        </button>
                    </form>

                    {/* Back to login */}
                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-richblack-200 hover:text-yellow-5 transition"
                        >
                            ← Back to Login
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;
