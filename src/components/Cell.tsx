import React from 'react';
import { LetterDisplayMetadata } from '@/types';

export const Cell: React.FC<LetterDisplayMetadata & { pending?: boolean }> = ({
  color,
  value,
  pending,
}) => {
  const style = {
    backgroundColor: color || '#3a3a3c',
    border: !value || pending ? '2px solid #3a3a3c' : 'none',
  };

  return (
    <div
      className='w-16 h-16 flex items-center justify-center text-2xl font-bold bg-white'
      style={style}
    >
      {value || null}
    </div>
  );
};
