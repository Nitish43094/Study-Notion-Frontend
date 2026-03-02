import React, { act } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
const CTAButton = ({children,active, linkto}) =>{
    return(
        <Link to={linkto} className="">
            <div className={`text-center flex items-center gap-2 text-[13px] px-6 py-3 rounded-md
                ${active ? "bg-yellow-50 text-black" : "bg-richblue-800"}
                hover:scale-95 transition-all duration-200`}>
                {children}
                {active ? <FaArrowRight/> : ""}
            </div>
        </Link>
    )
}

export default CTAButton;