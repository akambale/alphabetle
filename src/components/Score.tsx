import React from 'react';
import { LetterDisplayMetadata } from '@/types';

interface ScoreProps {
  grid: LetterDisplayMetadata[][];
}

export const Score: React.FC<ScoreProps> = ({ grid }) => {
  const calculateScore = () => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const countObj: Record<string, number> = {};

    // Count letter occurrences in grid
    grid.flat(2).forEach(cell => {
      if (!cell.value) return;
      countObj[cell.value] = (countObj[cell.value] || 0) + 1;
    });

    let score = 0;
    let unusedCount = 0;
    let singleUseCount = 0;
    let multipleUseCount = 0;

    // Calculate score based on rules
    alphabet.forEach(letter => {
      const count = countObj[letter] || 0;
      if (count === 0) {
        score += 5;
        unusedCount++;
      } else if (count === 1) {
        singleUseCount++;
      } else {
        score += count;
        multipleUseCount++;
      }
    });

    return { score, unusedCount, singleUseCount, multipleUseCount };
  };

  const stats = calculateScore();

  return (
    <div className='text-white mb-4 flex items-center justify-center gap-2'>
      Score: {stats.score}
      <div className='group relative'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-5 w-5 text-gray-400 cursor-help'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
        <div className='absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 p-3 bg-gray-800 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-transparent border-b-gray-800'></div>
          <div className='text-sm space-y-2'>
            <p>
              Try to use as many letters from the alphabet as possible by
              entering words. Green letters are used once and yellow letters are
              used multiple times. The lowest theoretical score is 5.
            </p>
            <p className='font-bold'>Scoring Rules:</p>
            <p>• Unused letters: +5 points ({stats.unusedCount} letters)</p>
            <p>• Single use: +0 points ({stats.singleUseCount} letters)</p>
            <p>• Multiple uses: +N points ({stats.multipleUseCount} letters)</p>
          </div>
          <div className='absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-gray-800'></div>
        </div>
      </div>
    </div>
  );
};
