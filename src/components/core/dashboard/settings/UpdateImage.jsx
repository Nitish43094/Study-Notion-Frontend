import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingAPI";
import { FiUpload } from "react-icons/fi";

const UpdateImage = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [profileIMG, setProfileIMG] = useState(null);
    const [previewSource, setPreviewSource] = useState(null);

    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setProfileIMG(file);

        // Preview image
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleFileUpload = async () => {
        if (!profileIMG) return;

        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("displayPicture", profileIMG);
            console.log("This is Form data ",profileIMG)
            dispatch(updateDisplayPicture(token, formData)).then(() => {
                setLoading(false);
            });
        } catch (error) {
            console.log("UPLOAD ERROR:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-richblack-800 rounded-xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6 w-full">
            <img
                src={previewSource || user?.image}
                alt={`profile-${user?.firstName}`}
                className="w-24 h-24 rounded-full object-cover"
            />

            <div className="space-y-3">
                <p className="text-lg font-semibold text-white">
                    Change Profile Picture
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png,image/jpeg,image/gif"
                />

                <div className="flex gap-3">
                    <button
                        onClick={handleClick}
                        disabled={loading}
                        className="px-4 py-2 bg-richblack-700 text-white rounded-md"
                    >
                        Select
                    </button>

                    <button
                        onClick={handleFileUpload}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black rounded-md font-semibold"
                    >
                        {loading ? "Uploading..." : "Upload"}
                        {!loading && <FiUpload />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateImage;
