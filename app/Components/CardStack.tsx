// CardStack.tsx

import React, { useState, useCallback } from "react";
import update from "immutability-helper";
import { Card } from "./Card";

export const CardStack: React.FC = () => {
  const [todos, setTodos] = useState<any[]>([]);

  // Function to perform the reordering splice operation on the state array
  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = todos[dragIndex];
      setTodos(
        update(todos, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
          ],
        })
      );
    },
    [todos]
  );

  const renderItem = useCallback(
    (todo: any, index: number) => {
      return (
        <Card
          key={todo.id}
          type={todo.type}
          id={todo.id}
          index={index}
          cardTitle={todo.Title}
          moveItem={moveItem}
        />
      );
    },
    [moveItem]
  );

  return (
    <div
      style={{
        width: 400,
        margin: "20px auto",
        border: "1px solid #eee",
        padding: "10px",
      }}
    >
      <h2>📝 Stack (TS)</h2>
      {todos.map(renderItem)}
    </div>
  );
};
