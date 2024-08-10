import { useEffect, useState } from "react";
import { FaMessage, FaUserGear } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";

const DashBordNav = () => {
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      window.location.href = "/login";
    }

    setUser(JSON.parse(user));
  }, []);



  return (
    <div>
      <nav className="bg-gray-200 p-2 rounded-lg ">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              className="p-2 rounded-lg w-72 h-10"
              placeholder="Search"
            />
            <button className="bg-blue-600 text-white px-2 py-1 rounded-lg  h-10">
              Search
            </button>
          </div>
          <div className="flex items-center justify-center gap-10">
            <div className="flex gap-2 items-center text-sm">
              <FaMessage size={16} />
              Message
            </div>
            <div className="flex gap-2 items-center text-sm">
              <IoIosNotifications size={20} />
              Notification
            </div>
            <div className="flex items-center gap-5 p-1 px-4">
              <FaUserGear size={20} />
              <div>
                <h1 className="font-semibold">{user?.username}</h1>
                <h2 className="text-gray-700 text-sm">{user?.role}</h2>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default DashBordNav;
