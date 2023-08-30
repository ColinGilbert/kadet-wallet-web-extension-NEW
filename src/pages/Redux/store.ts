import { configureStore } from "@reduxjs/toolkit";
import AppStateSliceReducer from "./AppStateSlice";

export const store = configureStore({
  reducer: {
    appState: AppStateSliceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
