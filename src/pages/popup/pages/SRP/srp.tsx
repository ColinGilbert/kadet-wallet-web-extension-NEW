import React, { useState } from 'react';
import SrpBadge from './badge';
import SrpHeader from './headerSrp';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@src/pages/popup/pages/SRP/alertDialog';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, store } from '@src/pages/Redux/store';
import { createRandomMnemonic } from '@src/lib/keys';
import { setCorrectSrp } from '@src/pages/Redux/SrpStateSlice';

const Srp: React.FC = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const mnemonic = createRandomMnemonic().split(' ');
    console.log(mnemonic);
    dispatch(setCorrectSrp(mnemonic));
  }, [dispatch]);

  let correctSrp = useSelector((state: RootState) => state.srpState.correctSrp);
  const [Hide, setHide] = useState(false);

  const handleHideClick = () => {
    setHide(true);
  };

  return (
    <div className=" bg-[#101413] flex flex-col  w-full h-[600px]">
      <SrpHeader />
      <div className="text-2xl mx-4 font-sans font-semibold mb-[0.75rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Generate my Secret Recovery Phrase (SRP)
      </div>
      <div className="text-sm font-sans mx-4 tracking-[0.25] mb-[2.3rem] leading-[20px] text-[#fff] w-[20.5rem]">
        This is your Secret Recovery Phrase.{' '}
        <div className="text-[#86d992] contents">Write it down</div>
        <div className="contents">
          {' '}
          and keep it safe. You must reenter it on the next screen.
        </div>
      </div>

      <div className="flex flex-col w-[20.5rem] mx-4 mb-[3.3rem] gap-y-[1rem]">
        <div className="flex flex-row justify-center w-full gap-x-2 ">
          <SrpBadge
            number={1}
            phrase={correctSrp[0]}
            Border={Hide}
            blurSm={!Hide}
          />
          <SrpBadge
            number={2}
            phrase={correctSrp[1]}
            Border={Hide}
            blurSm={!Hide}
          />
          <SrpBadge
            number={3}
            phrase={correctSrp[2]}
            Border={Hide}
            blurSm={!Hide}
          />
        </div>
        <div className="z-0 flex flex-row justify-center mx-0 mt-0 gap-x-2 ">
          <SrpBadge
            number={4}
            phrase={correctSrp[3]}
            Border={Hide}
            blurSm={!Hide}
          />
          <SrpBadge
            number={5}
            phrase={correctSrp[4]}
            Border={Hide}
            blurSm={!Hide}
          />{' '}
          <button
            className={`absolute z-50 justify-center w-6 min-w-0 min-h-0 mt-4 ${
              Hide ? 'hidden' : ''
            }`}
            onClick={handleHideClick}
          >
            <img
              src="https://file.rendit.io/n/yzvFikGNr8Ldy6uuPCkf.svg"
              alt="eye"
            />
          </button>
          <SrpBadge
            number={6}
            phrase={correctSrp[5]}
            Border={Hide}
            blurSm={!Hide}
          />
        </div>

        <div className="flex flex-row justify-center mx-0 mt-0 gap-x-2 ">
          <SrpBadge
            number={7}
            phrase={correctSrp[6]}
            Border={Hide}
            blurSm={!Hide}
          />
          <SrpBadge
            number={8}
            phrase={correctSrp[7]}
            Border={Hide}
            blurSm={!Hide}
          />
          <SrpBadge
            number={9}
            phrase={correctSrp[8]}
            Border={Hide}
            blurSm={!Hide}
          />
          <button
            onClick={handleHideClick}
            className={`absolute z-50 justify-center  mb-4 ${
              Hide ? 'hidden' : ''
            }`}
          >
            <div className="whitespace-nowrap text-sm font-sans  font-semibold tracking-[0.5] leading-[24px] capitalize text-[#f4f2ee]">
              Click <div className="contents">to reveal </div>
              <div className="contents">Secret Recovery Phrase (SRP)</div>
            </div>
          </button>
        </div>

        <div className="flex flex-row items-center mx-0 mt-0 gap-x-2 ">
          <SrpBadge
            number={10}
            phrase={correctSrp[9]}
            Border={Hide}
            blurSm={!Hide}
          />
          <SrpBadge
            number={11}
            phrase={correctSrp[10]}
            Border={Hide}
            blurSm={!Hide}
          />
          <SrpBadge
            number={12}
            phrase={correctSrp[11]}
            Border={Hide}
            blurSm={!Hide}
          />
        </div>
      </div>
      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            variant={Hide ? 'default' : 'disabled'}
            size="lg"
            className="mx-4"
          >
            Confirm
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle> I have saved my SRP.</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-row self-end w-3/5 gap-2 ml-32">
            <AlertDialogCancel>
              <Link to="/SrpTest">
                <Button variant="default" size="sm" className="w-20">
                  Yes
                </Button>
              </Link>
            </AlertDialogCancel>

            <AlertDialogAction>
              <Button variant="outline" size="sm" className="w-16">
                No
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Srp;
