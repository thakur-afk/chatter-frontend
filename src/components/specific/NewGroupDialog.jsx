import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { sampleUsers } from "../../constant/SampleData";
import UserItem from "../shared/UserItem";
import {
  useAvailableFriendsQuery,
  useCreateGroupMutation,
} from "../../redux/api/api";
import toast from "react-hot-toast";
import {
  asyncMutationHandler,
  useClickOutside,
  useErrors,
} from "../../hooks/hook";
import { useDispatch } from "react-redux";
import { setIsNewGroup } from "../../redux/reducers/miscSlice";

const NewGroupDialog = () => {
  const { isError, error, data } = useAvailableFriendsQuery();

  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [createGroup, isLoading] = asyncMutationHandler(useCreateGroupMutation);

  const dispatch = useDispatch();
  const createGroupRef = useClickOutside(() => dispatch(setIsNewGroup(false)));

  const handleSelectedMember = (_id) => {
    setSelectedMembers((prev) =>
      prev.includes(_id) ? prev.filter((curr) => curr !== _id) : [...prev, _id]
    );
  };

  const errors = [{ isError, error }];
  useErrors(errors);
  const submitHandler = (e) => {
    e.preventDefault();

    if (groupName === "") return toast.error("Please enter name of the group");

    if (selectedMembers.length < 2)
      return toast.error("Please select more than 2 members");

    //creating group

    createGroup("Creating Group....", {
      name: groupName,
      members: selectedMembers,
    });
    dispatch(setIsNewGroup(false));
  };
  const closeHandler = () => {
    dispatch(setIsNewGroup(false));
  };

  return (
    <>
      <div className=" z-10 flex justify-center items-center absolute  bg-black opacity-40  right-0  mt-[7vh] w-[100vw] h-[93vh] backdrop-blur-[100vh] top-0"></div>
      <div
        ref={createGroupRef}
        className=" rounded-xl z-10 absolute top-[12%] left-[30%] max-md:left-[15%]  mx-auto my-2 bg-white w-[500px] max-sm:w-[80%] h-[80%]"
      >
        <div className="  flex flex-col p-4 items-center gap-4">
          <h2>Create New Group</h2>
          <div className=" s p-2 w-full flex justify-center items-center gap-2">
            <input
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder=" Name New Group"
              className=" shadow-lg rounded-lg p-2  text-black h-8  outline-black  outline outline-1"
            />
          </div>
          <div className=" w-full flex flex-col scrollbar-none  overflow-scroll overflow-x-hidden scrollbar-thin max-h-[50vh] gap-4 p-2 ">
            <div className=" w-full flex gap-2">
              <h2>Add Members</h2>
              {/* <input
                placeholder=" Search members"
                className=" rounded-lg p-2  text-black h-8  outline-black  outline outline-1"
              /> */}
            </div>
            {data &&
              data?.friends?.map((user, i) => (
                <UserItem
                  key={user._id}
                  user={user}
                  handler={handleSelectedMember}
                  isAdded={selectedMembers.includes(user._id)}
                />
              ))}
          </div>
          <div className=" w-full flex justify-evenly">
            <button
              className=" outline p-1 outline-1 rounded-md hover:bg-slate-200"
              onClick={closeHandler}
            >
              Cancel
            </button>
            <button
              className=" bg-blue-500 p-1 rounded-md hover:bg-blue-800 text-white"
              onClick={(e) => submitHandler(e)}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewGroupDialog;
