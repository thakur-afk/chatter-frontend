import React, { memo } from "react";
import { Link } from "react-router-dom";
import AvatarCard from "./AvatarCard";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  sameSender,
  isOnline,
  newMessageAlert,
  index = 0,
  handleDeleteChat,
}) => {
  const dispact = useDispatch();

  return (
    <>
      <Link
        to={`/chat/${_id}`}
        onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}
      >
        <motion.div
          initial={{ opacity: 0, y: "-100%" }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={` flex  items-center gap-3 max-md:text-xs h-12 rounded-lg p-2 ${
            sameSender ? "bg-blue-900 text-white" : "bg-blue-400 text-white"
          }  relative`}
        >
          <AvatarCard avatars={avatar} />
          <div className="flex flex-col">
            <p>{name}</p>
            {!sameSender && newMessageAlert && (
              <p>{newMessageAlert.count} New Message</p>
            )}
          </div>
          {!groupChat && isOnline && (
            <div className="w-3 h-3 rounded-xl bg-green-400 absolute top-[50%] right-4 translate-y-[-50%]" />
          )}
        </motion.div>
      </Link>
    </>
  );
};

export default memo(ChatItem);
