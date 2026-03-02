import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { GrCart } from "react-icons/gr";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import apiConnector from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { FaCaretDown, FaBars, FaTimes } from "react-icons/fa";

const NavBar = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    // console.log("This is user data ", user)
    const { totalItems } = useSelector((state) => state.cart);

    const [subLinks, setSubLinks] = useState([]);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [mobileCatalog, setMobileCatalog] = useState(false);

    const location = useLocation();

    const matchRoute = (route) =>
        matchPath({ path: route }, location.pathname);

    // Fetch categories
    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data || []);
        } catch (error) {
            console.error("Could not fetch categories", error);
        }
    };

    useEffect(() => {
        fetchSubLinks();
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-richblack-900 border-b border-richblack-700">
            <div className="mx-auto flex w-11/12 max-w-maxContent items-center justify-between h-16">

                {/* Logo */}
                <Link to="/">
                    <img src={logo} width={160} height={40} alt="Logo" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:block">
                    <ul className="flex gap-x-6 text-richblack-25">
                        {NavbarLinks.map((link, index) => (
                            <li key={index} className="relative">
                                {link.title === "Catalog" ? (
                                    <div className="group flex items-center gap-1 cursor-pointer">
                                        <p>Catalog</p>
                                        <FaCaretDown />

                                        {/* Dropdown */}
                                        <div className="absolute left-1/2 top-full mt-3 w-[300px] 
                                                    -translate-x-1/2 invisible opacity-0 group-hover:visible 
                                                    group-hover:opacity-100 transition-all duration-200 z-50">

                                            <div className="absolute left-1/2 -top-2 h-4 w-4 
                                                -translate-x-1/2 rotate-45 bg-richblack-5" />

                                            <div className="rounded-md bg-richblack-5 p-4 shadow-lg">
                                                {subLinks.length > 0 ? (
                                                    subLinks.map((subLink) => (
                                                        <Link
                                                            key={subLink._id}
                                                            to={`/catalog/${subLink.name}`}
                                                            className="block rounded px-2 py-1 text-richblack-900 
                                                            hover:bg-richblack-50"
                                                        >
                                                            {subLink.name}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <p className="text-center text-sm text-richblack-400">
                                                        No Categories
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Link to={link.path}>
                                        <p
                                            className={`${matchRoute(link.path)
                                                ? "text-yellow-5"
                                                : "text-richblack-25"
                                                } hover:text-yellow-5 transition`}
                                        >
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-x-4">
                    {user && user.accountType !== "Instructor" && user.accountType !== "Admin" && (
                        <Link to="/dashboard/cart" className="relative">
                            <GrCart className="text-xl text-richblack-25" />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-yellow-5 
                                    text-black text-xs w-5 h-5 rounded-full flex items-center 
                                    justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {token === null && (
                        <>
                            <Link to="/login">
                                <button className="hidden lg:block border border-richblack-700 
                                    bg-richblack-800 px-3 py-1 rounded-md text-richblack-100">
                                    Log in
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className="hidden lg:block border border-richblack-700 
                                    bg-richblack-800 px-3 py-1 rounded-md text-richblack-100">
                                    Sign up
                                </button>
                            </Link>
                        </>
                    )}

                    {token !== null && user && (
                        <div className="relative group">

                            {/* Trigger */}
                            <button className="flex items-center gap-2">
                                <img
                                    src={
                                        user.image
                                            ? user.image
                                            : `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName} ${user.lastName}`
                                    }
                                    alt="Profile"
                                    className="w-9 h-9 rounded-full object-cover border-2 border-transparent hover:border-yellow-5 transition"
                                />

                                <FaCaretDown className="text-white group-hover:text-yellow-5 transition" />
                            </button>

                            {/* Dropdown */}
                            <div
                                className="absolute right-0 mt-2 invisible opacity-0
                                    group-hover:visible group-hover:opacity-100
                                    transition-all duration-200"
                            >
                                <ProfileDropDown />
                            </div>
                        </div>
                    )}



                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-richblack-25 text-xl"
                        onClick={() => setMobileMenu(!mobileMenu)}
                    >
                        {mobileMenu ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
                <div className="lg:hidden bg-richblack-900 border-t border-richblack-700 px-6 py-4">
                    {NavbarLinks.map((link, index) => (
                        <div key={index} className="mb-3">
                            {link.title === "Catalog" ? (
                                <>
                                    <button
                                        className="flex w-full justify-between text-richblack-25"
                                        onClick={() => setMobileCatalog(!mobileCatalog)}
                                    >
                                        Catalog <FaCaretDown />
                                    </button>

                                    {mobileCatalog && (
                                        <div className="ml-4 mt-2 space-y-2">
                                            {subLinks.map((sub) => (
                                                <Link
                                                    key={sub._id}
                                                    to={`/catalog/${sub.name}`}
                                                    className="block text-sm text-richblack-200"
                                                    onClick={() => setMobileMenu(false)}
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to={link.path}
                                    className="block text-richblack-25"
                                    onClick={() => setMobileMenu(false)}
                                >
                                    {link.title}
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
};

export default NavBar;
