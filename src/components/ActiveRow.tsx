import React from 'react';
import { Cell } from './Cell';

export function ActiveRow({ input }: { input: string }) {
  // create empty cells for the input
  const emptyCells = 5 - input.length;
  const emptyCellsArray = emptyCells > 0 ? Array(emptyCells).fill(null) : [];
  return (
    <div className='flex justify-center gap-2 mb-2'>
      {input.split('').map((letter, index) => (
        <Cell
          key={`active-${index}`}
          value={letter}
          color='transparent'
          pending
        />
      ))}
      {emptyCellsArray.map((_, index) => (
        <Cell key={`empty-${index}`} value='' color='transparent' />
      ))}
    </div>
  );
}
