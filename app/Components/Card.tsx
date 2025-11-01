// TodoItem.jsx
import { Image, Text } from "lucide-react";
import React, { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const ItemType = "TODO_ITEM";

interface props {
  id: number;
  type: "image" | "text";
  cardTitle: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

export const Card: FC<props> = ({ id, cardTitle, index, type, moveItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  // 1. Drop Target Logic
  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) return;

      const dragIndex = item.index; // Index of the currently dragging item
      const hoverIndex = index; // Index of the item being hovered over

      if (dragIndex === hoverIndex) return;

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      // Time to actually perform the action
      moveItem(dragIndex, hoverIndex);

      // **Crucial for re-rendering:** The `item` object in `useDrag` needs to be
      // mutated to reflect the new position to ensure `hover` checks remain correct.
      item.index = hoverIndex;
    },
  });

  // 2. Drag Source Logic
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // 3. Attach drag and drop refs to the same DOM node
  drag(drop(ref));

  const opacity = isDragging ? 0.4 : 1;

  return (
    <div
      ref={ref}
      style={{
        opacity,
        cursor: "move",
        padding: "8px",
        border: "1px solid #ccc",
        marginBottom: "4px",
      }}
    >
      <div className="flex items-center gap-4">
        {type == "text" ? <Text size={12} /> : <Image size={12} />}
        <p>{cardTitle}</p>
      </div>
    </div>
  );
};
