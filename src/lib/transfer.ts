import Pact from 'pact-lang-api';
import { getAccountInfo, creationTime } from './utils';
import { store } from '@src/pages/Redux/store';
export async function transfer(receiver: string, amount: string) {
  const { networkId, chainId, apiHost } = getAccountInfo();

  const KEY_PAIR = {
    publicKey: store.getState().walletState.publicKey,
    secretKey: store.getState().walletState.secretKey,
  };
  const sender = 'k:' + KEY_PAIR.publicKey;
  const cmd = {
    networkId: networkId,
    keyPairs: [
      Object.assign(KEY_PAIR, {
        clist: [
          Pact.lang.mkCap(
            'GAS',
            'Capability to allow buying gas',
            'coin.GAS',
            []
          ).cap,
          Pact.lang.mkCap(
            'Transfer',
            'Capability to allow coin transfer',
            'coin.TRANSFER',
            [sender, receiver, { decimal: amount }]
          ).cap,
        ],
      }),
    ],
    pactCode: `(coin.transfer "${sender}" "${receiver}" ${amount})`,
    envData: {},
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 800,
      chainId: chainId,
      gasPrice: 0.0000001,
      sender: sender,
    },
  };

  const response = await Pact.fetch.send(cmd, apiHost);
  // console.log(response);
  if (response.requestKeys !== undefined) {
    console.log(`\nRequest key: ${response.requestKeys[0]}`);
    console.log('Transaction pending...');

    const txResult = await Pact.fetch.listen(
      { listen: response.requestKeys[0] },
      apiHost
    );
    console.log('Transaction mined!');

    //return txResult;
    return true;
  } else return false; //return 'Error. Do you have any funds in your account?';
}
