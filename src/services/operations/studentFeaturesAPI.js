import { toast } from "react-hot-toast";
import { studentEndpoint } from "../apis";
import apiConnector from "../apiConnector";

const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoint;

import razorpayLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";

// ---------------- LOAD SCRIPT ----------------

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
}

// ---------------- BUY COURSE ----------------
export async function buyCourse(courses,token,userDetails,navigate,dispatch) {
    const toastId = toast.loading("Loading...");

    try {
        // load razorpay script
        const loaded = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!loaded) {
            toast.error("Razorpay SDK failed to load");
            return;
        }

        // create order
        const orderResponse = await apiConnector(
            "POST",
            COURSE_PAYMENT_API,
            {
                courses: Array.isArray(courses) ? courses : [courses],
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }
        const order = orderResponse.data.data;
        // ---------------- OPTIONS ----------------
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY,
            amount: order.amount,
            currency: order.currency,
            name: "StudyNotion",
            description: "Thanks for purchasing the course",
            image: razorpayLogo,
            order_id: order.id,

            handler: function (response) {
                // verify payment
                verifyPaymet({ ...response, courses }, token, navigate, dispatch);
                // send email
                sendPaymentSuccessEmail(response, order.amount, token);
            },
            method: {
                upi: true,
                card: true,
                netbanking: true,
                wallet: true,
            },
            prefill: {
                name: userDetails.firstName,
                email: userDetails.email,
            },
            notes: {
                address: "StudyNotion",
            },
            theme: {
                color: "#3399cc",
            },
            modal: {
                ondismiss: function () {
                    toast.error("Payment cancelled");
                },
            },
        };

        // ---------------- OPEN PAYMENT WINDOW ----------------

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            console.log(response.error);
            toast.error("Payment failed");
        });
    } catch (error) {
        console.log("Payment API Error", error);
        toast.error("Could not make payment");
    }

    toast.dismiss(toastId);
}

// ---------------- SEND EMAIL ----------------
async function sendPaymentSuccessEmail(response, amount, token) {
    try {
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                amount,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        );
    } catch (error) {
        console.log("Payment Email Error", error);
    }
}

// ---------------- VERIFY PAYMENT ----------------

async function verifyPaymet(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));

    try {
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Payment successful 🎉");

        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    } catch (error) {
        console.log("Payment Verify Error", error);
        toast.error("Could not verify payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}