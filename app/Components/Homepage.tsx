"use client";

import React, { useState } from "react";
import { cardType, edit } from "../types/types";
import Block from "./Block";
import EditCreateModal from "./EditCreateModal";
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const dummy1: cardType = {
  id: 1,
  type: "image",
  name: "Example 1",
};

const dummy2: cardType = {
  id: 2,
  type: "text",
  name: "Example 2",
};

const Homepage = () => {
  // State
  const [edit, setEdit] = useState<edit>({
    open: false,
    id: -1,
    type: undefined,
  });
  const [blocks, setBlocks] = useState<cardType[]>([dummy1, dummy2]);

  // Drag and drop
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;
  };

  // Drag n Dorp sensors
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 150,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  // Column config
  const { setNodeRef } = useDroppable({
    id: 1,
  });

  return (
    <div className="relative p-10">
      <h1 className="mb-4">Stack</h1>

      <DndContext sensors={sensors} onDragEnd={onDragEnd} autoScroll={false}>
        <div ref={setNodeRef} className="flex flex-col gap-4">
          {blocks.map((block, i) => (
            <Block
              key={block.id}
              index={i}
              setEdit={setEdit}
              content={block.content}
              height={block.height}
              id={block.id}
              image_source={block.image_source}
              name={block.name}
              type={block.type}
              width={block.width}
            />
          ))}
        </div>
      </DndContext>

      <EditCreateModal edit={edit} setEdit={setEdit} />
    </div>
  );
};

export default Homepage;
