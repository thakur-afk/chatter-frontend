import React from "react";
import { BsSearch } from "react-icons/bs";
import { sampleUsers } from "../../constant/SampleData";
import UserItem from "../shared/UserItem";
import { IoIosAddCircle } from "react-icons/io";
import AvatarCard from "../shared/AvatarCard";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationsQuery,
} from "../../redux/api/api";
import { useClickOutside, useErrors } from "../../hooks/hook";
import Drawer from "../shared/Drawer";
import { ChatListLoader } from "../Layout/Loaders";
import { useDispatch } from "react-redux";
import { setIsNotification } from "../../redux/reducers/miscSlice";
import toast from "react-hot-toast";

const NotificationsDialog = () => {
  const dispatch = useDispatch();
  let searchResults = sampleUsers;
  let menuRefNotification = useClickOutside(() => {
    dispatch(setIsNotification(false));
  });

  const [acceptFriendRequest] = useAcceptFriendRequestMutation();

  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptFriendRequest({ requestId: _id, accept });
      if (res.data?.success) {
        // willl use socket
        toast.success(res.data.message || "Friend request accepted");
      } else {
        toast.error(res.data?.error || "something went wrong");
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const { isLoading, error, data, isError } = useGetNotificationsQuery();

  useErrors([{ error, isError }]);

  return (
    <>
      <div className=" z-10 flex justify-center items-center absolute  bg-black opacity-40  right-0  mt-[7vh] w-[100vw] h-[93vh] backdrop-blur-[100vh] top-0"></div>
      <div
        ref={menuRefNotification}
        className=" rounded-xl z-10 absolute top-[12%] left-[30%]  max-md:left-[10%]  mx-auto my-2 bg-white w-[30%] max-md:w-[80%] h-[80%]"
      >
        <div className="  flex flex-col p-4 items-center gap-4">
          <h2>Notifications</h2>

          {isLoading ? (
            <div className=" h-8  w-40 animate-pulse rounded-lg bg-slate-100 shadow-lg"></div>
          ) : (
            <>
              <div className=" w-[100%] flex flex-col gap-4 p-2 scrollbar-none  scrollbar-thin overflow-y-auto max-h-[60vh]  ">
                <p>Friend Requests</p>
                {data?.allRequests?.length > 0 ? (
                  data?.allRequests?.map(({ sender, _id }) => (
                    <NotificationItem
                      key={_id}
                      user={sender}
                      _id={_id}
                      handler={friendRequestHandler}
                    />
                  ))
                ) : (
                  <p>0 Notifications</p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
const NotificationItem = ({ user, handler, handlerIsLoading, _id }) => {
  const { name, avatar } = user;
  return (
    <div className=" rounded-md  p-2 shadow-lg w-full flex justify-between items-center">
      <div className=" flex gap-3 justify-center items-center">
        <AvatarCard avatars={[avatar]} />
        <p className=" text-md">{name}</p>
      </div>

      <div className=" text-white flex gap-2">
        <button
          onClick={() => handler({ _id, accept: true })}
          className=" p-1 rounded-md text-xs bg-green-600"
        >
          Accept
        </button>
        <button
          onClick={() => handler({ _id, accept: false })}
          className=" p-1 rounded-md  text-xs bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default NotificationsDialog;
