import React from "react";
import { SrpHeader } from "@src/pages/popup/pages/SRP/headerSrp";
import { SrpOutBadge } from "./badgeOut";
import { SrpInBadge } from "./badgeIn";
import { Button } from "@/components/ui/button";
import { useDrag } from "react-dnd";
import { useSelector, useDispatch } from "react-redux";
import { RootState, store } from "@src/pages/Redux/store";
import {
  changeEnteredSrp,
  incrementEnteredSrpIndex,
} from "@src/pages/Redux/AppStateSlice";
interface SrpTestProps {
  shuffledList: string[];
  correctList: string[];
  enteredSrp: string[];
}

const SrpTestImpl: React.FC<SrpTestProps> = ({ shuffledList, correctList }) => {
  let enteredSrpIndex = useSelector(
    (state: RootState) => state.appState.enteredSrpIndex
  );
  let enteredSrp = useSelector((state: RootState) => state.appState.enteredSrp);
  const unsubscribe = store.subscribe(() => {
    enteredSrpIndex = store.getState().appState.enteredSrpIndex;
    enteredSrp = store.getState().appState.enteredSrp;
  });
  const dispatch = useDispatch();
  return (
    <div className=" bg-[#101413] flex flex-col  w-full h-[600px]">
      <SrpHeader />
      <div className="text-2xl mx-4 font-sans font-semibold mb-[1.18rem] leading-[28px] text-[#fff] w-[20.5rem]">
        Reenter my SRP
      </div>
      <div className="text-sm font-sans mx-4 tracking-[0.25] mb-[1.81rem] leading-[20px] text-[#fff] w-[20.5rem]">
        Place the highlighted word into the correct box.
      </div>
      <div className="flex flex-col self-center  justify-center mb-[1.12rem] justify-self-center">
        <SrpInBadge phrase={shuffledList[enteredSrpIndex]} />
      </div>
      <div className="flex flex-col w-[20.5rem] mx-4 mb-[3.3rem] gap-y-[1rem]">
        <div className="flex flex-row justify-center w-full gap-x-2 ">
          <SrpOutBadge numberOf={1} text={enteredSrp[0]} />
          <SrpOutBadge numberOf={2} text={enteredSrp[1]} />
          <SrpOutBadge numberOf={3} text={enteredSrp[2]} />
        </div>
        <div className="z-0 flex flex-row justify-center mx-0 mt-0 gap-x-2 ">
          <SrpOutBadge numberOf={4} text={enteredSrp[3]} />
          <SrpOutBadge numberOf={5} text={enteredSrp[4]} />

          <SrpOutBadge numberOf={6} text={enteredSrp[5]} />
        </div>

        <div className="flex flex-row justify-center mx-0 mt-0 gap-x-2 ">
          <SrpOutBadge numberOf={7} text={enteredSrp[6]} />
          <SrpOutBadge numberOf={8} text={enteredSrp[7]} />
          <SrpOutBadge numberOf={9} text={enteredSrp[8]} />
        </div>

        <div className="flex flex-row items-center mx-0 mt-0 gap-x-2 ">
          <SrpOutBadge numberOf={10} text={enteredSrp[9]} />
          <SrpOutBadge numberOf={11} text={enteredSrp[10]} />
          <SrpOutBadge numberOf={12} text={enteredSrp[11]} />
        </div>
      </div>
      <Button variant={"disabled"} size={"lg"} className="mx-4">
        Continue
      </Button>
      <Button
        variant={"link"}
        size={"lg"}
        className="mx-4 text-[#FFFFFF] text-base "
        onClick={() => {
          dispatch(
            changeEnteredSrp(["", "", "", "", "", "", "", "", "", "", "", ""])
          );
        }}
      >
        Clear All
      </Button>
    </div>
  );
};

export default SrpTestImpl;
