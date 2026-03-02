import React, { useState } from "react";
import frame from "../assets/Images/frame.png";
import signup from "../assets/Images/signup.webp";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setSignupData } from "../slices/authSlice";
import { sendOTP } from "../services/operations/authAPI";

const Signup = () => {
  const [eye, setEye] = useState(false);
  const [passEye, setPassEye] = useState(false);
  const [accountType, setAccountType] = useState("Student");

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    conformPassword: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const { firstName, lastName, email, password, conformPassword } = data;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== conformPassword) {
      toast.error("Password do not match");
      return;
    }

    dispatch(
      setSignupData({
        accountType,
        firstName,
        lastName,
        email,
        password,
        conformPassword,
      })
    );

    dispatch(sendOTP(email, navigate));
  };

  return (
    <div className="mx-auto w-11/12 max-w-maxContent min-h-screen flex flex-col-reverse lg:flex-row items-center justify-center gap-12 lg:gap-24 text-white py-10">

      {/* LEFT SECTION */}
      <div className="w-full lg:w-[40%] flex flex-col gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Join the millions learning to code with StudyNotion for free
          </h1>
          <p className="text-pure-greys-200 mt-2">
            Build skills for today, tomorrow and beyond.
          </p>
        </div>

        {/* ACCOUNT TYPE */}
        <div className="flex gap-3 bg-richblack-800 w-fit p-2 rounded-full">
          <button
            onClick={() => setAccountType("Student")}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              accountType === "Student" ? "bg-black" : ""
            }`}
          >
            Student
          </button>
          <button
            onClick={() => setAccountType("Instructor")}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              accountType === "Instructor" ? "bg-black" : ""
            }`}
          >
            Instructor
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={changeHandler}
              required
              className="bg-richblack-700 w-full p-3 rounded-md"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={changeHandler}
              required
              className="bg-richblack-700 w-full p-3 rounded-md"
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={changeHandler}
            required
            className="bg-richblack-700 w-full p-3 rounded-md"
          />

          <div className="flex flex-col sm:flex-row gap-4">
            {/* PASSWORD */}
            <div className="relative w-full">
              <input
                type={eye ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={changeHandler}
                required
                className="bg-richblack-700 w-full p-3 rounded-md pr-10"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer text-xl"
                onClick={() => setEye(!eye)}
              >
                {eye ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="relative w-full">
              <input
                type={passEye ? "text" : "password"}
                name="conformPassword"
                placeholder="Confirm Password"
                value={conformPassword}
                onChange={changeHandler}
                required
                className="bg-richblack-700 w-full p-3 rounded-md pr-10"
              />
              <span
                className="absolute right-3 top-4 cursor-pointer text-xl"
                onClick={() => setPassEye(!passEye)}
              >
                {passEye ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-yellow-50 py-3 rounded-lg text-black font-bold hover:scale-95 transition"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* RIGHT IMAGE SECTION */}
      <div className="relative w-full lg:w-[45%] flex justify-center items-center">
        <img
          src={frame}
          alt=""
          className="absolute w-[75%] sm:w-[65%] lg:w-[85%] top-4 left-4"
        />
        <img
          src={signup}
          alt=""
          className="relative w-[85%] sm:w-[75%] lg:w-[90%]"
        />
      </div>
    </div>
  );
};

export default Signup;
