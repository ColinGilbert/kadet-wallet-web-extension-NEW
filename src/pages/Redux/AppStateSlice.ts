import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  enteredSrp: string[];
}

const initialState: AppState = {
  enteredSrp: ["", "", "", "", "", "", "", "", "", "", "", ""],
};

export const appStateSlice = createSlice({
  name: "AppState",
  initialState,
  reducers: {
    changeEnteredSrp: (state, action: PayloadAction<string[]>) => {
      state.enteredSrp = action.payload;
    },
  },
});

export const { changeEnteredSrp } = appStateSlice.actions;

export default appStateSlice.reducer;
