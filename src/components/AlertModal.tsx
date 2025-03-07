import React from 'react';

interface AlertModalProps {
  message: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50'>
      <div className='bg-white text-gray-800 font-bold px-6 py-3 rounded-lg shadow-xl text-center min-w-[200px]'>
        {message}
      </div>
    </div>
  );
};
