import React from 'react';
import { FormControl, TextField } from '@mui/material';
import CustomTextInput from '@src/components/ui/CustomTextInput';
import { Button } from '@src/components/ui/button';

import { object, TypeOf, string } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const Transfer = () => {
  const [amount, setAmount] = React.useState(0.0);
  const [name, setName] = React.useState('');

  const DecimalSchema = object({
    amount: string(),
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
    amount: '0.0',
  };

  const methods = useForm<IDecimal>({
    resolver: zodResolver(DecimalSchema),
    defaultValues,
  });

  React.useEffect(() => {
    console.log(amount);
  }, [amount]);

  return (
    <div className="bg-[#101413] flex flex-col w-full h-[600px] text-center">
      <div className="text-2xl mx-4 font-sans font-semibold mb-[1.18rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Transfer to account
      </div>
      <div className="flex flex-col items-stretch justify-start ml-4 text-[#fff]">
        <CustomTextInput>
          <TextField
            label="Amount"
            id="amount"
            onChange={(e) => {
              methods.setValue('amount', e.target.value);
              methods.trigger('amount');
              if (methods.formState.isValid) {
                const newVal = parseFloat(methods.getValues().amount);
                setAmount(newVal);
              }
            }}
            inputMode="decimal"
          />
          {!methods.formState.isValid ? 'Must enter a decimal number' : ' '}

          <TextField
            label="To"
            id="to"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Button>Send</Button>
        </CustomTextInput>
      </div>
    </div>
  );
};

export default Transfer;
