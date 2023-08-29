import React from "react";
import { useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";
interface SrpOutBadgeProps {
  number: number;
  text: string;
}

const SrpOutBadge: React.FC<SrpOutBadgeProps> = ({ number, text = "" }) => {
  const [collectedProps, drop] = useDrop(() => ({
    accept: ItemTypes.BADGE_IN,
    drop: () => ({ num: number }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const numberText = `${number}. ${text}`;
  return (
    <div
      className={`border-dashed border-[#f4f2ee] w-[6.5rem] flex flex-row h-10 z-0 border rounded `}
      ref={drop}
    >
      <div
        className={`flex flex-row  pl-2 pr-[1.62rem] py-[0.62rem] items-center `}
      >
        <div className="text-sm font-semibold  text-[#f4f2ee] pr-[0.25rem]">
          {numberText}
        </div>
        {/* <div className="text-sm font-medium  text-[#f4f2ee]">{phrase}</div> */}
      </div>
    </div>
  );
};

export { SrpOutBadge };
