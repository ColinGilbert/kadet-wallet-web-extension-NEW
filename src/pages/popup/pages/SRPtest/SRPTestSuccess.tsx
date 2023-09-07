import React from 'react';
import { Button } from '@src/components/ui/button';
import { createAccount } from '@src/lib/createAccount';
import { useSelector } from 'react-redux';
import { RootState, store } from '@src/pages/Redux/store';
import { storedPasswordIndex } from '../../../../../utils/constants';
import { createStoredPassword } from '@src/lib/utils';

const SrpTestSuccess = () => {
  const [ready, setReady] = React.useState(false);
  const [error, setError] = React.useState(false);
  const correctSrp = useSelector(
    (state: RootState) => state.srpState.correctSrp
  );
  const password = useSelector(
    (state: RootState) => state.passwordState.password
  );
  React.useEffect(() => {
    let success = false;
    const successPromise = createAccount(correctSrp.join(' '));
    successPromise.then((value) => {
      success = value;
      console.log(success);
      setReady(success);
      if (success === false) setError(true);
      if (success) {
        const storedPassword = createStoredPassword(password);
        chrome.storage.local
          .set({
            storedPassword: JSON.stringify(storedPassword),
          })
          .then(() => console.log('Password is set.'));
      }
    });
  }, []);

  return (
    <div className="bg-[#101413] flex flex-col w-full h-[600px] text-center">
      <div className="text-2xl mx-4 font-sans font-semibold mb-[1.18rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Creating account
      </div>
      <div className="text-sm font-sans mx-4 tracking-[0.25] mb-[1.81rem] leading-[20px] text-[#fff] w-[20.5rem]">
        {!ready
          ? 'Please wait as your account gets created...'
          : 'Good to go. :)'}
      </div>
      <Button
        variant={ready ? 'default' : 'disabled'}
        size={'lg'}
        className="mx-4"
      >
        Continue
      </Button>
      {error && 'There was an error in creating your account.'}
    </div>
  );
};

export default SrpTestSuccess;
