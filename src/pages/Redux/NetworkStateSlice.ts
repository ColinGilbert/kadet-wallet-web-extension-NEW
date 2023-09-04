import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface NetworkState {
  name: string;
  url: string;
  explorer: string;
  networkId: string;
  isDefault: boolean;
  id: string;
}
const defaultNetworks: NetworkState[] = [
  {
    name: 'Mainnet',
    url: 'https://chainweb.kaddex.com',
    explorer: 'https://explorer.chainweb.com/mainnet',
    networkId: 'mainnet01',
    isDefault: true,
    id: '0',
  },
  {
    name: 'Testnet',
    url: 'https://api.testnet.chainweb.com',
    explorer: 'https://explorer.chainweb.com/testnet',
    networkId: 'testnet04',
    isDefault: true,
    id: '1',
  },
  {
    name: 'Ecko Devnet',
    url: 'https://devnet.ecko.finance',
    explorer: 'https://explorer.chainweb.com/testnet',
    networkId: 'development',
    isDefault: true,
    id: '101',
  },
];

const initialState: NetworkState = {
  name: defaultNetworks[1].name,
  url: defaultNetworks[1].url,
  explorer: defaultNetworks[1].explorer,
  networkId: defaultNetworks[1].networkId,
  isDefault: defaultNetworks[1].isDefault,
  id: defaultNetworks[1].id,
};

export const networkStateSlice = createSlice({
  name: 'NetworkState',
  initialState,
  reducers: {
    setNetwork: (state, action: PayloadAction<string>) => {
      let network = defaultNetworks.find(
        (element) => element.name === action.payload
      );
      if (network === undefined) network = defaultNetworks[1];
    },
  },
});

export const { setNetwork } = networkStateSlice.actions;

export default networkStateSlice.reducer;
