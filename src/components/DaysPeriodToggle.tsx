import { useState } from 'react';

export default function DaysPeriodToggle({ onToggle }: { onToggle: (days: number) => void }) {
  const [days, setDays] = useState(3);

  const toggleDays = () => {
    const newDays = days === 3 ? 7 : 3;
    setDays(newDays);
    onToggle(newDays);
  };

  return (
    <button onClick={toggleDays}>
      {days === 3 ? '7 Days Forecast' : '3 Days Forecast'}
    </button>
  );
}
