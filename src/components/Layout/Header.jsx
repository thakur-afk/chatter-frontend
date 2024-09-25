import React, { useState, lazy, Suspense } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
// import { useErrors } from "../../hooks/hook";
import { BsSearch } from "react-icons/bs";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { IoNotifications } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { BackDrop } from "./Loaders";
import ManageGroup from "../specific/ManageGroup";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../constant/config";
import { userExists, userNotExists } from "../../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMobile,
  setIsSearch,
  setIsNotification,
  setIsNewGroup,
} from "../../redux/reducers/miscSlice";
import { useClickOutside } from "../../hooks/hook";
import { resetNotificationCount } from "../../redux/reducers/notification";

const SearchDialog = lazy(() => import("../specific/SearchDialog"));
const NotificationsDialog = lazy(() =>
  import("../specific/NotificationsDialog")
);
const NewGroupDialog = lazy(() => import("../specific/NewGroupDialog"));

const Header = () => {
  const dispatch = useDispatch();
  const { NotificationCount } = useSelector((store) => store.notification);
  const { isMobile, isSearch, isNotification, isNewGroup } = useSelector(
    (state) => state.misc
  );

  // const [sda, setIsNotification] = useState(false);
  // const [isAddNewGroup, setIsAddNewGroup] = useState(false);

  const handleMobileDrawer = () => {
    dispatch(setIsMobile(!isMobile));
  };

  const handleNotifications = () => {
    dispatch(setIsNotification(!isNotification));
    dispatch(resetNotificationCount());
  };
  const handleSearch = () => {
    dispatch(setIsSearch(!isSearch));
  };
  const handleAddNewGroup = () => {
    dispatch(setIsNewGroup(true));
  };
  const handleLogout = async () => {
    try {
      const { data } = await axios(`${server}/api/v1/users/logout`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(userNotExists());
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className=" h-[7vh] bg-[#604CC3] text-white">
        <div className=" flex  justify-between p-4 max-sm:p-2 items-center">
          <div className="max-sm:hidden text-lg font-mono  cursor-pointer">
            Chatter
          </div>
          <div className=" sm:hidden">
            <GiHamburgerMenu size={30} onClick={handleMobileDrawer} />
          </div>
          <div>
            <div>
              <div className=" items-center flex gap-3">
                <BsSearch size={22} onClick={handleSearch} />
                <IoMdAdd size={22} onClick={handleAddNewGroup} />

                <Link to={"/group"}>
                  <AiOutlineUsergroupAdd size={25} />
                </Link>
                <div className=" flex items-center justify-center cursor-pointer">
                  <p className=" flex items-center justify-center w-fit origin-top-right relative left-3 bottom-2  bg-blue-900 text-xs rounded-full px-1">
                    {NotificationCount}
                  </p>
                  <IoNotifications size={25} onClick={handleNotifications} />
                </div>

                <IoLogOutOutline size={25} onClick={handleLogout} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {isSearch && (
        <Suspense
          fallback={
            <div>
              <BackDrop />
            </div>
          }
        >
          <SearchDialog />
        </Suspense>
      )}
      {isNotification && (
        <Suspense
          fallback={
            <div>
              {" "}
              <BackDrop />
            </div>
          }
        >
          <NotificationsDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense
          fallback={
            <div>
              {" "}
              <BackDrop />
            </div>
          }
        >
          <NewGroupDialog />
        </Suspense>
      )}
    </div>
  );
};

export default Header;
