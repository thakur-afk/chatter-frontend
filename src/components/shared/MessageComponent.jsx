import moment from "moment";
import React from "react";
import { FileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";
import { motion } from "framer-motion";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachments = [], createdAt } = message;
  const sameSender = sender._id === user._id;
  const TimeAgo = moment(createdAt).fromNow();

  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`bg-white w-fit px-2 py-1 ${
        sameSender ? "self-end" : ""
      } rounded-lg `}
    >
      {!sameSender && (
        <p className=" text-xs text-[#2694ab]  font-medium">{sender.name}</p>
      )}
      {content && <p className=" text-md">{content}</p>}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment.url;
          const file = FileFormat(url);

          return (
            <div key={index}>
              <a href={url} target="_blank" download style={{ color: "black" }}>
                <RenderAttachment file={file} url={url} />
              </a>
            </div>
          );
        })}
      <p className=" text-[10px] self-end w-fit  text-gray-500">{TimeAgo}</p>
    </motion.div>
  );
};

export default MessageComponent;
