import React from 'react';
import { Row } from './Row';
import { EmptyRow } from './EmptyRow';
import { ActiveRow } from './ActiveRow';
import { LetterDisplayMetadata } from '@/types';

interface GridProps {
  grid: LetterDisplayMetadata[][];
  input: string;
  setGrid: React.Dispatch<React.SetStateAction<LetterDisplayMetadata[][]>>;
}

function countLetters(grid: LetterDisplayMetadata[][]) {
  const countObj: Record<string, number> = {};
  grid.flat(2).forEach(cell => {
    if (!cell.value) return;
    countObj[cell.value] = (countObj[cell.value] || 0) + 1;
  });
  return countObj;
}

function assignColors(
  grid: LetterDisplayMetadata[][],
  countObj: Record<string, number>,
) {
  grid.forEach(row => {
    row.forEach(cell => {
      if (!cell.value) return;
      if (countObj[cell.value] === 1) {
        cell.color = '#538d4e';
      } else {
        cell.color = '#b59f3b';
      }
    });
  });
}

export const Grid: React.FC<GridProps> = ({ grid, input, setGrid }) => {
  const handleDeleteRow = (index: number) => {
    setGrid(prevGrid => prevGrid.filter((_, i) => i !== index));
  };

  // Apply colors to the grid
  const coloredGrid = React.useMemo(() => {
    const gridCopy = structuredClone(grid);
    const countObj = countLetters(gridCopy);
    assignColors(gridCopy, countObj);
    return gridCopy;
  }, [grid]);

  const shouldShowActiveRow = grid.length < 6;

  return (
    <div className='space-y-2'>
      {coloredGrid.map((row: LetterDisplayMetadata[], index: number) => (
        <Row
          key={index}
          letters={row}
          onDelete={() => handleDeleteRow(index)}
        />
      ))}
      {shouldShowActiveRow ? <ActiveRow input={input} /> : null}
      {grid.length < 6
        ? Array(5 - grid.length)
            .fill(null)
            .map((_, index) => <EmptyRow key={index} />)
        : null}
    </div>
  );
};
