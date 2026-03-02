import { Swiper, SwiperSlide } from "swiper/react";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination, Autoplay } from "swiper/modules";

import CourseCard from "./CourseCard";

const CourseSlider = ({ Courses }) => {
    if (!Courses?.length) {
        return (
            <p className="text-richblack-300 text-center py-10">
                No Courses Found
            </p>
        );
    }

    return (
        <div className="relative w-full">
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
                pagination={{
                    clickable: true,
                }}
                modules={[Navigation, Pagination, Autoplay]}
                className="w-full py-4 "

                breakpoints={{
                    0: { slidesPerView: 1 },
                    480: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                }}
            >
                {Courses.map((course, index) => (
                    <SwiperSlide key={index} className="flex justify-center gap-10">
                        <CourseCard course={course} height={"h-[300px]"} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CourseSlider;