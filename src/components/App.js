import React from 'react';
import ColourPalette from './colourPallete/ColourPalette';
import Canvas from './drawingCanvas/Canvas';
import Menu from './menu/Menu';
import SavedDrawings from './savedDrawings/SavedDrawings';

function App() {
  return (
    <div className="flex flex-wrap">
      <div className="">
        <ColourPalette></ColourPalette>
      </div>
      <div className="">
        <Canvas></Canvas>
        <Menu></Menu>
        <SavedDrawings></SavedDrawings>
      </div>
    </div>
  );
}

export default App;
