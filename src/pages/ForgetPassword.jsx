import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";

const ForgetPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);

    const dispatch = useDispatch()
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4">
            {loading ? (
                <div className="text-white text-lg">Loading...</div>
            ) : (
                <div className="w-full max-w-md bg-richblack-800 rounded-xl p-6 sm:p-8 shadow-lg">

                    {/* Heading */}
                    <h1 className="text-2xl sm:text-3xl font-semibold text-richblack-5 mb-3">
                        {!emailSent ? "Reset Your Password" : "Check Your Email"}
                    </h1>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-richblack-200 mb-6">
                        {!emailSent
                            ? "Don't worry! We'll send you instructions to reset your password. If you no longer have access to your email, we can try account recovery."
                            : `We have sent a password reset link to `}
                        {emailSent && (
                            <span className="font-semibold text-yellow-5"> {email}</span>
                        )}
                    </p>

                    {/* Form */}
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit}
                    >
                        {!emailSent && (
                            <div className="flex flex-col gap-1">
                                <label className="text-sm text-richblack-200">
                                    Email Address <span className="text-pink-200">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="rounded-md bg-richblack-700 px-4 py-2 text-richblack-5 focus:outline-none focus:ring-2 focus:ring-yellow-5"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full rounded-md bg-yellow-5 py-2 text-richblack-900 font-semibold hover:bg-yellow-50 transition"
                        >
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>

                    {/* Back to Login */}
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

export default ForgetPassword;
