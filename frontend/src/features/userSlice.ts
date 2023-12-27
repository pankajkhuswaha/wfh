import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  user: User | null;
}

const initialState: CounterState = {
  user: null,
};

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserToStore: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { addUserToStore } = userSlice.actions;

export default userSlice.reducer;
