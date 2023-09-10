import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '@src/pages/Redux/store';
import { decryptSRP } from '@src/lib/utils';
import { getKeysFromMnemonic } from '@src/lib/keys';
import {
  setPublicKey,
  setSecretKey,
  setBalance,
} from '@src/pages/Redux/WalletStateSlice';
import { Button } from '@src/components/ui/button';
import { getBalance } from '@src/lib/getBalance';
const truncatePublicKey = (pubkey: string) => {
  const truncated: string[] = [];
  truncated.push(pubkey.slice(0, 8));
  truncated.push('...');
  truncated.push(pubkey.slice(56, 64));
  return truncated;
};

const Dashboard = () => {
  let chainId = useSelector((state: RootState) => state.walletState.chainId);
  let balance = useSelector((state: RootState) => state.walletState.balance);
  let account = useSelector((state: RootState) => state.walletState.account);
  let alias = useSelector((state: RootState) => state.walletState.alias);
  let networkName = useSelector((state: RootState) => state.networkState.name);
  let publicKey = useSelector(
    (state: RootState) => state.walletState.publicKey
  );
  let secretKey = useSelector(
    (state: RootState) => state.walletState.secretKey
  );

  const dispatch = useDispatch();

  store.subscribe(() => {
    publicKey = store.getState().walletState.publicKey;
    secretKey = store.getState().walletState.secretKey;
    balance = store.getState().walletState.balance;
  });

  React.useEffect(() => {
    let mnemonic: string[];
    chrome.storage.local.get(['encryptedSRP']).then((value) => {
      console.log(value.encryptedSRP);
      mnemonic = decryptSRP(JSON.parse(value.encryptedSRP));
      console.log(mnemonic);
      const keys = getKeysFromMnemonic(mnemonic.join(' '));
      dispatch(setPublicKey(keys.publicKey));
      dispatch(setSecretKey(keys.secretKey as string));
      console.log(
        keys.publicKey + ' ' + keys.publicKey.length + ' ' + keys.secretKey
      );
      let newBalance = 0;
      getBalance(publicKey, secretKey).then((value) => {
        newBalance = value;
        dispatch(setBalance(newBalance));
      });
    });
  }, []);

  return (
    <div className="bg-[#101413] flex flex-col w-full h-[600px] text-center">
      <div className="text-2xl mx-4 font-sans font-semibold mb-[1.18rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Dashboard
      </div>
      <div className="text-sm font-sans mx-4 tracking-[0.25] mb-[1.81rem] leading-[20px] text-[#fff] w-[20.5rem]">
        <p>k:{truncatePublicKey(publicKey)}</p>
        <p>Network: {networkName}</p>
        <p>Chain: {chainId}</p>
        <p>Balance: {balance} KDA</p>
      </div>
      <div>
        <Link to="/TransferInput">
          <Button>Transfer</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
