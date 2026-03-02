import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { buyCourse } from "../../../../services/operations/studentFeaturesAPI";

const RenderTotalAmount = () => {
    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handelByCourse = async () => {
        if (loading) return; // prevent double click

        const courses = cart.map((course) => course._id);
        console.log("Bought these Courses: ", courses);

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            await buyCourse(
                courses,
                token,
                { userDetails: user },
                navigate,
                dispatch
            );
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 rounded-lg bg-slate-800 p-6 text-slate-100 shadow-lg">
            <div className="flex items-center justify-between text-lg font-semibold">
                <p className="text-slate-300">Total:</p>
                <p className="text-2xl font-bold text-green-400">₹ {total}</p>
            </div>

            <div className="h-px bg-slate-600" />

            <button
                onClick={handelByCourse}
                disabled={loading}
                className={`w-full rounded-md py-3 font-semibold transition-colors
                ${loading
                        ? "bg-yellow-300 cursor-not-allowed text-slate-500"
                        : "bg-yellow-500 hover:bg-yellow-400 text-slate-900"
                    }`}
            >
                {loading ? "Processing..." : "Buy Now"}
            </button>
        </div>
    );
};

export default RenderTotalAmount;