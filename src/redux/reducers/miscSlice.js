import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdmin: false,
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobile: false,
  isFileMenu: false,
  isDeleteMenu: false,
  isSearch: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
  isLoading: true,
};

const falseState = {
  isAdmin: false,
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobile: false,
  isFileMenu: false,
  isDeleteMenu: false,
  isSearch: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
  isLoading: true,
};

const miscSlice = createSlice({
  name: "misc",
  initialState,

  reducers: {
    setIsAdmin: (state, action) => {
      state.isAdmin = action.payload;
    },
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsUplaodingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isSearch = action.payload;
    },
  },
});

export default miscSlice;

export const {
  setIsAddMember,
  setIsAdmin,
  setIsDeleteMenu,
  setIsFileMenu,
  setIsLoadings,
  setIsLoading,
  setIsMobile,
  setIsNewGroup,
  setIsNotification,
  setIsSearch,
  setIsUplaodingLoader,
  setSelectedDeleteChat,
} = miscSlice.actions;
