import { useEffect, useRef, useState } from 'react';

export const useCanvas = () => {
  const [mouseDown, setMouseDown] = useState(false);

  const canvasRef = useRef(null);
  const prevPoint = useRef(null);
  const onMouseDown = () => setMouseDown(true);
  const pixels = [...Array(50)].map(() => [...Array(50)]);
  const ps = 16;

  function render() {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    for (let col = 0; col < pixels.length; col++) {
      for (let row = 0; row < pixels.length; row++) {
        ctx.fillStyle = pixels[col][row].bg;
        ctx.fillRect(col * ps, row * ps, ps, ps);
      }
    }
  }

  function onDraw({ prevPoint, currentPoint, ctx }) {
    const { x: currX, y: currY } = currentPoint;
    let currIndX = Math.floor(currX / ps);
    let currIndY = Math.floor(currY / ps);
    if (prevPoint) {
      const { x: prevX, y: prevY } = prevPoint;
      let prevIndX = Math.floor(prevX / ps);
      let prevIndY = Math.floor(prevY / ps);
      if (Math.abs(currIndX - prevIndX) > 1 || Math.abs(currIndY - prevIndY) > 1) {
        // let interpPixels = helper(prevIndX, prevIndY, currIndX, currIndY);
        let interpPixels = helper(prevX, prevY, currX, currY);
        for (let i = 0; i < interpPixels.length; i++) {
          // pixels[interpPixels[i].x][interpPixels[i].y].bg = 'red';
          ctx.fillStyle = 'red';
          ctx.fillRect(
            Math.floor(interpPixels[i].x / ps) * ps,
            Math.floor(interpPixels[i].y / ps) * ps,
            ps,
            ps
          );
        }
      }
      // return;
    }
    // pixels[currIndX][currIndY].bg = 'red';
    ctx.fillStyle = 'red';
    ctx.fillRect(currIndX * ps, currIndY * ps, ps, ps);
  }

  function helper(x0, y0, x1, y1) {
    let num_xvals = Math.max(Math.abs(y1 - y0), Math.abs(x1 - x0)) + 1;
    let xvals = Array.from({ length: num_xvals }, (v, i) => x0 + ((i + 1) * (x1 - x0)) / num_xvals);
    let interpPixels = [];
    for (let i = 0; i < xvals.length; i++) {
      let p = { x: Math.round(xvals[i]), y: Math.round(interpolate(x0, y0, x1, y1, xvals[i])) };
      interpPixels.push(p);
    }
    return interpPixels;
  }

  function interpolate(x0, y0, x1, y1, x) {
    let y = (y0 * (x1 - x) + y1 * (x - x0)) / (x1 - x0);
    return y;
  }

  useEffect(() => {
    for (let col = 0; col < pixels.length; col++) {
      for (let row = 0; row < pixels.length; row++) {
        let pixel = {
          bg:
            (col % 2 == 0 && row % 2 == 0) || (col % 2 != 0 && row % 2 != 0) ? 'white' : '#D0D0D0',
        };
        pixels[col][row] = pixel;
      }
    }
    render();
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!mouseDown) return;
      const currentPoint = computePointInCanvas(e);

      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx || !currentPoint) return;

      onDraw({ ctx, currentPoint, prevPoint: prevPoint.current });
      prevPoint.current = currentPoint;
    };

    const computePointInCanvas = (e) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      return { x, y };
    };

    const mouseUpHandler = () => {
      setMouseDown(false);
      prevPoint.current = null;
    };

    canvasRef.current?.addEventListener('mousemove', handler);
    window.addEventListener('mouseup', mouseUpHandler);

    return () => {
      canvasRef.current?.removeEventListener('mousemove', handler);
      window.removeEventListener('mouseup', mouseUpHandler);
    };
  }, [onDraw]);
  return { canvasRef, onMouseDown };
};
