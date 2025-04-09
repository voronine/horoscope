import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';

type DaysPeriodToggleProps = {
  onToggle: (days: number) => void;
};

export default function DaysPeriodToggle({ onToggle }: DaysPeriodToggleProps) {
  const [days, setDays] = useState(3);

  const toggleDays = useCallback(() => {
    setDays(prevDays => {
      const newDays = prevDays === 3 ? 7 : 3;
      onToggle(newDays);
      return newDays;
    });
  }, [onToggle]);

  return (
    <Button
      variant="contained"
      onClick={toggleDays}
      sx={{
        backgroundColor: 'gray',
        height: 25,
        '&:hover': {
          backgroundColor: 'darkgray'
        }
      }}
    >
      {days === 3 ? '7 Days' : '3 Days'}
    </Button>
  );
}
