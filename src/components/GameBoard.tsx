import * as React from 'react';
import { Box, Text } from 'rebass';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import LogoLetter from './LogoLetter';
import { getLetterObjects, getEmptySocketsInfo } from '../helpers';

const DROPPABLES = [
  'drop1',
  'drop2',
  'drop3',
  'drop4',
  'drop5'
];

const sxPiecesContainer = {
  display: 'flex',
  flex: 'auto',
  height: 150,
}

const sxSlotContainer = {
  display: 'flex',
  justifyContent: 'space-between',
}

const sxGameBoardContainer = {
  mt: 5,
}

const sxMiddleText = {
  mb: '50px',
  mt: '80px',
}

/**
 * GameBoard component.
 */
const GameBoard = ({ startTime, stopTime, increaseTotalTime, totalTime, timeStatus }: GameBoardProps): React.ReactElement => {
  const emptyPlaceHolders = getEmptySocketsInfo();

  const INITIAL_STATE = {
    logoLetters: [],
    drop1: [emptyPlaceHolders[0]],
    drop2: [emptyPlaceHolders[1]],
    drop3: [emptyPlaceHolders[2]],
    drop4: [emptyPlaceHolders[3]],
    drop5: [emptyPlaceHolders[4]],
  }

  const [boardState, setBoardState] = React.useState<BoardState>({
    ...INITIAL_STATE,
  });

  React.useEffect(() => {
    if (timeStatus === 'halted') {
      setBoardState({
        ...INITIAL_STATE,
        logoLetters: getLetterObjects(),
      });
    }

  }, [timeStatus])

  React.useEffect(() => {
    if (boardState.logoLetters.length === 0) {
      const { drop1, drop2, drop3, drop4, drop5 } = boardState;
      let win = false;

      const letters = [drop1, drop2, drop3, drop4, drop5];

      win = letters.every(([letter]) => letter?.ok);

      if (win && timeStatus === 'running') {
        stopTime(); //game set
        alert(`Congratulations, your your score is ${totalTime}!`);
      }
    }
  });

  const getList = (id: string): LetterObject[] => {
    return boardState[id]
  };

  // a little function to help us with reordering the result
  const reorder = ({ list, startIndex, endIndex }: ReorderProps): LetterObject[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = ({ source, destination, droppableSource, droppableDestination }: MoveProps): BoardState => {
    let sourceClone: LetterObject[] = Array.from(source);
    const destClone: LetterObject[] = Array.from(destination);

    // selected arrays are just 1 item length
    const dropIndex = droppableSource.droppableId === 'logoLetters'
      ? droppableSource.index
      : 0;

    let [removed] = sourceClone.splice(dropIndex, 1);

    // fill back as an empty slot
    if (droppableSource.droppableId !== 'logoLetters') {
      sourceClone = [...[emptyPlaceHolders[droppableSource.index]]];
    }

    if (droppableDestination.droppableId === 'logoLetters') {
      // dont remove the previous item
      destClone.splice(droppableDestination.index, 0, removed);
    } else {
      let matchPosition = removed.letter === destination[0].right;

      // special case
      if (removed.letter === 'o' || removed.letter === 'o2') {
        matchPosition = destination[0].right === 'o' || destination[0].right === 'o2';
      }

      removed.ok = matchPosition;

      // penalize the user
      if (!removed.ok) {
        increaseTotalTime(10);
      }

      // delete the empty slot and put our logo
      destClone.splice(0, 1, removed);
    }

    const result = {} as Result;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return {
      ...boardState,
      ...result
    };
  };

  const onDragEnd = (result:any):void => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // reorder selected is not allowed
      if (destination.droppableId === 'logoLetters') {
        const logoLetters = reorder ({
          list: getList(source.droppableId),
          startIndex: source.index,
          endIndex: destination.index
        });

        let state:BoardState = { logoLetters };

        setBoardState({
          ...boardState,
          ...state,
        });
      }
    } else {

      const result = move({
        source: getList(source.droppableId),
        destination: getList(destination.droppableId),
        droppableSource: source,
        droppableDestination: destination,
      });

      setBoardState({
        ...result
      });
    }
  };

  const getItemStyle = ({ isDragging, draggableStyle }: GetItemStyleProps): object => ({
    background: isDragging ? 'lightgreen' : 'white', // change background colour if dragging
    borderRadius: '16px',
    display: 'flex',
    m: `5px`,
    py: '5px',
    userSelect: 'none',
    ...draggableStyle  // styles we need to apply on draggables
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'none',
    borderRadius: '16px',
    display: 'flex',
    height: '160px',
    mb: '2px',
    width: '100%',
  });

  const getSlotItemStyle = ({ isDragging, draggableStyle }: GetItemStyleProps): object => ({
    background: isDragging ? 'lightgreen' : 'white', // change background colour if dragging
    borderRadius: '16px',
    display: 'flex',
    userSelect: 'none',
    ...draggableStyle  // styles we need to apply on draggables
  });

  const getSlotStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'none',
    margin: '1px',
    height: 130,
    display: 'flex',
    width: 140,
    borderRadius: '16px',
    overflow: 'hidden',
  });

  return (
    <Box sx={sxGameBoardContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="logoLetters" direction="horizontal">
          {(provided, snapshot) => (
            <Box sx={sxPiecesContainer}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {boardState.logoLetters.map((letterInfo, index) => (
                <Draggable
                  key={letterInfo.id}
                  draggableId={letterInfo.id}
                  index={index}
                >
                  {(provided, snapshot) => {
                    if (snapshot.isDragging && timeStatus === 'halted' && totalTime === 0) {
                      startTime();
                    }
                    return (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={getItemStyle({
                          isDragging: snapshot.isDragging,
                          draggableStyle: provided.draggableProps.style,
                        })}
                      >
                        <LogoLetter key={letterInfo.letter} logoLetter={letterInfo.letter} />
                      </Box>
                    )}}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
        <Text sx={sxMiddleText}>... and drop them here to make the logo great again!</Text>
        <Box sx={sxSlotContainer}>
          {DROPPABLES.map((stateName, index) => {
            const [slotInfo] = boardState[stateName];
            return (
              <Droppable key={stateName} droppableId={stateName} isDropDisabled={slotInfo.letter !== 'e'}>
                {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      style={getSlotStyle(snapshot.isDraggingOver)}
                    >
                      <Draggable
                        key={slotInfo.id}
                        draggableId={slotInfo.id}
                        index={index}
                        isDragDisabled={slotInfo.letter === 'e'}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getSlotItemStyle({
                              isDragging: snapshot.isDragging,
                              draggableStyle: provided.draggableProps.style,
                            })}
                          >
                            <LogoLetter logoLetter={slotInfo.letter} />
                          </div>
                        )}
                      </Draggable>
                    {provided.placeholder}
                    </div>
                  )}
              </Droppable>
            )
          })}
        </Box>
      </DragDropContext>
    </Box>
  )
}

export default GameBoard;
