import React from "react";
import ChatItem from "../shared/ChatItem";

const ChatList = ({
  w = "100%",
  Chats = [],
  chat_id,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <div className={`flex flex-col p-2 gap-2 w-[${w}]`}>
      {Chats?.map((data, index) => {
        const { avatar, _id, name, groupChat, members } = data;

        const newMessageAlert = newMessagesAlert.find(
          ({ chatId }) => chatId === _id
        );

        const isOnline = onlineUsers.includes(members[0]);

        return (
          <ChatItem
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            groupChat={groupChat}
            members={members}
            _id={_id}
            key={_id}
            sameSender={chat_id === _id}
            // newMessageAlert={newMessageAlert}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </div>
  );
};

export default ChatList;
