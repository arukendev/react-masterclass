import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

const Card = styled.div<{ isDragging: boolean }>`
  margin-bottom: 5px;
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ? "#487eb0" : props.theme.cardColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(0,0,0,0.05)" : "none"};
`;

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);