import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { sampleUsers } from "../../constant/SampleData";
import UserItem from "../shared/UserItem";
import {
  useLazySearchFriendQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";

import { toast } from "react-hot-toast";
import { asyncMutationHandler, useClickOutside } from "../../hooks/hook";
import { useDispatch } from "react-redux";
import { setIsNotification, setIsSearch } from "../../redux/reducers/miscSlice";

function SearchDialog() {
  const dispatch = useDispatch();
  const [searchUser] = useLazySearchFriendQuery();
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState(sampleUsers);

  const [sendFriendRequest, isLoading] = asyncMutationHandler(
    useSendFriendRequestMutation
  );

  const sendFriendRequestHandler = async (id) => {
    await sendFriendRequest("Sending Friend Request...", { userId: id });
  };

  const searchMenuRef = useClickOutside(() => {
    dispatch(setIsSearch(false));
  });

  useEffect(() => {
    const TimeoutId = setTimeout(() => {
      searchUser(searchValue).then(({ data }) => setSearchResults(data.users));
    }, 1000);

    return () => {
      clearTimeout(TimeoutId);
    };
  }, [searchValue]);

  return (
    <>
      <div className=" z-10 flex justify-center items-center absolute  bg-black opacity-40  right-0  mt-[7vh] w-[100vw] h-[93vh] backdrop-blur-[100vh] top-0"></div>
      <div
        ref={searchMenuRef}
        className=" rounded-xl z-10 absolute top-[12%] left-[30%]  max-md:left-[10%]  mx-auto my-2 bg-white w-[30%] max-md:w-[80%] h-[80%]"
      >
        <div className="  flex flex-col p-4 items-center gap-4">
          <h2>Find People</h2>
          <div className=" p-2 w-full flex justify-center items-center gap-2">
            <input
              placeholder=" Find people..."
              className=" rounded-lg p-2 w-full text-black h-8  outline-black  outline outline-1"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <BsSearch size={25} className=" cursor-pointer" />
          </div>
          <div className=" w-[100%] flex flex-col gap-4 p-2 scrollbar-none  scrollbar-thin overflow-y-auto max-h-[60vh]">
            {searchResults &&
              searchResults?.map((user, i) => (
                <UserItem
                  key={(user._id, i)}
                  user={user}
                  handler={sendFriendRequestHandler}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchDialog;
