import React from 'react';
import Nav from './nav/Nav';
import ColourPalette from './colourPallete/ColourPalette';
import Canvas from './drawingCanvas/Canvas';
import Menu from './menu/Menu';
import SavedDrawings from './savedDrawings/SavedDrawings';

function App() {
  return (
    <div className="m-4">
      <div className="flex justify-center">
        <Nav></Nav>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <div className="m-64">
          <Canvas></Canvas>{' '}
        </div>
        <div className="m-64">
          <div className="flex justify-center gap-4">
            <Menu></Menu>
            <SavedDrawings></SavedDrawings>
          </div>
          <ColourPalette></ColourPalette>
        </div>
      </div>
    </div>
  );
}

export default App;
