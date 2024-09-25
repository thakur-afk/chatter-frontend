/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
// import { useErrors } from "../../hooks/hook";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "./Header";
import ChatList from "../specific/ChatList";
import { sampleChats } from "../../constant/SampleData";
import { useNavigate, useParams } from "react-router-dom";
import Profile from "../specific/Profile";
import { useChatDetailsQuery, useMyChatsQuery } from "../../redux/api/api";
import { BackDrop, ChatListLoader } from "./Loaders";
import Drawer from "../shared/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { useErrors, useSocketEventhandler } from "../../hooks/hook";
import { getSocket } from "../../socket";
import {
  NEW_MESSAGE_ALERT,
  NEW_REQUEST,
  ONLINE_USERS,
  REFETCH_CHATS,
} from "../../constant/events";
import {
  incrementChatAlert,
  incrementNotificationCount,
} from "../../redux/reducers/notification";
import { getOrSaveLocal } from "../../lib/features";
import {
  setIsDeleteMenu,
  setSelectedDeleteChat,
} from "../../redux/reducers/miscSlice";
import DeleteMenuOption from "../dialogs/DeleteMenuOption";

const AppLayout = () => (WrapperComponent) => {
  // eslint-disable-next-line react/display-name

  // eslint-disable-next-line react/display-name
  return (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const params = useParams();
    const navigate = useNavigate();
    const chatId = params.chatId;
    const [pos, setPos] = useState({ left: 0, bottom: 0 });
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const { chatAlert } = useSelector((state) => state.notification);
    const socket = getSocket();
    const dispact = useDispatch();

    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");

    // useErrors([{ isError, error }]);
    useErrors([{ error, isError }]);

    useEffect(() => {
      getOrSaveLocal({ key: NEW_MESSAGE_ALERT, value: chatAlert });
    }, [chatAlert]);

    const { isMobile, isDeleteMenu } = useSelector((state) => state.misc);

    const handleNewNotification = () => {
      dispact(incrementNotificationCount());
    };
    const handleMessageAlert = useCallback(
      (data) => {
        if (chatId === data.chatId) return;

        dispact(incrementChatAlert(data));
      },
      [chatId]
    );
    useEffect(() => {
      refetch();
    }, []);
    const refetchListner = useCallback(() => {
      refetch();
      // navigate("/");
    }, [refetch, navigate]);

    const onlineUsersListner = (data) => {
      setOnlineUsers(data.onlineSockets);
    };

    const socketEvents = {
      [NEW_REQUEST]: handleNewNotification,
      [NEW_MESSAGE_ALERT]: handleMessageAlert,
      [REFETCH_CHATS]: refetchListner,
      [ONLINE_USERS]: onlineUsersListner,
    };

    useSocketEventhandler(socket, socketEvents);

    const handleDeleteChat = (e, chatId, groupChat) => {
      dispact(setIsDeleteMenu(true));
      dispact(setSelectedDeleteChat({ chatId, groupChat }));
      const currPos = e.currentTarget.getBoundingClientRect();
      setPos({ left: currPos.right, bottom: currPos.bottom });
    };

    return (
      <div className=" w-full scrollbar-thin  overflow-hidden">
        <Header />

        <Drawer isMobileMenuOpen={isMobile} h="93vh" top="8vh">
          <div>
            {isLoading ? (
              <ChatListLoader />
            ) : (
              <ChatList
                Chats={data?.chats}
                chat_id={chatId}
                newMessagesAlert={chatAlert}
                onlineUsers={onlineUsers}
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </div>
        </Drawer>
        <div className="h-[93vh] w-full overflow-hidden scrollbar-thin scrollbar-thumb-sky-700">
          <div className="h-full grid grid-cols-12">
            {isDeleteMenu && (
              <div
                style={{
                  left: `${pos.left}px`,
                  position: "absolute",
                  top: `${pos.bottom}px`,
                }}
              >
                <DeleteMenuOption dispatch={dispact} />
              </div>
            )}
            <div className=" bg-[#F1DEC6] col-span-3 max-sm:hidden sm:col-span-4  md:col-span-3">
              {isLoading ? (
                <ChatListLoader />
              ) : (
                <ChatList
                  Chats={data?.chats}
                  chat_id={chatId}
                  newMessagesAlert={chatAlert}
                  onlineUsers={onlineUsers}
                  handleDeleteChat={handleDeleteChat}
                />
              )}
            </div>
            <div className="h-full md:col-span-6 bg-green-200 max-sm:col-span-12 sm:col-span-8 ">
              <WrapperComponent {...props} chatId={chatId} />
            </div>
            <div className="h-full  bg-[rgba(0,0,0,0.85)] col-span-3 max-md:hidden  p-2 ">
              <Profile user={user} />
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default AppLayout;
