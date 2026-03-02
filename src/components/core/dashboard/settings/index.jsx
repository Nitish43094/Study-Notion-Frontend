import UpdateImage from "./UpdateImage";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePassword";
import DeleteAccount from "./DeleteAccount";

const Setting = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 text-white overflow-x-hidden">
      {/* Heading */}
      <h1 className="mb-8 text-2xl sm:text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>

      {/* Content wrapper */}
      <div className="flex flex-col gap-8 max-w-5xl">
        <UpdateImage />
        <EditProfile />
        <UpdatePassword />
        <DeleteAccount />
      </div>
    </div>
  );
};

export default Setting;
