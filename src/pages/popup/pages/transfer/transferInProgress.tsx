import React from 'react';
import { transfer } from '@src/lib/transfer';
import { Link } from 'react-router-dom';
import { Button } from '@src/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@src/pages/Redux/store';
import { setReceiverPublicKey } from '@src/pages/Redux/TransferStateSlice';
import { transferCrossChain } from '@src/lib/transferCrossChain';

const TransferInProgress = () => {
  const [isFinished, setIsFinished] = React.useState(false);
  const [success, setIsSuccess] = React.useState(false);

  const amount = useSelector((state: RootState) => state.transferState.amount);
  const receiver = useSelector(
    (state: RootState) => state.transferState.receiver
  );
  const senderChainId = useSelector(
    (state: RootState) => state.walletState.chainId
  );
  const receiverChainId = useSelector(
    (state: RootState) => state.transferState.receiverChainId
  );
  const receiverPublicKey = useSelector(
    (state: RootState) => state.transferState.receiverPublicKey
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(
      senderChainId + ', ' + receiverChainId + ' ' + receiverPublicKey
    );
    if (senderChainId === receiverChainId) {
      transfer(receiver, amount).then((value) => {
        setIsFinished(true);
        setIsSuccess(value);
      });
    } else {
      transferCrossChain(receiver, receiverPublicKey, amount, receiverChainId)
        .then((value) => {
          console.log(value);
          setIsFinished(true);
          setIsSuccess(true);
        })
        .catch((error) => {
          console.log(error);
          setIsFinished(true);
          setIsSuccess(false);
        })
        .finally(() => dispatch(setReceiverPublicKey('')));
    }
  }, []);

  return (
    <div className="bg-[#101413] flex flex-col w-full h-[600px] text-center">
      <div className="text-2xl mx-4 font-sans font-semibold mb-[1.18rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Transferring funds
      </div>
      <div className="text-sm font-sans mx-4 tracking-[0.25] mb-[1.81rem] leading-[20px] text-[#fff] w-[20.5rem] break-words">
        {!isFinished && 'Transfer underway...'}
        {isFinished &&
          success &&
          `Transfer succeeded! ${amount} deposited to account ${receiver} from chain ${senderChainId} to ${receiverChainId}`}
        {isFinished && !success && 'Transfer failed. :('}
        {isFinished && (
          <p>
            <Link to="/Dashboard">
              <Button variant="link">Return to dashboard</Button>
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default TransferInProgress;
