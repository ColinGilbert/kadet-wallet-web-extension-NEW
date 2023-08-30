import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppState {
  enteredSrp: string[];
  enteredSrpIndex: number;
}

const initialState: AppState = {
  enteredSrp: ["", "", "", "", "", "", "", "", "", "", "", ""],
  enteredSrpIndex: 0,
};

export const appStateSlice = createSlice({
  name: "AppState",
  initialState,
  reducers: {
    changeEnteredSrp: (state, action: PayloadAction<string[]>) => {
      state.enteredSrp = action.payload;
    },
    incrementEnteredSrpIndex: (state, action: PayloadAction<void>) => {
      state.enteredSrpIndex++;
    },
  },
});

export const { changeEnteredSrp, incrementEnteredSrpIndex } =
  appStateSlice.actions;

export default appStateSlice.reducer;
