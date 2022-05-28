import React from 'react';

import s from '../styles/ColorPicker.module.css';

const ColorPicker = ({
  currentColor,
  onSetColor
}: {
  currentColor: any;
  onSetColor: any;
}) => {
  const colorChange = (event: { target: { value: any } }) => {
    onSetColor(event.target.value);
  };

  return (
    <input
      className={s.colorPicker}
      type="color"
      value={currentColor}
      onChange={colorChange}
    />
  );
};

export default ColorPicker;
