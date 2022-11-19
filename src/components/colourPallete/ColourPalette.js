import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
const ColourPalette = () => {
  let [color, setColor] = useState('#00FF00');
  let [isPickerVisable, setIsPickerVisable] = useState(false);

  function handleClick() {
    setIsPickerVisable((prevIsPickerVisable) => !prevIsPickerVisable);
  }

  function handleChangeComplete(color) {
    setColor(color.hex);
  }

  function handleClose() {
    setIsPickerVisable(false);
  }

  const buttonStyle = {
    background: color,
  };

  return (
    <div>
      <button
        className="w-8 h-8 border-none outline-none"
        style={buttonStyle}
        onClick={handleClick}
      />
      {isPickerVisable ? (
        <div>
          <button
            className="bg-transparent border-none outline-none z-10 fixed top-0 bottom-0 right-0 left-0 cursor-default"
            onClick={handleClose}
          />
          <div className="absolute z-20">
            <ChromePicker color={color} onChangeComplete={handleChangeComplete} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ColourPalette;
