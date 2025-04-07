import { useState } from 'react';

export const zodiacSigns = [
  'Aries',
  'Taurus',
  'Gemini',
  'Cancer',
  'Leo',
  'Virgo',
  'Libra',
  'Scorpio',
  'Sagittarius',
  'Capricorn',
  'Aquarius',
  'Pisces'
];

export default function ZodiacSelector({ onSelect }: { onSelect: (sign: string) => void }) {
  const [selectedSign, setSelectedSign] = useState(zodiacSigns[0]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sign = e.target.value;
    setSelectedSign(sign);
    onSelect(sign);
  };

  return (
    <select value={selectedSign} onChange={handleChange}>
      {zodiacSigns.map((sign) => (
        <option key={sign} value={sign}>{sign}</option>
      ))}
    </select>
  );
}
