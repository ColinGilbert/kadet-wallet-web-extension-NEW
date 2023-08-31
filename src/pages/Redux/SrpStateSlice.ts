import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SrpState {
  correctSrp: string[];
  enteredSrp: string[];
  enteredSrpIndex: number;
  passwordsMatch: boolean;
}

const initialState: SrpState = {
  correctSrp: [
    'father',
    'monkey',
    'building',
    'seed',
    'mother',
    'hat',
    'dodge',
    'him',
    'market',
    'show',
    'dad',
    'body',
  ],
  enteredSrp: ['', '', '', '', '', '', '', '', '', '', '', ''],
  enteredSrpIndex: 0,
  passwordsMatch: false,
};

export const srpStateSlice = createSlice({
  name: 'SrpState',
  initialState,
  reducers: {
    changeEnteredSrp: (state, action: PayloadAction<string[]>) => {
      state.enteredSrp = action.payload;
    },

    incrementEnteredSrpIndex: (state, action: PayloadAction<void>) => {
      state.enteredSrpIndex++;
    },
    resetEnteredSrpIndex: (state, action: PayloadAction<void>) => {
      state.enteredSrpIndex = 0;
    },
    changeCorrectSrp: (state, action: PayloadAction<string[]>) => {
      state.correctSrp = action.payload;
    },
  },
});

export const {
  changeEnteredSrp,
  incrementEnteredSrpIndex,
  resetEnteredSrpIndex,
  changeCorrectSrp,
} = srpStateSlice.actions;

export default srpStateSlice.reducer;
