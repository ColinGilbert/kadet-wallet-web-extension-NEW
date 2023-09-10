import { configureStore } from '@reduxjs/toolkit';
import SrpStateSliceReducer from './SrpStateSlice';
import PasswordStateSliceReducer from './PasswordStateSlice';
import NetworkStateSliceReducer from './NetworkStateSlice';
import WalletStateReducer from './WalletStateSlice';
import TransferStateReducer from './TransferStateSlice';

export const store = configureStore({
  reducer: {
    srpState: SrpStateSliceReducer,
    passwordState: PasswordStateSliceReducer,
    networkState: NetworkStateSliceReducer,
    walletState: WalletStateReducer,
    transferState: TransferStateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
