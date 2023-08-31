import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import SrpTestImpl from './SrpTestImpl';
import { RootState } from '@src/pages/Redux/store';
import { useSelector } from 'react-redux';
import { store } from '@src/pages/Redux/store';
import { incrementEnteredSrpIndex } from '@src/pages/Redux/SrpStateSlice';

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const SrpTest: React.FC = () => {
  const correctSrp = useSelector(
    (state: RootState) => state.srpState.correctSrp
  );
  const shuffledList = shuffle([...correctSrp]);

  return (
    <DndProvider backend={HTML5Backend}>
      <SrpTestImpl shuffledList={shuffledList} correctList={correctSrp} />
    </DndProvider>
  );
};

export default SrpTest;
