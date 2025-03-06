import React from 'react';
import { Cell } from './Cell';

export const EmptyRow: React.FC = () => {
  return (
    <div className='flex justify-center gap-2 mb-2'>
      {Array(5)
        .fill(null)
        .map((_, index) => (
          <Cell key={`empty-${index}`} value='' color='transparent' />
        ))}
    </div>
  );
};
