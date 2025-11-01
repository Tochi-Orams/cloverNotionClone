// App.tsx

import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { CardStack } from "./CardStack";

const App: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <CardStack />
    </DndProvider>
  );
};

export default App;
