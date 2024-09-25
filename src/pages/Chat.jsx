import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import AppLayout from "../components/Layout/AppLayout";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import { sampleMessages } from "../constant/SampleData";
import MessageComponent from "../components/shared/MessageComponent";
import { getSocket } from "../socket";
import {
  ALERT,
  NEW_MESSAGE,
  START_TYPING,
  STOP_TYPING,
} from "../constant/events";
import { useChatDetailsQuery, useGetMessagesQuery } from "../redux/api/api";
import authSlice from "../redux/reducers/auth";
import store from "../redux/store";
import { useSelector, useDispatch } from "react-redux";
import {
  useClickOutside,
  useErrors,
  useSocketEventhandler,
} from "../hooks/hook";
import { useInfiniteScrollTop } from "6pp";
import { current } from "@reduxjs/toolkit";
import { setIsFileMenu } from "../redux/reducers/miscSlice";
import FileMenuDialog from "../components/dialogs/FileMenuDialog";
import { resetChatAlert } from "../redux/reducers/notification";
import { TypingLoader } from "../components/Layout/Loaders";
import { useNavigate } from "react-router-dom";

const Chat = ({ chatId }) => {
  const containerRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  const [typedMessage, setTypedMessage] = useState("");

  const [isTyping, setIsTyping] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const timeRef = useRef(null);
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  const { isFileMenu } = useSelector((store) => store.misc);

  const oldChatChunk = useGetMessagesQuery({ chatId, page });

  const oldAllMessages = oldChatChunk?.data?.messages;
  const totalPages = oldChatChunk?.data?.totalPages;

  const socket = getSocket();
  const navigate = useNavigate();

  const chatdata = useChatDetailsQuery({ chatId, skip: !chatId });

  const members = chatdata?.data?.chat?.members;

  const membersExeptMe = members?.filter((data) => data !== user._id);

  const errors = [
    { isError: chatdata.isError, error: chatdata.error },
    { isError: oldChatChunk.isError, error: oldChatChunk.error },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!typedMessage.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, members, message: typedMessage });

    setTypedMessage("");
  };

  const handleNewMessage = useCallback(
    (data) => {
      if (chatId !== data.chatId) return;
      setMessages((prev) => [...prev, data?.message]);
    },
    [chatId]
  );
  const messageTypingListner = useCallback(
    (data) => {
      if (chatId !== data.chatId) return;
      setUserTyping(true);
    },
    [chatId]
  );

  const messageStopTypingListner = useCallback(
    (data) => {
      if (chatId !== data.chatId) return;

      setUserTyping(false);
    },
    [chatId]
  );

  const messageOnChange = (e) => {
    setTypedMessage(e.target.value);

    if (!isTyping) {
      socket.emit(START_TYPING, { members: membersExeptMe, chatId });
      setIsTyping(true);
    }

    if (timeRef.current) clearTimeout(timeRef.current);

    timeRef.current = setTimeout(() => {
      setIsTyping(false);
      socket.emit(STOP_TYPING, { members: membersExeptMe, chatId });
    }, 2000);
  };

  const handleFileOpen = () => {
    dispatch(setIsFileMenu(true));
  };

  const alertListner = useCallback(
    (data) => {
      if (chatId !== data.chatId) return;

      const alertMessage = {
        content: data.content,
        sender: {
          _id: "asdasdasda",
          name: "Admin",
        },
        chat: chatId,
        createdAt: new Date().toString(),
      };

      setMessages((prev) => [...prev, alertMessage]);
    },
    [chatId]
  );

  const socketEvents = {
    [NEW_MESSAGE]: handleNewMessage,
    [START_TYPING]: messageTypingListner,
    [STOP_TYPING]: messageStopTypingListner,
    [ALERT]: alertListner,
  };

  useSocketEventhandler(socket, socketEvents);

  useErrors(errors);

  const { data: oldMessages, setData: setOldMessages } = useInfiniteScrollTop(
    containerRef,
    totalPages,
    page,
    setPage,
    oldAllMessages
  );

  useEffect(() => {
    dispatch(resetChatAlert(chatId));
    return () => {
      setMessages([]);
      setOldMessages([]);
      setPage(1);
    };
  }, [chatId]);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, userTyping]);

  useEffect(() => {
    if (chatdata?.isError) return navigate("/");
  }, [chatdata.isError]);

  return (
    <>
      <div>
        <div
          ref={containerRef}
          className=" flex  flex-col p-2 space-x-1 h-[83vh] w-full bg-gray-200  overflow-x-hidden overflow-y-auto scrollbar-thin "
        >
          <div className=" flex flex-col gap-2 ">
            {oldMessages &&
              oldMessages?.map((message) => (
                <MessageComponent
                  key={message._id}
                  message={message}
                  user={user}
                />
              ))}

            {messages.map((message) => (
              <MessageComponent
                key={message._id}
                message={message}
                user={user}
              />
            ))}
            {userTyping && <TypingLoader />}
            <div ref={bottomRef} />
          </div>
        </div>
        <FileMenuDialog isFileMenu={isFileMenu} chatId={chatId} />
        <form
          className=" px-2 py-4 h-[10%] bg-white flex w-full items-center gap-3 justify-between"
          onSubmit={(e) => handleSubmit(e)}
        >
          <MdOutlineAttachFile size={30} onClick={() => handleFileOpen()} />
          <input
            className="bg-gray-200 p-1 rounded-md w-full h-10 outline outline-1 outline-orange-200 overflow-x-hidden overflow-y-auto"
            value={typedMessage}
            onChange={(e) => messageOnChange(e)}
          />
          <button type="submit">
            <IoMdSend
              size={30}
              color="white"
              className=" bg-orange-400  rounded-full p-1 hover:bg-red-500"
            />
          </button>
        </form>
      </div>
    </>
  );
};

export default AppLayout()(Chat);
