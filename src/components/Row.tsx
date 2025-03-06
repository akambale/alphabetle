import React from 'react';
import { LetterDisplayMetadata } from '@/types';
import { Cell } from './Cell';

interface RowProps {
  letters: LetterDisplayMetadata[];
  onDelete?: () => void;
}

export const Row: React.FC<RowProps> = ({ letters, onDelete }) => {
  return (
    <div className='flex justify-center gap-2 mb-2 relative'>
      {letters.map((letter, index) => (
        <Cell key={index} {...letter} />
      ))}
      {onDelete && (
        <button
          onClick={onDelete}
          style={{
            transform: 'translateX(-22px)',
          }}
          className='absolute -right-8 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
      )}
    </div>
  );
};
