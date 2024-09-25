import React from "react";
import { IoIosAddCircle } from "react-icons/io";
import { IoIosRemoveCircle } from "react-icons/io";
import AvatarCard from "./AvatarCard";

const UserItem = ({ user, handler, handlerIsLoading, isAdded = false }) => {
  const { name, avatar, _id } = user;
  return (
    <div className=" rounded-md p-2 shadow-lg w-full   flex justify-between items-center">
      <div className=" flex gap-3 justify-center items-center">
        <AvatarCard avatars={[avatar]} />
        <p className=" text-md">{name}</p>
      </div>

      <div onClick={() => handler(_id)}>
        {isAdded ? (
          <IoIosRemoveCircle color="red" size={25} />
        ) : (
          <IoIosAddCircle color="blue" size={25} />
        )}
      </div>
    </div>
  );
};

export default UserItem;
