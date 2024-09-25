import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { asyncMutationHandler, useClickOutside } from "../../hooks/hook";
import { setIsDeleteMenu } from "../../redux/reducers/miscSlice";
import { IoMdExit } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  useDeleteChatMutation,
  useLeaveGroupMutation,
} from "../../redux/api/api";

const DeleteMenuOption = ({ dispatch }) => {
  const { isDeleteMenu, selectedDeleteChat } = useSelector(
    (state) => state.misc
  );

  const navigate = useNavigate();

  const [deleteChat, _, deleteChatDetail] = asyncMutationHandler(
    useDeleteChatMutation
  );
  const [leaveGroup, __, LeaveGroupDetails] = asyncMutationHandler(
    useLeaveGroupMutation
  );

  const DeleteMenuRef = useClickOutside(() => {
    dispatch(setIsDeleteMenu(false));
  });
  const DeleteChatHandler = () => {
    dispatch(setIsDeleteMenu(false));
    deleteChat("deleting chat ...", selectedDeleteChat.chatId);
  };
  const LeaveGroupHandler = () => {
    dispatch(setIsDeleteMenu(false));

    leaveGroup("leaving group ...", selectedDeleteChat.chatId);
  };

  useEffect(() => {
    if (deleteChatDetail || LeaveGroupDetails) navigate("/");
  }, [deleteChatDetail, LeaveGroupDetails]);

  return (
    <div
      ref={DeleteMenuRef}
      onClick={
        selectedDeleteChat.groupChat ? LeaveGroupHandler : DeleteChatHandler
      }
      className={` bg-white relative z-10 w-fit right-14 bottom-4 p-2 shadow-md rounded-md cursor-pointer`}
    >
      {selectedDeleteChat.groupChat ? (
        <div className=" flex gap-1 items-center justify-center">
          <IoMdExit />
          Leave Group
        </div>
      ) : (
        <div className=" flex gap-1 items-center justify-center">
          <MdDelete />
          Delete Chat
        </div>
      )}
    </div>
  );
};

export default DeleteMenuOption;
