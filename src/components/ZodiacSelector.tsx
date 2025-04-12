'use client'
import React, { useCallback } from 'react'
import { zodiacSigns } from '@/utils/horoscope'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import styles from './ZodiacSelector.module.css'

const zodiacSignsMap: Record<string, string> = {
  Aries: 'Овен',
  Taurus: 'Телець',
  Gemini: 'Близнюки',
  Cancer: 'Рак',
  Leo: 'Лев',
  Virgo: 'Діва',
  Libra: 'Терези',
  Scorpio: 'Скорпіон',
  Sagittarius: 'Стрілець',
  Capricorn: 'Козеріг',
  Aquarius: 'Водолій',
  Pisces: 'Риби',
}

type ZodiacSelectorProps = {
  value: string
  onSelect: (sign: string) => void
}

const ZodiacSelector: React.FC<ZodiacSelectorProps> = ({ value, onSelect }) => {
  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    const sign = e.target.value as string
    onSelect(sign)
  }, [onSelect])

  return (
    <div className={styles.select}>
      <FormControl
        variant="outlined"
        sx={{
          width: 200,
          '@media (max-width:500px)': {
            width: 150,
            '& .MuiInputBase-input': { fontSize: '0.8rem', padding: '4px' },
            '& .MuiInputLabel-root': { fontSize: '0.8rem' },
          },
        }}
      >
        <InputLabel id="zodiac-selector-label">Гороскоп</InputLabel>
        <Select
          labelId="zodiac-selector-label"
          id="zodiac-selector"
          value={value}
          onChange={handleChange}
          label="horoscope"
          autoWidth={false}
          MenuProps={{
            PaperProps: {
              sx: {
                backgroundColor: 'var(--background-color)',
                color: 'var(--text-color)',
                '& .MuiMenuItem-root': {
                  backgroundColor: 'var(--background-color)',
                  color: 'var(--text-color)',
                  '&:hover': { backgroundColor: 'var(--card-hover-bg)' },
                  '&.Mui-selected': {
                    backgroundColor: 'var(--card-hover-bg)',
                    '&:hover': { backgroundColor: 'var(--card-hover-bg)' },
                  },
                },
              },
            },
          }}
          sx={{
            backgroundColor: 'var(--background-color)',
            color: 'var(--text-color)',
            '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--card-border)' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--card-hover-bg)' },
            '& .MuiInputLabel-root': { color: 'var(--text-color)' },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--card-hover-bg)' },
          }}
        >
          {zodiacSigns.map((sign) => (
            <MenuItem key={sign} value={sign}>
              {zodiacSignsMap[sign]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default ZodiacSelector
