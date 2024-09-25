import React, { useState } from "react";
import { sampleUsers } from "../../constant/SampleData";
import UserItem from "../shared/UserItem";
import { asyncMutationHandler, useClickOutside } from "../../hooks/hook";
import { useDispatch } from "react-redux";
import { setIsAddMember } from "../../redux/reducers/miscSlice";
import {
  useAddMemberInGroupMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";
import toast from "react-hot-toast";

const AddNewMemberToGroup = ({ chatId }) => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState(sampleUsers);
  const { isError, error, data, isLoading } = useAvailableFriendsQuery("");

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [addMembers, isLoadingAddMembers] = asyncMutationHandler(
    useAddMemberInGroupMutation
  );

  const AddNewMemberRef = useClickOutside(() => {
    dispatch(setIsAddMember(false));
  });

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((curr) => curr !== id) : [...prev, id]
    );
  };
  const closeHandler = () => {
    setSelectedMembers([]);
    // setMembers([]);
    dispatch(setIsAddMember(false));
  };

  const addMemberSubmitHandler = () => {
    if (selectedMembers.length < 1) toast.error("Please select Members to add");
    else
      addMembers("Adding Members....", {
        chatId,
        members: selectedMembers,
      });
    closeHandler();
  };

  return (
    <>
      <div className=" z-10 flex justify-center items-center absolute  bg-black opacity-40  right-0  w-[100vw] h-[100vh] backdrop-blur-[100vh] top-0"></div>
      <div
        ref={AddNewMemberRef}
        className=" rounded-xl z-10 absolute top-[12%] left-[25%]  max-sm:w-[250px]  mx-auto my-2 bg-white w-[30%] "
      >
        <div className="  flex flex-col p-4 items-center gap-4">
          <div className=" w-[80%] flex flex-col overflow-scroll  max-h-[70vh] gap-4 p-2 ">
            <div className=" w-full flex max-sm:flex-col justify-between gap-2">
              <h2>Add Members</h2>
              <input
                placeholder=" Search members"
                className="  p-2  text-black h-8  border-b-black  border-b-[1px] outline-none"
              />
            </div>
            {!isLoading &&
              data?.friends.map((user, i) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))}
          </div>
          <div className=" flex gap-2">
            <button
              className=" outline p-1 outline-1 rounded-md hover:bg-slate-200"
              onClick={closeHandler}
            >
              Cancel
            </button>
            <button
              className=" bg-blue-500 px-2 rounded-md hover:bg-blue-800 text-white"
              disabled={selectedMembers < 1}
              onClick={addMemberSubmitHandler}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewMemberToGroup;
