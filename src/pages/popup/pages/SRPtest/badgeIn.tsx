import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  changeEnteredSrp,
  incrementEnteredSrpIndex,
} from "@src/pages/Redux/SrpStateSlice";
import { RootState } from "@src/pages/Redux/store";
import { store } from "@src/pages/Redux/store";

interface SrpTestBadgeProps {
  phrase: string;
}
interface DropResult {
  num: number;
}

const SrpInBadge: React.FC<SrpTestBadgeProps> = ({ phrase }) => {
  let enteredSrp = useSelector((state: RootState) => state.srpState.enteredSrp);
  const unsubscribe = store.subscribe(() => {
    enteredSrp = store.getState().srpState.enteredSrp;
  });
  const dispatch = useDispatch();
  const [collected, drag, dragPreview] = useDrag(
    () => ({
      type: ItemTypes.BADGE_IN,
      item: { phrase },
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<DropResult>();
        if (item && dropResult) {
          const newSrp = [...enteredSrp];
          // TODO: Add word to array
          newSrp[dropResult.num - 1] = item.phrase;
          dispatch(changeEnteredSrp(newSrp));
          dispatch(incrementEnteredSrpIndex());
          console.log(enteredSrp + " - " + newSrp);
        }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
        handlerId: monitor.getHandlerId(),
      }),
    }),
    [phrase]
  );
  return (
    <div
      className={`border-solid bg-current justify-self-center justify-center self-center items-center border-[#9aeca4] w-[6.5rem] flex flex-row h-10 z-0 border rounded `}
      ref={drag}
    >
      <div className={`flex flex-row justify-center self-center items-center `}>
        <div className="text-sm font-medium text-[#f4f2ee]">{phrase}</div>
      </div>
    </div>
  );
};

export { SrpInBadge };
