import React, { useMemo, useState } from 'react';
import ColorPicker from './components/colorPicker';
import Grid from './components/pixelGrid';
import logo from './logo.svg';
import s from './styles/App.module.css';

const offCell = {
  on: false,
  color: '#000000'
};
const initialCells = Array.from({ length: 225 }, () => offCell);

function App() {
  const [currentColor, setCurrentColor] = useState('#56BC58');

  const [cells, setCells] = useState(initialCells);

  const colorSwatches = useMemo(
    () => [...new Set(cells.filter((cell) => cell.on).map((cell) => cell.color))],
    [cells]
  );

  const stringOfColors = useMemo(
    () => cells.map((cell) => cell.color.slice(1)).join(', '),
    [cells]
  );

  let minimizedColorArray: {
    on: boolean;
    color: string;
  }[];

  return (
    <div className={s.app}>
      <ColorPicker currentColor={currentColor} onSetColor={setCurrentColor} />
      <div className={s.colorSwatchContainer}>
        {colorSwatches.map((color) => (
          <div
            key={color}
            onClick={() => setCurrentColor(color)}
            className={s.colorSwatch}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <button onClick={() => setCells(initialCells)} />

      <button
        onClick={() => {
          console.log(cells[0].color);
          minimizedColorArray = cells.map((cell) => {
            const minimizedColor = '#' + cell.color[1] + cell.color[3] + cell.color[5];
            let isOn;
            if (!cell.on) isOn = false;
            else isOn = true;

            return { on: isOn, color: minimizedColor };
          });
          setCells(minimizedColorArray);
        }}
      >
        Minimize Hex values
      </button>

      <Grid cells={cells} setCells={setCells} currentColor={currentColor} />

      <p className={s.stringOfColors}>{stringOfColors}</p>
    </div>
  );
}

export default App;
