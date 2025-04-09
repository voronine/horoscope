import { useState } from 'react';
import Button from '@mui/material/Button';

type DaysPeriodToggleProps = {
  onToggle: (days: number) => void;
};

export default function DaysPeriodToggle({ onToggle }: DaysPeriodToggleProps) {
  const [days, setDays] = useState(3);

  const toggleDays = () => {
    const newDays = days === 3 ? 7 : 3;
    setDays(newDays);
    onToggle(newDays);
  };

  return (
    <Button
      variant="contained"
      onClick={toggleDays}
      sx={{
        backgroundColor: 'gray',
        height: 25,
        '&:hover': {
          backgroundColor: 'darkgray',
        },
      }}
    >
      {days === 3 ? '7 Days' : '3 Days'}
    </Button>
  );
}
