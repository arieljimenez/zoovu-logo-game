interface GetItemStyleProps {
  isDragging: boolean;
  draggableStyle?: object;
}

interface MoveProps {
  source: LetterObject[];
  destination: LetterObject[];
  droppableSource: Dropeable;
  droppableDestination: Dropeable;
}

interface ReorderProps {
  list: LetterObject[];
  startIndex: number;
  endIndex: number;
}

interface GameBoardProps {
  startTime: () => void;
  stopTime: () => void;
  increaseTotalTime: (amount:number) => void;
  totalTime: number;
  timeStatus: string;
}