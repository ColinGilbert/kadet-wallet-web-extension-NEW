import { configureStore } from "@reduxjs/toolkit";
import SrpStateSliceReducer from "./SrpStateSlice";
import PasswordStateSliceReducer from "./PasswordStateSlice";

export const store = configureStore({
  reducer: {
    srpState: SrpStateSliceReducer,
    passwordState: PasswordStateSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
