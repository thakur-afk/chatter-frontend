import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAdmin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",

  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      (state.user = null), (state.loader = false);
    },
    adminExists: (state) => {
      state.isAdmin = true;
    },
    adminNotExists: (state) => {
      state.isAdmin = false;
    },
  },
});

export default authSlice;

export const { userExists, userNotExists, adminExists, adminNotExists } =
  authSlice.actions;
