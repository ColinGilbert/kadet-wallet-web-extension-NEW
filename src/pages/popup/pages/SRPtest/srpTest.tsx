import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SrpTestImpl from "./SrpTestImpl";

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

const correctList = [
  "father",
  "monkey",
  "building",
  "seed",
  "mother",
  "hat",
  "dodge",
  "him",
  "market",
  "show",
  "dad",
  "body",
];

const shuffledList = shuffle(correctList);

const SrpTest: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <SrpTestImpl shuffledList={shuffledList} correctList={correctList} />
    </DndProvider>
  );
};

export default SrpTest;
