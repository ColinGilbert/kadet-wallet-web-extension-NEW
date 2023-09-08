import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface PasswordState {
  password: string;
  confirmPassword: string;
  passwordsMatch: boolean;
  showPassword: boolean;
  passwordError: string;
  confirmPasswordError: string;
  isPasswordValidated: boolean;
  isCheckboxChecked: boolean;
  errorMessage: string;
}

const initialState: PasswordState = {
  password: '',
  confirmPassword: '',
  passwordsMatch: false,
  showPassword: false,
  passwordError: '',
  confirmPasswordError: '',
  isPasswordValidated: false,
  isCheckboxChecked: false,
  errorMessage: '',
};

export const passwordStateSlice = createSlice({
  name: 'PasswordState',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setConfirmPassword: (state, action: PayloadAction<string>) => {
      state.confirmPassword = action.payload;
    },
    setPasswordsMatch: (state, action: PayloadAction<boolean>) => {
      state.passwordsMatch = action.payload;
    },
    setShowPassword: (state, action: PayloadAction<boolean>) => {
      state.showPassword = action.payload;
    },
    setPasswordError: (state, action: PayloadAction<string>) => {
      state.passwordError = action.payload;
    },
    setConfirmPasswordError: (state, action: PayloadAction<string>) => {
      state.confirmPasswordError = action.payload;
    },
    setIsPasswordValidated: (state, action: PayloadAction<boolean>) => {
      state.isPasswordValidated = action.payload;
    },
    setIsCheckboxChecked: (state, action: PayloadAction<boolean>) => {
      state.isCheckboxChecked = action.payload;
    },
    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setPassword,
  setConfirmPassword,
  setPasswordsMatch,
  setShowPassword,
  setPasswordError,
  setConfirmPasswordError,
  setIsPasswordValidated,
  setIsCheckboxChecked,
  setErrorMessage,
} = passwordStateSlice.actions;

export default passwordStateSlice.reducer;
