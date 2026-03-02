import React, { useState } from "react";
import img1 from '../assets/Images/login.webp';
import img2 from '../assets/Images/frame.png';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../services/operations/authAPI";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = formData;

  const handlerOnchange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnsubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="mx-auto w-11/12 max-w-maxContent min-h-screen flex flex-col-reverse lg:flex-row justify-center items-center gap-10 lg:gap-40 text-white py-10">

      {/* Left Section */}
      <div className="flex flex-col gap-5 w-full lg:w-1/2">
        <h1 className="text-3xl lg:text-4xl font-semibold">Welcome Back</h1>
        <p className="text-sm text-richblack-300">
          Build Skills for today, tomorrow and beyond.
        </p>

        <form onSubmit={handleOnsubmit} className="flex flex-col gap-5">
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-lg font-semibold">
              Email Address <span className="text-pink-700">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              required
              value={email}
              onChange={handlerOnchange}
              className="bg-richblack-800 p-3 rounded-md w-full"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2 relative">
            <label className="text-lg font-semibold">
              Password <span className="text-pink-700">*</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlerOnchange}
              className="bg-richblack-800 p-3 rounded-md w-full pr-10"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[45px] cursor-pointer text-xl"
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <Link to="/forgot-password" className="text-blue-200 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-yellow-400 py-2 rounded-md text-richblack-900 font-semibold hover:scale-95 transition-all"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Right Image Section */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center">
        <img
          src={img2}
          alt=""
          className="absolute w-[260px] sm:w-[320px] lg:w-[390px] top-4 left-4"
        />
        <img
          src={img1}
          alt=""
          className="relative w-[300px] sm:w-[380px] lg:w-[500px]"
        />
      </div>
    </div>
  );
};

export default Login;
