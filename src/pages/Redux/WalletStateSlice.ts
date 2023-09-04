import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface WalletState {
  chainId: string;
  balance: number;
  account: string;
  alias: string;
  publicKey: string;
  secretKey: string;
  // wallets: RawWallet[];
  connectedSites: string[];
}

const initialState: WalletState = {
  chainId: '1',
  balance: 0,
  account: '',
  alias: '',
  publicKey: '',
  secretKey: '',
  connectedSites: [],
};

export const srpStateSlice = createSlice({
  name: 'WalletState',
  initialState,
  reducers: {
    setChainId: (state, action: PayloadAction<string>) => {
      state.chainId = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setAccount: (state, action: PayloadAction<string>) => {
      state.account = action.payload;
    },
    setAlias: (state, action: PayloadAction<string>) => {
      state.alias = action.payload;
    },
    setPublicKey: (state, action: PayloadAction<string>) => {
      state.publicKey = action.payload;
    },
    setSecretKey: (state, action: PayloadAction<string>) => {
      state.secretKey = action.payload;
    },
    setConnectedSites: (state, action: PayloadAction<string[]>) => {
      state.connectedSites = action.payload;
    },
  },
});

export const {
  setChainId,
  setBalance,
  setAccount,
  setAlias,
  setPublicKey,
  setSecretKey,
  setConnectedSites,
} = srpStateSlice.actions;

export default srpStateSlice.reducer;
