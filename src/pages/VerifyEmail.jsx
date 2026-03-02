import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from "react-otp-input";
import { sendOTP, signUp } from "../services/operations/authAPI";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const { loading, signupData } = useSelector((state) => state.auth);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      conformPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        conformPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-richblack-900 px-4">
      {loading ? (
        <div className="text-white text-lg">Loading...</div>
      ) : (
        <div className="w-full max-w-md bg-richblack-800 p-6 sm:p-8 rounded-xl shadow-lg">
          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-semibold text-richblack-5 mb-2">
            Verify Email
          </h1>

          <p className="text-sm sm:text-base text-richblack-200 mb-6">
            A verification code has been sent to your email. Enter the code below
            to continue.
          </p>

          {/* Form */}
          <form onSubmit={submitHandler} className="space-y-6">
            {/* OTP Input */}
            <div className="flex justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="mx-1 text-richblack-400">-</span>}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-10  h-10 sm:w-16 sm:h-10 text-center text-lg rounded-md
                    border border-richblack-600 bg-richblack-700 text-richblack-5
                    focus:outline-none focus:ring-2 focus:ring-yellow-50"
                  />
                )}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-yellow-50 text-richblack-900 py-2 rounded-lg
              font-semibold hover:bg-yellow-100 transition"
            >
              Verify Email
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Link
              to="/login"
              className="text-sm text-richblack-200 hover:text-yellow-50 transition"
            >
              ← Back to Login
            </Link>

            <button
              onClick={() => dispatch(sendOTP(signupData.email,navigate))}
              className="text-sm text-yellow-50 hover:text-yellow-100 transition"
            >
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
