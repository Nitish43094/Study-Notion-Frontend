import React from "react";
import * as IoIcons from "react-icons/io";
import * as VscIcons from "react-icons/vsc";
import * as FaIcons from "react-icons/fa";
import { NavLink, useLocation, matchPath } from "react-router-dom";

const Icons = {
  ...IoIcons,
  ...VscIcons,
  ...FaIcons,
};

const SidebarLinks = ({ link, iconName }) => {

  const IconComponent = Icons[iconName];
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <NavLink
      to={link.path}
      className={`relative px-7 py-2 text-sm font-medium flex items-center gap-x-2
        ${
          matchRoute(link.path)
            ? "bg-yellow-100 border-l-4 border-yellow-500 text-black"
            : "text-white hover:bg-richblack-700"
        }`}
    >
      {IconComponent && <IconComponent className="text-lg" />}
      <span>{link.name}</span>
    </NavLink>
  );
};

export default SidebarLinks;
