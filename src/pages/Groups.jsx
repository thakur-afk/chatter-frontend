import React, { useEffect, lazy, useState, Suspense } from "react";
import { MdAdd, MdEdit, MdOutlineKeyboardBackspace } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { sampleChats } from "../constant/SampleData";
import AvatarCard from "../components/shared/AvatarCard";
import { MdOutlineEdit } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { BackDrop, LayoutLoader } from "../components/Layout/Loaders";
import AddNewMemberToGroup from "../components/dialogs/AddNewMemberToGroup";
import { sampleUsers } from "../constant/SampleData";
import UserItem from "../components/shared/UserItem";
import {
  useAddMemberInGroupMutation,
  useChatDetailsQuery,
  useDeleteChatMutation,
  useMyGroupsQuery,
  useRemoveMemberInGroupMutation,
  useRenameGroupMutation,
} from "../redux/api/api";
import { asyncMutationHandler, useErrors } from "../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducers/miscSlice";

const ConfirmDeleteDialog = lazy(() =>
  import("../components/dialogs/ConfirmDeleteDialog")
);

const Groups = () => {
  const dispatch = useDispatch();
  const { isAddMember } = useSelector((state) => state.misc);
  const navigate = useNavigate();
  const chatId = useSearchParams()[0].get("group");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("group name");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [AddNewMemberToGroupDialog, setAddNewMemberToGroupDialog] =
    useState(false);

  const [members, setMembers] = useState(null);
  const [removeMember, isLoadingRemoveMember] = asyncMutationHandler(
    useRemoveMemberInGroupMutation
  );

  const [deleteGroup] = asyncMutationHandler(useDeleteChatMutation);

  const myGroups = useMyGroupsQuery("");

  const [updateGroup] = asyncMutationHandler(useRenameGroupMutation);

  const groupDetails = useChatDetailsQuery(
    { chatId, populate: true },
    { skip: !chatId }
  );

  const errors = [
    {
      isError: myGroups.error,
      error: myGroups.error,
    },
    {
      isError: groupDetails.error,
      error: groupDetails.error,
    },
  ];

  useErrors(errors);

  const handleMobileMenuGroupList = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails.data.chat.name);
      setGroupNameUpdatedValue(groupDetails.data.chat.name);
      setMembers(groupDetails.data.chat.members);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails.data, groupDetails.refetch]);

  const navigateBack = () => {
    navigate("/");
  };

  const confirmDeleteHandler = () => {
    deleteGroup("Deleting group....", chatId);
    navigate("/group");
    setConfirmDeleteDialog(false);
  };
  const openAddNewMemberToGroupDialog = () => {
    dispatch(setIsAddMember(true));
  };

  const updateGroupName = () => {
    setGroupName(groupNameUpdatedValue); //this will not happend
    setIsEdit(false);
    updateGroup("Updating group name...", {
      chatId,
      name: groupNameUpdatedValue,
    });
  };

  const openDeleteDialog = () => {
    setConfirmDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setConfirmDeleteDialog(false);
  };

  const GroupName = (
    <>
      {isEdit ? (
        <>
          <div className=" p-2 text-2xl  max-sm:text-md flex gap-2 justify-center items-center">
            <input
              className=" p-2 max-sm:w-44  max-w-fit outline"
              value={groupNameUpdatedValue}
              onChange={(e) => setGroupNameUpdatedValue(e.target.value)}
            />

            <MdDone size={25} onClick={updateGroupName} />
          </div>
        </>
      ) : (
        <div className=" p-2 text-2xl max-sm:text-md flex gap-2 justify-center items-center">
          <p className=" p-2"> {groupName} </p>
          <MdEdit onClick={() => setIsEdit(true)} />
        </div>
      )}
    </>
  );

  const ButtonGroup = (
    <>
      <div className=" flex gap-4 items-center  sm:justify-between  max-sm:flex-col-reverse">
        <button
          className=" flex justify-center items-center gap-1  p-2 outline  outline-1 outline-red-500 rounded-lg"
          onClick={openDeleteDialog}
        >
          <MdDelete color="red" size={25} />
          Delete group
        </button>
        <button
          className="  flex justify-center items-center gap-1 bg-blue-500 text-white p-2 rounded-lg"
          onClick={openAddNewMemberToGroupDialog}
        >
          <MdAdd size={25} />
          Add Member
        </button>
      </div>
    </>
  );

  const removeMemberHandler = (id) => {
    removeMember("Removing...", { chatId, userId: id });
    groupDetails.refetch();
  };

  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <>
      <div className=" grid h-[100vh] grid-cols-12 ">
        <div className=" max-sm:hidden col-span-4 bg-slate-900 text-white">
          <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
        </div>
        <div className=" flex flex-col col-span-8 p-2 max-sm:col-span-12">
          <div className=" flex   w-full justify-between">
            <div className=" bg-orange-500 p-2 rounded-full hover:bg-orange-700 cursor-pointer">
              <MdOutlineKeyboardBackspace
                size={25}
                color=" white"
                onClick={navigateBack}
              />
            </div>

            <div
              className=" bg-orange-500 p-2 rounded-full hidden max-sm:block"
              onClick={handleMobileMenuGroupList}
            >
              <GiHamburgerMenu size={25} color="white" />
            </div>
          </div>
          <div className=" flex  justify-center items-center flex-col  gap-3">
            {chatId && (
              <div className=" flex flex-col gap-3">
                {GroupName}
                <p className=" text-md text-gray-500 ">Members</p>
                <div className=" w-96 max-sm:w-60 h-60 flex flex-col gap-3 p-4  outline-blue-500  outline outline-2  rounded-lg overflow-auto">
                  {members &&
                    members.map((user, i) => (
                      <UserItem
                        key={user._id}
                        user={user}
                        handler={removeMemberHandler}
                        isAdded={true}
                        className=" bg-white"
                      />
                    ))}
                </div>
                {ButtonGroup}
              </div>
            )}
          </div>
          {confirmDeleteDialog && (
            <Suspense fallback={<BackDrop />}>
              <ConfirmDeleteDialog
                closeDeleteDialog={closeDeleteDialog}
                confirmDeleteHandler={confirmDeleteHandler}
              />
            </Suspense>
          )}
          {isAddMember && (
            <Suspense fallback={<BackDrop />}>
              <AddNewMemberToGroup chatId={chatId} />
            </Suspense>
          )}
        </div>
      </div>
      <div
        className={`w-[60%] h-[100vh] p-2 absolute left-0  ${
          isMobileMenuOpen ? "max-sm:translate-x-0" : ""
        } transition-transform -translate-x-full text-white top-0 bg-slate-900`}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatId={chatId} />
      </div>
    </>
  );
};

const GroupList = ({ myGroups = [], chatId }) => (
  <div className=" flex flex-col p-2 gap-3">
    {myGroups.length > 0 ? (
      myGroups.map((group, i) => (
        <GroupListItem key={i + 1} group={group} chatId={chatId} />
      ))
    ) : (
      <p>No Groups</p>
    )}
  </div>
);

const GroupListItem = ({ group, chatId }) => {
  const { avatar, name, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) e.preventDefault();
      }}
    >
      <div className="flex gap-4 items-center  bg-orange-400 p-2 rounded-lg h-12 hover:bg-orange-200">
        <AvatarCard avatars={avatar} />
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default Groups;
