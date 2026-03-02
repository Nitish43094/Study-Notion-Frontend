import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch } from "react-redux";
import { contactUs } from "../../services/operations/contactUs";
import CountryCode from '../../data/countrycode.json'
const ContactUsForm = () => {
    const [loading, setLoading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    const dispatch = useDispatch();
    const submitContactForm = async (data) => {
        console.log(data)
        try {
            setLoading(true)
            dispatch(contactUs(data))
            setLoading(false)
        } catch (error) {
            console.log("Error", error.message)
            setLoading(false);
        }
    }
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: "",
            })
        }
    }, [reset, isSubmitSuccessful])
    return (
        <form
            onSubmit={handleSubmit(submitContactForm)}
            className="w-full max-w-3xl mx-auto text-white flex flex-col gap-6"
        >
            {/* First & Last Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="firstName" className="text-sm">
                        First Name <span className="text-pink-400">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="Enter First Name"
                        {...register("firstName", { required: true })}
                        className="bg-richblack-800 rounded-md p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                    {errors.firstName && (
                        <span className="text-pink-400 text-xs">
                            Please enter your first name
                        </span>
                    )}
                </div>

                {/* Last Name */}
                <div className="flex flex-col gap-2">
                    <label htmlFor="lastName" className="text-sm">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Enter Last Name"
                        {...register("lastName")}
                        className="bg-richblack-800 rounded-md p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                </div>
            </div>

            {/* Phone Number */}
            <div className="flex flex-col gap-2">
                <label htmlFor="phoneNo" className="text-sm">
                    Phone Number <span className="text-pink-400">*</span>
                </label>

                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        id="countryCode"
                        {...register("countryCode", { required: true })}
                        className="bg-richblack-800 rounded-md p-3 outline-none focus:ring-2 focus:ring-yellow-400 sm:w-1/3"
                    >
                        {CountryCode.map((data, ind) => (
                            <option value={data.code} key={ind}>
                                {data.code} - {data.country}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        id="phoneNo"
                        placeholder="Enter Your Number"
                        maxLength={10}
                        {...register("phoneNo", {
                            required: { value: true, message: "Please enter phone number" },
                            minLength: { value: 10, message: "Invalid phone number" },
                            maxLength: { value: 10, message: "Invalid phone number" },
                        })}
                        className="bg-richblack-800 rounded-md p-3 outline-none focus:ring-2 focus:ring-yellow-400 w-full"
                    />
                </div>

                {errors.phoneNo && (
                    <span className="text-pink-400 text-xs">
                        {errors.phoneNo.message}
                    </span>
                )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm">
                    Email <span className="text-pink-400">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter Your Email"
                    {...register("email", { required: true })}
                    className="bg-richblack-800 rounded-md p-3 outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.email && (
                    <span className="text-pink-400 text-xs">
                        Please enter your email
                    </span>
                )}
            </div>

            {/* Message */}
            <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm">
                    Message <span className="text-pink-400">*</span>
                </label>
                <textarea
                    id="message"
                    rows="6"
                    placeholder="Enter your message here"
                    {...register("message", { required: true })}
                    className="bg-richblack-800 rounded-md p-3 outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                />
                {errors.message && (
                    <span className="text-pink-400 text-xs">
                        Please enter your message
                    </span>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={loading}
                className="w-full md:w-fit bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-300 transition disabled:opacity-50"
            >
                {loading ? "Sending..." : "Submit"}
            </button>
        </form>

    )
}

export default ContactUsForm;