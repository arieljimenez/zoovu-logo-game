import * as React from 'react';
import { Box, Text } from 'rebass';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import LogoLetter from './LogoLetter';
import { getLetterObjects, getEmptySocketsInfo } from '../helpers';


const GRID_SIZE = 5;

type BoardState = {[key: string]: LetterObject[]};

interface GetItemStyleProps {
  isDragging: boolean;
  draggableStyle?: object;
}

type Result = {
  droppable: LetterObject[];
  droppable2: LetterObject[];
}

type Dropeable = {
  index: number;
  droppableId: 'droppable' | 'droppable2';
}

interface MoveProps {
  source: any;
  destination: any;
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

const sxGameBoardContainer = {
  mt: 5,
}

/**
 * GameBoard component.
 */
const GameBoard = (): React.ReactElement => {
  const [boardState, setBoardState] = React.useState<BoardState>({
    logoLetters: getLetterObjects(),
    selected: getEmptySocketsInfo(),
  });


  const id2List:{[key:string]:string} = {
    droppable: 'logoLetters',
    droppable2: 'selected'
  };

  const getList = (id: string): LetterObject[] => boardState[id2List[id]];

  // a little function to help us with reordering the result
  const reorder = ({ list, startIndex, endIndex }: ReorderProps): LetterObject[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = ({ source, destination, droppableSource, droppableDestination }: MoveProps): Result => {
    const sourceClone: LetterObject[] = Array.from(source);
    const destClone: LetterObject[] = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 1, removed);

    const result = {} as Result;
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;


    console.log('== GameBoard');
    console.log({
        result
    });
    console.log('GameBoard == ');


    return result;
  };


  const onDragEnd = (result:any):void => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const logoLetters = reorder ({
        list: getList(source.droppableId),
        startIndex: source.index,
        endIndex: destination.index
      });

      let state:BoardState = { logoLetters };

      if (source.droppableId === 'droppable2') {
        state = { selected: logoLetters };
      }

      setBoardState({
        ...boardState,
        ...state,
      });

    } else {
      const result = move({
        source: getList(source.droppableId),
        destination: getList(destination.droppableId),
        droppableSource: source,
        droppableDestination: destination,
      });

      setBoardState({
        logoLetters: result.droppable,
        selected: result.droppable2,
      });
    }
  };

  const getItemStyle = ({ isDragging, draggableStyle }: GetItemStyleProps): object => ({
    userSelect: 'none',
    padding: GRID_SIZE * 2,
    margin: `0 ${GRID_SIZE}px 0 0`,
    display: 'flex',
    borderRadius: '16px',
    background: isDragging ? 'lightgreen' : 'grey', // change background colour if dragging
    ...draggableStyle  // styles we need to apply on draggables
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: GRID_SIZE + 1,
    height: 150,
    display: 'flex',
    width: '100%',
    borderRadius: '16px',
  });

  return (
    <Box sx={sxGameBoardContainer}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
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
        <Droppable droppableId="droppable2" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <Box sx={sxPiecesContainer}>
                {boardState.selected.map((letterInfo, index) => (
                  <Draggable
                    key={letterInfo.id}
                    draggableId={letterInfo.id}
                    index={index}
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
                        <LogoLetter key={letterInfo.id} logoLetter={letterInfo.letter} />
                      </div>
                    )}
                  </Draggable>
                ))}
              </Box>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  )
}

export default GameBoard;
