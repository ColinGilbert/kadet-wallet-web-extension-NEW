import Pact from 'pact-lang-api';
import { getAccountInfo, creationTime } from './utils';

export async function getBalance(publicKey: string, privateKey: string) {
  const { networkId, chainId, apiHost } = getAccountInfo();

  const account = 'k:' + publicKey;
  const KEY_PAIR = {
    publicKey: publicKey,
    secretKey: privateKey,
  };
  const cmd = {
    networkId: networkId,
    keyPairs: KEY_PAIR,
    pactCode: `(coin.get-balance "${account}")`,
    envData: {},
    meta: {
      creationTime: creationTime(),
      ttl: 600,
      gasLimit: 600,
      chainId: chainId,
      gasPrice: 0.0000001,
      sender: KEY_PAIR.publicKey,
    },
  };
  console.log(cmd);
  const result = await Pact.fetch.local(cmd, apiHost);
  console.log(result);
  return result?.result?.data as number;
}
