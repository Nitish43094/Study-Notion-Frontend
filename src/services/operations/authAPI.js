import toast from "react-hot-toast";
import apiConnector from '../apiConnector'
import { endpoints } from '../apis'
import { setLoading, setToken } from '../../slices/authSlice'
import { resetCart } from '../../slices/cartSlice'
import { setUser } from '../../slices/profileSlice'

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API
} = endpoints;

export function sendOTP(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading('Loading')
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SENDOTP_API, { email, checkUserPresent: true });
            console.log("Send Otp Response ", response.data)
            toast.success("OTP Send Successfully")
            navigate('/verify-email')
        } catch (error) {
            console.log("SENDOTP API ERROR............", error)
            console.log("Error is ", error.message)
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId);
    }

}

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    conformPassword,
    otp,
    navigate
) {
    return async (dispatch) => {
        const toastId = toast.success("loading...")
        dispatch(setLoading(true))
        try {
            console.log(accountType,
                firstName,
                lastName,
                email,
                password,
                conformPassword,
                otp,)
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                conformPassword,
                otp,
            })
            console.log("SIGNUP API Response......", response.data)
            // if (!response.data) {
            //     console.log("Response is ",)
            //     throw new Error(response)
            // }
            toast.success("Signup Successful")
            navigate("/login")
        } catch (error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", LOGIN_API, { email, password })
            console.log("Login Response is ....", response.data)
            if (!response.data) {
                throw new Error(response)
            }
            toast.success("Login Successfully")
            dispatch(setToken(response.data.token))
            const userImage = response.data.user.image ? response.data.user.image : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
            console.log("User Image ",userImage)
            dispatch(setUser({ ...response.data.user, image: userImage }))
            localStorage.setItem("token", JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate('/')
        } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout (navigate){
    return (dispatch)=>{
        dispatch(setToken(null))
        dispatch(setUser(null))
        dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate('/')
    }
}

export function getPasswordResetToken (email,setEmailSent){
    return async(dispatch) =>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",RESETPASSTOKEN_API,{email})
            console.log("Reset Password Token response ",response)

            if(!response.data.success){
                toast.error("This Email Not Register")
                throw new Error(response)
            }
            toast.success("Reset Email Sent")
            setEmailSent(true)
        }catch(error){
            console.log("Reset Password Token Error ",error)
            toast.error("Failed to Send Password Toekn")
        }
        dispatch(setLoading(false))
    }
}

export function resetPassword(password,conformPassword,token,navigate){
    return async(dispatch)=>{
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",RESETPASSWORD_API,{password,conformPassword,token});
            console.log("RESET PASSWORD RESPONSE  ",response)
            if(!response.data){
                throw new Error(response)
            }
            toast.success("Reset Password Successfully")
            navigate('/login')
        }catch(error){
            console.log("Reset Password Error ",error)
            toast.error("Unable to reset Password")
        }
        dispatch(setLoading(false))
    }
}