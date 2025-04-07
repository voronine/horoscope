import React from 'react';

type MoodImageProps = {
  sign: string;
};

export default function MoodImage({ sign }: MoodImageProps) {
  return (
    <img
      src={`/images/mood/${sign}.png`}
      alt={`${sign} mood`}
      style={{
        maxWidth: '100px',
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  );
}
