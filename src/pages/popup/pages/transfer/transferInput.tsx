import React from 'react';
import { MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import CustomTextInput from '@src/components/ui/CustomTextInput';
import { Button } from '@src/components/ui/button';

import { object, TypeOf, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, store } from '@src/pages/Redux/store';
import {
  setAmount,
  setReceiver,
  setReceiverChainId,
  setReceiverPublicKey,
} from '@src/pages/Redux/TransferStateSlice';

const TransferInput = () => {
  const [chainId, setChainIdLocalState] = React.useState('1'); // We needed to change the setter name in order not to confuse TS with the redux slice setter

  const DecimalSchema = object({
    amount: string(),
    to: string().min(1),
  }).refine(
    (data) => {
      const pattern = /^[0-9]+\.[0-9]+$/;
      const patternNoWhitespacesOrLetters = /[^\s\D]/;
      return (
        pattern.test(data.amount) &&
        patternNoWhitespacesOrLetters.test(data.amount)
      );
    },
    { path: ['amount'], message: 'Must enter a decimal number' }
  );

  type IDecimal = TypeOf<typeof DecimalSchema>;

  const defaultValues: IDecimal = {
    amount: '0',
    to: '',
  };

  const methods = useForm<IDecimal>({
    resolver: zodResolver(DecimalSchema),
    defaultValues,
  });

  const dispatch = useDispatch();

  return (
    <div className="bg-[#101413] flex flex-col w-full h-[600px] text-center">
      <div className="text-2xl mx-4 font-sans font-semibold mb-[1.18rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Transfer KDA:
      </div>
      <div className="flex flex-col items-stretch justify-start ml-4 text-[#fff]">
        <CustomTextInput>
          <TextField
            label="Amount"
            id="amount"
            onChange={(e) => {
              methods.setValue('amount', e.target.value);
              methods.trigger('amount');
              //if (methods.formState.isValid) {
              //const newVal = methods.getValues().amount;
              dispatch(setAmount(e.target.value));
              console.log('Amount entered ' + e.target.value);
              //}
            }}
            inputMode="decimal"
          />
          Enter a decimal number
          <TextField
            className="my-8"
            label="To"
            id="to"
            onChange={(e) => {
              methods.setValue('to', e.target.value);
              methods.trigger('to');
              //if (methods.formState.isValid) {
              dispatch(setReceiver(e.target.value));
              console.log('Receiver entered ' + e.target.value);
              //}
            }}
          />
          Name of the account that will receive the funds
          <TextField
            className="my-8"
            id="receiverPublickey"
            onChange={(e) => {
              dispatch(setReceiverPublicKey(e.target.value));
            }}
          />
          Receiver's public key (only needed for cross-chain transfers)
          <Select
            id="label"
            value={chainId}
            onChange={(event) => {
              setChainIdLocalState(event?.target.value);
              dispatch(setReceiverChainId(event?.target.value));
            }}
          >
            {Array(20)
              .fill(0)
              .map((_, i) => (
                <MenuItem key={i} value={i.toString()}>
                  {i}
                </MenuItem>
              ))}
          </Select>
          Enter the chain you wish to transfer to
          <div className="text-center self-center">
            <Link to="/TransferInProgress">
              <Button
                className="my-8"
                variant={!methods.formState.isValid ? 'disabled' : 'default'}
              >
                Send
              </Button>
            </Link>
          </div>
          <div className="self-center">
            <Link to="/Dashboard">
              <Button className="my-8 text-[#86d992]" variant="link">
                Return to dashboard
              </Button>
            </Link>
          </div>
        </CustomTextInput>
      </div>
    </div>
  );
};

export default TransferInput;
