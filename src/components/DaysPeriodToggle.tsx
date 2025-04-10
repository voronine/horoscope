'use client'
import { useCallback } from 'react'
import Button from '@mui/material/Button'

type DaysPeriodToggleProps = {
  days: number
  onToggle: (newDays: number) => void
}

export default function DaysPeriodToggle({ days, onToggle }: DaysPeriodToggleProps) {
  const toggleDays = useCallback(() => {
    const newDays = days === 3 ? 7 : 3
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
        '&:hover': { backgroundColor: 'var(--button-bg)' }
      }}
    >
      {days === 3 ? '7 Days' : '3 Days'}
    </Button>
  )
}
