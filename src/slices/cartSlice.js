import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // ✅ Add to cart
        addToCart(state, action) {

            // 🔹 action.payload se course ka pura object milta hai
            const course = action.payload;

            // 🔹 Check kar rahe hain ki ye course cart me pehle se hai ya nahi
            // findIndex same _id wale course ka index return karta hai
            // agar nahi milta to -1 return hota hai
            const exists = state.cart.findIndex(
                (item) => item._id === course._id
            );

            // 🔹 Agar course already cart me hai
            if (exists >= 0) {
                // ❌ Duplicate course add nahi hone dena
                toast.error("Course Already in Cart");

                // ⛔ Function yahin stop ho jayega
                return;
            }

            // 🔹 Course cart array me add kar rahe hain
            state.cart.push(course);

            // 🔹 Total items count ko 1 se increase kar rahe hain
            state.totalItems++;

            // 🔹 Cart ke total price me course ka price add kar rahe hain
            // (maan ke chal rahe hain course.price ek number hai)
            state.total += course.price;

            // 🔹 Updated cart ko localStorage me save kar rahe hain
            // taaki page refresh hone par bhi cart data rahe
            localStorage.setItem("cart", JSON.stringify(state.cart));

            // 🔹 Updated total price localStorage me save
            localStorage.setItem("total", JSON.stringify(state.total));

            // 🔹 Updated total items count localStorage me save
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

            // ✅ Success message jab course successfully cart me add ho jaye
            toast.success("Course Added to cart");
        },

        // ✅ Remove from cart
        removeFromCart(state, action) {

            // 🔹 action.payload se course ka _id milta hai
            const courseId = action.payload;

            // 🔹 Cart me se us course ka index find kar rahe hain
            // jiska _id courseId ke equal ho
            const exists = state.cart.findIndex(
                (item) => item._id === courseId
            );

            // 🔹 Agar course cart me mil jata hai
            if (exists >= 0) {

                // 🔹 Total items count ko 1 se kam kar rahe hain
                state.totalItems--;

                // 🔹 Total price me se us course ka price subtract kar rahe hain
                state.total -= state.cart[exists].price;

                // 🔹 Cart array se us course ko remove kar rahe hain
                // splice(index, 1) → ek item remove karta hai
                state.cart.splice(exists, 1);

                // 🔹 Updated cart ko localStorage me save kar rahe hain
                localStorage.setItem("cart", JSON.stringify(state.cart));

                // 🔹 Updated total price ko localStorage me save kar rahe hain
                localStorage.setItem("total", JSON.stringify(state.total));

                // 🔹 Updated total items count ko localStorage me save kar rahe hain
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                // ✅ Success toast jab course cart se remove ho jaye
                toast.success("Course Removed From Cart");
            }else{
                toast.error("Course Not found")
            }
        },
        // ✅ Reset cart
        resetCart(state) {
            state.cart = [];
            state.total = 0
            state.totalItems = 0;

            localStorage.removeItem("cart");
            localStorage.removeItem("total")
            localStorage.removeItem("totalItems");
        },

        // ✅ Directly set totalItems (optional)
        setTotalItems(state, action) {
            state.totalItems = action.payload;
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    resetCart,
    setTotalItems,
} = cartSlice.actions;

export default cartSlice.reducer;
