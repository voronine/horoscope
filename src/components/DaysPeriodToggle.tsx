import { useState, useCallback } from 'react'
import Button from '@mui/material/Button'

type DaysPeriodToggleProps = {
  onToggle: (days: number) => void
}

export default function DaysPeriodToggle({ onToggle }: DaysPeriodToggleProps) {
  const [days, setDays] = useState(3)

  const toggleDays = useCallback(() => {
    const newDays = days === 3 ? 7 : 3
    setDays(newDays)
    onToggle(newDays)
  }, [days, onToggle])

  return (
    <Button
      variant="contained"
      onClick={toggleDays}
      sx={{
        backgroundColor: 'var(--button-bg)',
        color: 'var(--text-color)',
        height: 20,
        '&:hover': {
          backgroundColor: 'var(--button-bg)',
        }
      }}
    >
      {days === 3 ? '7 Days' : '3 Days'}
    </Button>
  )
}
