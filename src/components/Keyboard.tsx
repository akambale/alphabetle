import React, { useEffect, useCallback } from 'react';
import { LetterDisplayMetadata } from '@/types';
import { words } from '@/words';

const KEYS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'],
];

const ALPHA = new Set(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => letter),
);

interface KeyboardProps {
  setGrid: React.Dispatch<React.SetStateAction<LetterDisplayMetadata[][]>>;
  input: string;
  setInput: (input: string) => void;
  grid: LetterDisplayMetadata[][];
}

function getKeyColor(key: string, grid: LetterDisplayMetadata[][]): string {
  const countObj: Record<string, number> = {};
  grid.flat(2).forEach(cell => {
    if (!cell.value) return;
    countObj[cell.value] = (countObj[cell.value] || 0) + 1;
  });

  if (!countObj[key]) return '#818384';
  return countObj[key] === 1 ? '#538d4e' : '#b59f3b';
}

export const Keyboard: React.FC<KeyboardProps> = ({
  setGrid,
  input,
  setInput,
  grid,
}) => {
  function handleKeyClick(key: string) {
    handleKeyAction(key);
  }

  const handleKeyAction = useCallback(
    (key: string) => {
      if (grid.length >= 6) return;

      if (key === 'ENTER') {
        if (input.length !== 5) {
          alert('Enter a 5 letter word');
          return;
        }
        if (!words.has(input.toLowerCase())) {
          alert('Not a valid word');
          return;
        }
        setGrid(oldGrid => {
          const newRow = input.split('').map(letter => ({
            value: letter,
          }));
          return [...oldGrid, newRow];
        });
        setInput('');
      }

      if (key === 'DELETE' && input.length > 0) {
        setInput(input.slice(0, -1));
      }

      if (input.length === 5) {
        return;
      }

      if (key.length === 1) {
        setInput(input + key);
      }
    },
    [input, setInput, setGrid, grid.length],
  );

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      console.log('key pressed', e.key);
      const key = e.key.toUpperCase();
      if (key === 'BACKSPACE') {
        handleKeyAction('DELETE');
        return;
      }
      if (key === 'ENTER' || key === 'DELETE') {
        handleKeyAction(key);
        return;
      }
      if (ALPHA.has(key)) {
        handleKeyAction(key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [input, handleKeyAction]);

  return (
    <div className='mt-8'>
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className='flex justify-center gap-1 mb-2'>
          {row.map((key, keyIndex) => (
            <button
              key={keyIndex}
              onClick={() => handleKeyClick(key)}
              className={`
                flex items-center justify-center rounded font-bold cursor-pointer select-none text-white
                ${
                  key === 'ENTER' || key === 'DELETE'
                    ? 'h-14 px-3'
                    : 'h-14 w-14'
                }
              `}
              style={{
                backgroundColor:
                  key === 'ENTER' || key === 'DELETE'
                    ? '#818384'
                    : getKeyColor(key, grid),
              }}
            >
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};
