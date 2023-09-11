import React from 'react';
import { Button } from '@src/components/ui/button';
import CustomTextInput from '@src/components/ui/CustomTextInput';
import { TextField } from '@mui/material';

const ImportWallet = () => {
  const [ready, setReady] = React.useState(false);
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
            <Button variant={ready ? 'default' : 'disabled'} size={'lg'}>
              Continue
            </Button>
          </div>
        </div>
      </CustomTextInput>
    </div>
  );
};

export default ImportWallet;
