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
