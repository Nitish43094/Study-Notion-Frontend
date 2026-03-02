import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateProfile } from "../../../../services/operations/settingAPI";

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"];

const EditProfile = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const submitProfileForm = async (data) => {
        try {
            dispatch(updateProfile(token, data,navigate));
        } catch (error) {
            console.log("ERROR MESSAGE - ", error.message);
        }
    };

    return (
        <div className="w-full flex justify-center text-white">
            <div className="w-full max-w-5xl bg-richblack-800 rounded-xl p-6 sm:p-8">
                <form onSubmit={handleSubmit(submitProfileForm)} className="space-y-8">

                    {/* Heading */}
                    <h2 className="text-xl sm:text-2xl font-semibold">
                        Profile Information
                    </h2>

                    {/* Name Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="Enter First Name"
                                className="form-style rounded-md bg-richblack-700 p-2"
                                {...register("firstName", { required: true })}
                                defaultValue={user.firstName}
                            />
                            {errors.firstName && (
                                <span className="text-xs text-yellow-100">
                                    Please enter your first name
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter Last Name"
                                className="form-style rounded-md bg-richblack-700 p-2"
                                {...register("lastName", { required: true })}
                                defaultValue={user.lastName}
                            />
                            {errors.lastName && (
                                <span className="text-xs text-yellow-100">
                                    Please enter your last name
                                </span>
                            )}
                        </div>
                    </div>

                    {/* DOB + Gender */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                className="form-style rounded-md bg-richblack-700 p-2"
                                {...register("dateOfBirth", {
                                    required: "Date of Birth is required",
                                    max: {
                                        value: new Date().toISOString().split("T")[0],
                                        message: "Date cannot be in the future",
                                    },
                                })}
                                defaultValue={user.additionlDetails?.dateOfBirth}
                            />
                            {errors.dateOfBirth && (
                                <span className="text-xs text-yellow-100">
                                    {errors.dateOfBirth.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Gender</label>
                            <select
                                className="form-style rounded-md bg-richblack-700 p-2"
                                {...register("gender", { required: true })}
                                defaultValue={user.additionlDetails?.gender}
                            >
                                {genders.map((g, i) => (
                                    <option key={i} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>
                            {errors.gender && (
                                <span className="text-xs text-yellow-100">
                                    Please select gender
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Contact + About */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label>Contact Number</label>
                            <input
                                type="tel"
                                placeholder="Enter Contact Number"
                                className="form-style rounded-md bg-richblack-700 p-2"
                                {...register("contactNumber", {
                                    required: "Contact number is required",
                                    minLength: { value: 10, message: "Invalid number" },
                                    maxLength: { value: 12, message: "Invalid number" },
                                })}
                                defaultValue={user.additionlDetails?.contactNumber}
                            />
                            {errors.contactNumber && (
                                <span className="text-xs text-yellow-100">
                                    {errors.contactNumber.message}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>About</label>
                            <input
                                type="text"
                                placeholder="Enter Bio Details"
                                className="form-style rounded-md bg-richblack-700 p-2"
                                {...register("about", { required: true })}
                                defaultValue={user.additionlDetails?.about}
                            />
                            {errors.about && (
                                <span className="text-xs text-yellow-100">
                                    Please enter about yourself
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/my-profile")}
                            className="px-6 py-2 rounded-md bg-richblack-600 hover:bg-richblack-500"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-6 py-2 rounded-md bg-yellow-400 text-black font-semibold hover:bg-yellow-300"
                        >
                            Save
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProfile;
