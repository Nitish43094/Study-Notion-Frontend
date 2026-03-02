import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import apiConnector from "../../services/apiConnector";
import { courseEndpoints } from "../../services/apis";
import { FaStar } from "react-icons/fa";
const { GET_ALL_RATING_API } = courseEndpoints;

const ReviewSlider = () => {
    const [review, setReview] = useState([]);

    useEffect(() => {
        const fetchAllReview = async () => {
            try {
                const res = await apiConnector("GET", GET_ALL_RATING_API);
                if (res?.data?.success) {
                    setReview(res?.data?.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllReview();
    }, []);

    return (
        <div className="w-full py-16 px-4">
            <div className="max-w-[1200px] mx-auto">
                <Swiper
                    spaceBetween={24}
                    loop={true}
                    grabCursor={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination, Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {review.map((data, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-richblack-800 p-6 rounded-xl shadow-lg h-full flex flex-col gap-4">
                                {/* User Info */}
                                <div className="flex items-center gap-5">
                                    <img
                                        src={data?.user?.image}
                                        alt="user"
                                        className="h-12 w-12 rounded-full object-cover"
                                    />
                                    <div className="w-full flex flex-col items-start">
                                        <p className="text-white font-semibold text-xl">
                                            {data?.user?.firstName} {data?.user?.lastName}
                                        </p>
                                        <p className="text-richblack-300 text-sm">
                                            {data?.course?.courseName}
                                        </p>
                                    </div>
                                </div>

                                {/* Review Text */}
                                <p className="text-richblack-200 text-sm line-clamp-4">
                                    {data?.review}
                                </p>
                                <span className="text-yellow-400 font-semibold text-sm">
                                    {data?.rating?.toFixed(1)}
                                </span>

                                {/* Rating */}
                                <div className="flex items-center gap-2 mt-auto">
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar
                                                key={i}
                                                className={
                                                    i < Math.round(data?.rating)
                                                        ? "text-yellow-400"
                                                        : "text-richblack-600"
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ReviewSlider;