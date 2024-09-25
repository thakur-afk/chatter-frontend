import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { server } from "../../constant/config";
import { adminExists, adminNotExists } from "../../redux/reducers/auth";
import toast from "react-hot-toast";

const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <MdDashboardCustomize />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FaUserCog />,
  },
  {
    name: "chats",
    path: "/admin/chats",
    icon: <FaUsersGear />,
  },
  {
    name: "messages",
    path: "/admin/messages",
    icon: <BiSolidMessageSquareDetail />,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/admin/logout`, {
        withCredentials: true,
      });

      toast.success(data?.message);
      dispatch(adminNotExists());
    } catch (error) {
      toast.error(error?.response?.data.message || "Something went wrong");
    }
  };

  return (
    <div className={`w-full sm:text-lg  text-white`}>
      <h1 className=" text-lg  mb-4 text-center pt-2">Chatter</h1>
      <div className=" flex flex-col   p-2  gap-2">
        {adminTabs.map((tab, i) => {
          return (
            <Link key={i} to={`${tab.path}`}>
              <div
                className={`${
                  location.pathname === tab.path
                    ? "bg-orange-400 text-black"
                    : " bg-orange-500"
                } rounded-lg p-2 flex  gap-3 items-center hover:bg-orange-400`}
              >
                {tab.icon}
                {tab.name}
              </div>
            </Link>
          );
        })}
        <Link onClick={handleLogout} className="">
          <div
            className={`bg-orange-500 rounded-lg p-2 flex  gap-3 items-center hover:bg-orange-400`}
          >
            <IoLogOutOutline size={25} />
            Logout
          </div>
        </Link>
      </div>
    </div>
  );
};

const AdminLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();

  const { isAdmin } = useSelector((state) => state.auth);

  const handleMobileView = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  if (!isAdmin) {
    return <Navigate to={"/admin"} />;
  }

  return (
    <div>
      <div className=" overflow-hidden grid grid-cols-12  w-[100vw] h-[100vh] ">
        <div className=" col-span-3 max-sm:hidden bg-slate-600">
          <Sidebar />
        </div>
        <div className=" overflow-y-auto scrollbar-thin scrollbar-none col-span-9 max-sm:col-span-12 bg-green-300">
          <div className=" p-2  flex justify-end">
            <div className=" sm:hidden ">
              <GiHamburgerMenu size={25} onClick={handleMobileView} />
            </div>
          </div>
          {children}
        </div>
      </div>
      <div
        className={`w-[60%] h-[100vh] p-2 absolute left-0  ${
          isMobileMenuOpen ? "max-sm:translate-x-0" : ""
        } transition-transform -translate-x-full top-0 bg-slate-900`}
      >
        {/* <GroupList myGroups={sampleChats} chatId={chatId} /> */}
        <Sidebar />
      </div>
    </div>
  );
};

export default AdminLayout;
