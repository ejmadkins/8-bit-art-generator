import React from 'react';
import { useCanvas } from '../../hooks/useCanvas';

const Canvas = ({ width, height }) => {
  const { canvasRef, onMouseDown } = useCanvas();
  return (
    <canvas ref={canvasRef} onMouseDown={onMouseDown} width={width} height={height} style={style} />
  );
};

export default Canvas;

const style = {
  border: 'solid 1px black',
  background: 'white',
};
