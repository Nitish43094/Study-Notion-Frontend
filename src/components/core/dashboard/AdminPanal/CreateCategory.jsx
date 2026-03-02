import React, { useState } from "react";
import apiConnector from "../../../../services/apiConnector";
import { categories } from "../../../../services/apis";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const { CREATE_CATEGORY_API } = categories;

const CreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !description.trim()) {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const res = await apiConnector(
                "POST",
                CREATE_CATEGORY_API,
                { name, description },
                {
                    Authorization: `Bearer ${token}`,
                }
            );

            if (res?.data?.success) {
                toast.success("Category Created Successfully 🎉");
                setName("");
                setDescription("");
            } else {
                toast.error(res?.data?.message || "Something went wrong");
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to create category");
        }

        setLoading(false);
    };

    return (
        <div className=" flex items-center justify-center bg-richblack-900 px-4">
            <div className="w-full max-w-md bg-richblack-800 p-8 rounded-xl shadow-lg">

                {/* Heading */}
                <h1 className="text-2xl font-bold text-white mb-6 text-center">
                    Create New Category
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Category Name */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2 text-white">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter Category Name"
                            className="w-full px-4 py-2 rounded-lg bg-richblack-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-gray-300 mb-2 text-white">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Category Description"
                            rows="3"
                            className="w-full px-4 py-2 rounded-lg bg-richblack-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-lg font-semibold transition-all duration-300 ${loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-yellow-400 text-black hover:bg-yellow-300"
                            }`}
                    >
                        {loading ? "Creating..." : "Create Category"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCategory;