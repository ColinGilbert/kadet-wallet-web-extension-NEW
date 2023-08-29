import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

interface SrpTestBadgeProps {
  phrase: string;
}
interface DropResult {
  num: number;
}

const SrpInBadge: React.FC<SrpTestBadgeProps> = ({ phrase }) => {
  const [collected, drag, dragPreview] = useDrag(() => ({
    type: ItemTypes.BADGE_IN,
    item: { phrase },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        alert(`You dropped ${item.phrase} into ${dropResult.num}`);
      }
    },
  }));
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
