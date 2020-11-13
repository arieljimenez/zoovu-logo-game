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

type BoardState = { [key: string]: LetterObject[]};

interface GetItemStyleProps {
  isDragging: boolean;
  draggableStyle?: object;
}

type Result = {
  logoLetters: LetterObject[];
  drop1: LetterObject[];
  drop2: LetterObject[];
  drop3: LetterObject[];
  drop4: LetterObject[];
  drop5: LetterObject[];
}

type Dropeable = {
  index: number;
  droppableId: 'logoLetters' | 'drop1' | 'drop2' | 'drop3' | 'drop4' | 'drop5' ;
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

const sxPiecesContainer = {
  display: 'flex',
  height: 150,
  flex: 'auto',
}

const sxSlotContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  bg: 'lightgrey',
  zIndex: -1
}

const sxGameBoardContainer = {
  mt: 5,
}

/**
 * GameBoard component.
 */
const GameBoard = (): React.ReactElement => {
  const emptyPlaceHolders = getEmptySocketsInfo();
  const [boardState, setBoardState] = React.useState<BoardState>({
    logoLetters: getLetterObjects(),
    drop1: [emptyPlaceHolders[0]],
    drop2: [emptyPlaceHolders[1]],
    drop3: [emptyPlaceHolders[2]],
    drop4: [emptyPlaceHolders[3]],
    drop5: [emptyPlaceHolders[4]],
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

  const move = ({ source, destination, droppableSource, droppableDestination }: MoveProps): Result => {
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
    userSelect: 'none',
    padding: '10px',
    margin: `5px`,
    display: 'flex',
    borderRadius: '16px',
    background: isDragging ? 'lightgreen' : 'white', // change background colour if dragging
    ...draggableStyle  // styles we need to apply on draggables
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: '2px',
    height: 150,
    display: 'flex',
    width: '100%',
    borderRadius: '16px',
  });

  const getSlotStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: '2px',
    height: 150,
    display: 'flex',
    width: 150,
    borderRadius: '16px',
    overflow: 'hidden',
  });

  return (
    <Box sx={sxGameBoardContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="logoLetters" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              >
                <Box sx={sxPiecesContainer}>
                {boardState.logoLetters.map((letterInfo, index) => (
                  <Draggable
                    key={letterInfo.id}
                    draggableId={letterInfo.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
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
                    )}
                  </Draggable>
                  ))}
                </Box>
              {provided.placeholder}
              </div>
          )}
        </Droppable>
        <Text>... and drop them here to make the logo great again!</Text>
        <Box sx={sxSlotContainer}>
          {DROPPABLES.map((stateName, index) => (
            <Droppable key={stateName} droppableId={stateName}>
              {(provided, snapshot) => {
                const [slotInfo] = boardState[stateName];

                return (
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
                          style={getItemStyle({
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
                )
              }}
            </Droppable>
          ))}
        </Box>
      </DragDropContext>
    </Box>
  )
}

export default GameBoard;
