import React from "react";
import { contactusEndpoint } from "../apis";
import toast from "react-hot-toast";
import apiConnector from "../apiConnector";

const { CONTACT_US_API } = contactusEndpoint

export function contactUs({ email, firstName, lastName, message, phoneNo, countryCode }) {
    return async () => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("POST", CONTACT_US_API, { email, firstName, lastName, phoneNo, countryCode, message })
            console.log("Contact Us Response ", response)
            if (!response) {
                throw new Error(response)
            }
            toast.success("Message Send Succuessfully")
        } catch (error) {
            console.log("API ERROR............", error)
            console.log("Error is ", error.message)
            toast.error("Could Not Send email")
        }
        toast.dismiss(toastId)
    }
}