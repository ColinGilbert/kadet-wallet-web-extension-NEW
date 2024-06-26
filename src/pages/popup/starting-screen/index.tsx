// src/Components/CreateAccount/index.tsx
import React from 'react';
import Create from '../pages/createAccount/create';
import Import from '../pages/createAccount/import';
// import { ButtonDemo } from "../../shared/Components/shadenButton";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
// import Popover from "../../shared/Components/Popover";
import Landing from '@/../public/images/Landing.png';
import { ReactComponent as Khelmet } from '@/../public/images/Khelmet.svg';
import { ReactComponent as Klogo } from '@/../public/images/Klogo copy.svg';

function StartScreen() {
  console.log('Starting Screen');
  return (
    <div className="overflow-hidden bg-[#101413] flex flex-col justify-end gap-1 w-full h-[600px] items-stretch px-4 pt-2 py-7">
      <div className="flex flex-row items-center self-center justify-start w-1/2 gap-3 mb-[1.3rem] ">
        <Khelmet alt="Kadet Helmet" />
        <Klogo alt="Kadet Logo" />
      </div>
      <div className="inline-flex items-center justify-center w-full h-6 text-2xl font-medium text-center text-zinc-100 ">
        The First cross-chain
      </div>
      <div className="inline-flex items-center justify-center w-full h-6 text-2xl font-medium text-center text-zinc-100 ">
        crypto wallet on Kadena
      </div>
      <div className="text-center  font-light text-lg  w-full px-4 mt-1  text-[#F2F2F2]  mx-1">
        Now, you can send Kadena from any chain and see NFTs right in your
        wallet.
      </div>
      <div className="relative flex flex-col items-stretch justify-start px-5">
        <div className="flex flex-row items-start justify-start gap-px px-1 py-0 bg-blend-normal top-px left-5">
          <img src={Landing} alt="Kadet Landing"></img>
        </div>
      </div>
      <Link
        to="/Login"
        // className="flex flex-col justify-center w-full "
      >
        <Button
          variant="link"
          size={'default'}
          className="whitespace-nowrap text-base font-medium leading-[6px] text-[#86d992] "
        >
          Login
        </Button>
      </Link>

      <Link
        to="/CreatePasswordForSrpCreation"
        // className="flex flex-col justify-center w-full "
      >
        <Button
          variant="link"
          size={'default'}
          className="whitespace-nowrap text-base font-medium leading-[6px] text-[#86d992] "
        >
          Create Wallet
        </Button>
      </Link>

      <Link
        to="/CreatePasswordForWalletImport"
        //className="flex flex-col items-stretch justify-center w-full h-10 px-3 overflow-hidden "
      >
        <Button
          variant="link"
          size={'default'}
          className="whitespace-nowrap text-base font-medium leading-[6px] text-[#86d992] "
        >
          Import Existing Wallet
        </Button>
      </Link>
    </div>
  );
}

export default StartScreen;
