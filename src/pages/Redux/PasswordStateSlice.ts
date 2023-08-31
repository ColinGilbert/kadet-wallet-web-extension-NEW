import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface PasswordState {
  password: string;
  confirmPassword: string;
  passwordsMatch: boolean;
}

const initialState: PasswordState = {
  password: "",
  confirmPassword: "",
  passwordsMatch: false,
};

export const passwordStateSlice = createSlice({
  name: "PasswordState",
  initialState,
  reducers: {
    changePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    changeConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setPasswordsMatch: (state, action: PayloadAction<boolean>) => {
      state.passwordsMatch = action.payload;
    },
  },
});

export const { changePassword, changeConfirmPassword, setPasswordsMatch } =
  passwordStateSlice.actions;

export default passwordStateSlice.reducer;
