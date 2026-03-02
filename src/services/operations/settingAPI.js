import toast from "react-hot-toast"
import apiConnector from "../apiConnector"
import { settingsEndpoints } from "../apis"
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authAPI"

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Uploading...");
        try {
            console.log("FormData:", formData);
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                }
            );
            console.log("UPDATE DISPLAY PICTURE RESPONSE --->", response.data.data);
            if (!response) {
                throw new Error("Image upload failed");
            }
            toast.success("Profile picture updated");
            // ✅ Only user data update karo
            dispatch(setUser({ ...response.data.data }))
            localStorage.setItem("user", JSON.stringify(response.data.data))
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API ERROR --->", error);
            toast.error("Could not update profile picture");
        }
        toast.dismiss(toastId);
    };
}


export function updateProfile(token, formData,navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        console.log("This is Profile Update data ",formData)
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            console.log("Profile Update is Successfully...", response.data.data)
            if (!response) {
                throw new Error(response)
            }
            dispatch(setUser(response.data.data))
            localStorage.setItem("user", JSON.stringify(response.data.data))
            toast.success("Update Profile Successfully")
        } catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId);
    }
}

export async function changePassword(token, formData) {
    const toastId = toast.loading("Loading....")
    try {
        // console.log("Form data", formData)
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${token}`
        })
        console.log("CHANGE PASSWORD API RESPONSE.....", response)
        if (!response) {
            throw new Error(response.message)
        }
        toast.success("Password Changed Successfully")
    } catch (error) {
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteAccount(token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading....")
        try {
            console.log("Token is ... ", token)
            const response = await apiConnector("DELETE", DELETE_PROFILE_API, null, 
                { Authorization: `Bearer ${token}` })
            console.log("DELETE ACCOUNT API RESPONSE.........", response)

            // if (!response) {
            //     throw new Error(response.message);
            // }
            toast.success("Account Deleted Successfully")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}