import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./reducers/auth";
import api from "./api/api";
import miscSlice from "./reducers/miscSlice";
import NotificationSlice from "./reducers/notification";
const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [miscSlice.name]: miscSlice.reducer,
    [api.reducerPath]: api.reducer,
    [NotificationSlice.name]: NotificationSlice.reducer,
  },
  middleware: (mid) => [...mid(), api.middleware],
});

export default store;
