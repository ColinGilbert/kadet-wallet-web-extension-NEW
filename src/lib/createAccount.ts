import Pact from 'pact-lang-api';

import { getKeysFromMnemonic } from './keys';
import NetworkStateSlice from '@src/pages/Redux/NetworkStateSlice';
import { creationTime, getAccountInfo } from './utils';
import { store } from '@src/pages/Redux/store';

export async function createAccount(mnemonic: string): Promise<boolean> {
  const { networkId, chainId, apiHost } = getAccountInfo();

  const keys = getKeysFromMnemonic(mnemonic);
  const newAccount = 'k:' + keys.publicKey;
  const cmd = {
    networkId,
    pactCode: `(coin.create-account "${newAccount}" (read-keyset "account-keyset"))`,
    envData: {
      'account-keyset': {
        keys: [keys.publicKey],
        pred: 'keys-all',
      },
    },
    keyPairs: {
      publicKey: keys.publicKey,
      secretKey: keys.secretKey,
    },
    meta: {
      creationTime: creationTime(),
      ttl: 28000,
      gasLimit: 850,
      chainId,
      gasPrice: 0.00000001,
      sender: 'kadena-xchain-gas',
    },
  };

  const response = await Pact.fetch.send(cmd, apiHost);
  console.log(response);
  console.log(`Request key: ${response.requestKeys[0]}`);
  console.log('Transaction pending...');

  const txResult = await Pact.fetch.listen(
    { listen: response.requestKeys[0] },
    apiHost
  );
  console.log(txResult);

  console.log(txResult?.result?.status);

  if (txResult?.result?.status === 'success') return true;
  else return false;
}
