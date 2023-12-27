import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    auth: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
