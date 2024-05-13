import type { Identifier, XYCoord } from 'dnd-core';
import { useRef, useEffect, useCallback } from 'react';
import { useDrop, useDrag } from 'react-dnd';

interface DragItem {
  index: number;
  id: string;
  type: string;
}

interface useQuestionDraggableProps {
  id: string;
  itemName: string;
  itemIndex: number;
  onDrag: (itemIndex: number, hoverIndex: number) => void;
}

const useDraggable = ({
  id,
  itemName,
  itemIndex,
  onDrag
}: useQuestionDraggableProps) => {
  const dragRef = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => {
    return {
      type: itemName,
      item: () => {
        return { id, index: itemIndex };
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    };
  }, [itemIndex]);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >(
    {
      accept: itemName,
      collect: (monitor) => {
        return {
          handlerId: monitor.getHandlerId()
        };
      },
      hover: (dragItem: DragItem, monitor) => {
        if (!dragRef.current) {
          return;
        }
        const dragIndex = dragItem.index;
        const hoverIndex = itemIndex;

        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = dragRef.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY =
          (clientOffset as XYCoord).y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        onDrag(dragIndex, hoverIndex);

        dragItem.index = hoverIndex;
      }
    },
    [itemIndex]
  );

  drag(drop(dragRef));

  const handleMovePage = useCallback(
    (event: DragEvent) => {
      if (isDragging) {
        if (event.clientY < 150) {
          window.scrollBy({ top: -10, left: 0, behavior: 'smooth' });
        } else if (event.clientY > window.innerHeight - 150) {
          window.scrollBy({ top: 10, left: 0, behavior: 'smooth' });
        }
      }
    },
    [isDragging]
  );

  useEffect(() => {
    if (dragRef.current) {
      dragRef.current.addEventListener('drag', handleMovePage);
    }
  }, [handleMovePage]);

  return {
    dragRef,
    isDragging,
    handlerId
  };
};

export default useDraggable;
