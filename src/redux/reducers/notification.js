import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveLocal } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constant/events";

const initialState = {
  NotificationCount: 0,
  chatAlert: getOrSaveLocal({ key: NEW_MESSAGE_ALERT, get: true }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const NotificationSlice = createSlice({
  name: "notification",

  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.NotificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.NotificationCount = 0;
    },
    incrementChatAlert: (state, action) => {
      const index = state.chatAlert.findIndex(
        (item) => item.chatId === action.payload.chatId
      );

      if (index !== -1) {
        state.chatAlert[index].count += 1;
      } else {
        state.chatAlert.push({ chatId: action.payload.chatId, count: 1 });
      }
    },

    resetChatAlert: (state, action) => {
      state.chatAlert = state.chatAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default NotificationSlice;

export const {
  incrementChatAlert,
  incrementNotificationCount,
  resetNotificationCount,
  resetChatAlert,
} = NotificationSlice.actions;
