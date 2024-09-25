import React from "react";
import { CgProfile } from "react-icons/cg";
import { SlCalender } from "react-icons/sl";
import { MdAlternateEmail } from "react-icons/md";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <div className=" flex flex-col gap-4 items-center p-5">
      <div className=" h-48 w-48">
        <img
          className="inline-block h-48 w-48 rounded-full ring-2 ring-white"
          src={
            transformImage(user?.avatar?.url) ||
            "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          alt=""
        />
      </div>
      <ProfileCard
        text={"Bio"}
        size={25}
        title={user.bio || "busy not adding bio"}
      />
      <ProfileCard text={"Name"} Icon={CgProfile} size={25} title={user.name} />

      <ProfileCard
        text={"Username"}
        Icon={MdAlternateEmail}
        size={25}
        title={user.username}
      />

      <ProfileCard
        text={"Joined"}
        Icon={SlCalender}
        title={moment(user.createdAt).fromNow()}
      />
    </div>
  );
};

const ProfileCard = ({ title, Icon, text, size }) => (
  <div className=" flex items-center gap-2 justify-center text-white ">
    <div>{Icon && <Icon size={size} />}</div>
    <div className=" flex flex-col items-center">
      <h2 className=" text-lg">{title}</h2>
      <p className="  text-sm text-gray-400">{text}</p>
    </div>
  </div>
);

export default Profile;
