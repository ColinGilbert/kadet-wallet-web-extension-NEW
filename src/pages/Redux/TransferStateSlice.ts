import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TransferState {
  amount: string;
  receiver: string;
  receiverChainId: string;
  receiverPublicKey: string;
}

const initialState: TransferState = {
  amount: '0',
  receiver: '',
  receiverChainId: '1',
  receiverPublicKey: '',
};

export const transferStateSlice = createSlice({
  name: 'TransferState',
  initialState,
  reducers: {
    setAmount: (state, action: PayloadAction<string>) => {
      state.amount = action.payload;
    },
    setReceiver: (state, action: PayloadAction<string>) => {
      state.receiver = action.payload;
    },
    setReceiverChainId: (state, action: PayloadAction<string>) => {
      state.receiverChainId = action.payload;
    },
    setReceiverPublicKey: (state, action: PayloadAction<string>) => {
      state.receiverPublicKey = action.payload;
    },
  },
});

export const {
  setAmount,
  setReceiver,
  setReceiverChainId,
  setReceiverPublicKey,
} = transferStateSlice.actions;

export default transferStateSlice.reducer;
