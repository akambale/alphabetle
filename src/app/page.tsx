'use client';

import { useState } from 'react';
import { Grid } from '@/components/Grid';
import { Keyboard } from '@/components/Keyboard';
import { Score } from '@/components/Score';
import type { LetterDisplayMetadata } from '@/types';

export default function Home() {
  const [grid, setGrid] = useState<LetterDisplayMetadata[][]>([]);
  const [input, setInput] = useState<string>('');

  return (
    <div className='min-h-screen bg-black py-8'>
      <div className='max-w-md mx-auto'>
        <h1 className='text-3xl font-bold text-center mb-8 text-white'>
          Alphabetle
        </h1>
        <Score grid={grid} />
        <Grid grid={grid} input={input} setGrid={setGrid} />
        <Keyboard
          setGrid={setGrid}
          input={input}
          setInput={setInput}
          grid={grid}
        />
      </div>
    </div>
  );
}
