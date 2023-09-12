import React from 'react';
import { Button } from '@src/components/ui/button';
import CustomTextInput from '@src/components/ui/CustomTextInput';
import { TextField } from '@mui/material';
import { getKeysFromMnemonic } from '@src/lib/keys';
import { getBalance } from '@src/lib/getBalance';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { store } from '@src/pages/Redux/store';
import { setCorrectSrp } from '@src/pages/Redux/SrpStateSlice';
import { setPublicKey, setSecretKey } from '@src/pages/Redux/WalletStateSlice';
import { encryptSRP } from '@src/lib/utils';

const ImportWallet = () => {
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [didTry, setDidTry] = React.useState(false);
  const [input0, setInput0] = React.useState('');
  const [input1, setInput1] = React.useState('');
  const [input2, setInput2] = React.useState('');
  const [input3, setInput3] = React.useState('');
  const [input4, setInput4] = React.useState('');
  const [input5, setInput5] = React.useState('');
  const [input6, setInput6] = React.useState('');
  const [input7, setInput7] = React.useState('');
  const [input8, setInput8] = React.useState('');
  const [input9, setInput9] = React.useState('');
  const [input10, setInput10] = React.useState('');
  const [input11, setInput11] = React.useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  React.useEffect(() => {
    setReady(
      input0 !== '' &&
        input1 !== '' &&
        input2 !== '' &&
        input3 !== '' &&
        input4 !== '' &&
        input5 !== '' &&
        input6 !== '' &&
        input7 !== '' &&
        input8 !== '' &&
        input9 !== '' &&
        input10 !== '' &&
        input11 !== ''
    );
  }, [
    input0,
    input1,
    input2,
    input3,
    input4,
    input5,
    input6,
    input7,
    input8,
    input9,
    input10,
    input11,
  ]);

  const handleInput = () => {
    const tentativeSRP =
      input0 +
      ' ' +
      input1 +
      ' ' +
      input2 +
      ' ' +
      input3 +
      ' ' +
      input4 +
      ' ' +
      input5 +
      ' ' +
      input6 +
      ' ' +
      input7 +
      ' ' +
      input8 +
      ' ' +
      input9 +
      ' ' +
      input10 +
      ' ' +
      input11;

    const keys = getKeysFromMnemonic(tentativeSRP);
    setDidTry(true);
    getBalance(keys.publicKey, keys.secretKey as string).then((bal) => {
      if (bal === undefined || bal === null) {
        console.log("Account doesn't exist");
        setError(true);
      } else {
        console.log('Good to go :)');
        // TODO: Dispatch to redux all relevant information.
        dispatch(setPublicKey(keys.publicKey));
        dispatch(setSecretKey(keys.secretKey as string));
        const SRPArray = tentativeSRP.split(' ');
        console.log('SRPArray: ' + SRPArray);
        const encryptedSRP = encryptSRP(SRPArray);
        const encryptedSRPString = JSON.stringify(encryptedSRP);
        chrome.storage.local
          .set({ encryptedSRP: encryptedSRPString })
          .then(() => navigate('/Dashboard'));
        //dispatch(setCorrectSrp(tentativeSRP.split(' ')));
      }
    });
  };

  return (
    <div className="bg-[#101413] flex flex-col w-full h-[600px] text-center">
      <div className="text-2xl mx-4 font-sans font-semibold mb-[1.18rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Import Wallet
      </div>
      <CustomTextInput>
        <div className="text-sm font-sans mx-4 tracking-[0.25] mb-[1.81rem] leading-[20px] text-[#fff] w-[20.5rem] grid grid-cols-3 gap-4">
          <TextField
            id="word0"
            onChange={(e) => setInput0(e.target.value)}
          ></TextField>
          <TextField
            id="word1"
            onChange={(e) => setInput1(e.target.value)}
          ></TextField>
          <TextField
            id="word2"
            onChange={(e) => setInput2(e.target.value)}
          ></TextField>
          <TextField
            id="word3"
            onChange={(e) => setInput3(e.target.value)}
          ></TextField>
          <TextField
            id="word4"
            onChange={(e) => setInput4(e.target.value)}
          ></TextField>
          <TextField
            id="word5"
            onChange={(e) => setInput5(e.target.value)}
          ></TextField>
          <TextField
            id="word6"
            onChange={(e) => setInput6(e.target.value)}
          ></TextField>
          <TextField
            id="word7"
            onChange={(e) => setInput7(e.target.value)}
          ></TextField>
          <TextField
            id="word8"
            onChange={(e) => setInput8(e.target.value)}
          ></TextField>
          <TextField
            id="word9"
            onChange={(e) => setInput9(e.target.value)}
          ></TextField>
          <TextField
            id="word10"
            onChange={(e) => setInput10(e.target.value)}
          ></TextField>
          <TextField
            id="word11"
            onChange={(e) => setInput11(e.target.value)}
          ></TextField>
          <div className="row-span-3 text-center">
            <Button
              variant={ready ? 'default' : 'disabled'}
              size={'lg'}
              onClick={handleInput}
              onKeyDown={handleInput}
            >
              Continue
            </Button>
            <p>
              {didTry &&
                error &&
                'Invalid secure recovery phrase. Did you make a typo?'}
            </p>
          </div>
        </div>
      </CustomTextInput>
    </div>
  );
};

export default ImportWallet;
