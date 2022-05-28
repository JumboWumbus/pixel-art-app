import { Property } from 'csstype';
import React from 'react';

import s from '../styles/PixelGrid.module.css';

const emptyPixel = {
  on: false,
  color: '#000000'
};

const Grid = ({
  currentColor,
  cells,
  setCells
}: {
  currentColor: string;
  cells: any;
  setCells: any;
}) => {
  const updateCell = (i: any) => (e: { preventDefault: () => void; buttons: number }) => {
    e.preventDefault();

    if (e.buttons === 1 || e.buttons === 2) {
      setCells(
        cells.map((cell: any, cellIndex: any) => {
          if (cellIndex === i) {
            if (e.buttons === 1) {
              return {
                on: true,
                color: currentColor
              };
            }
            if (e.buttons === 2) {
              return {
                on: false,
                color: '#000000'
              };
            }
            return emptyPixel;
          }
          return cell;
        })
      );
    }
  };

  document.addEventListener('contextmenu', (event) => {
    event.preventDefault();
  });

  return (
    <div className={s.grid}>
      {cells.map(
        (cell: { on: boolean; color: string }, i: React.Key | null | undefined) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={{ backgroundColor: cell.on ? cell.color : '#ffffff' }}
            className={s.cell}
            onMouseOver={updateCell(i)}
            onMouseDown={updateCell(i)}
            onContextMenu={(e) => e.preventDefault()}
          />
        )
      )}
    </div>
  );
};

export default Grid;
