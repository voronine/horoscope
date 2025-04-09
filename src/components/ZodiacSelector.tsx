import { useState, useCallback } from 'react';
import { zodiacSigns } from '@/utils/horoscope';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './ZodiacSelector.module.css';

type ZodiacSelectorProps = {
  onSelect: (sign: string) => void;
};

export default function ZodiacSelector({ onSelect }: ZodiacSelectorProps) {
  const [selectedSign, setSelectedSign] = useState(zodiacSigns[0]);

  const handleChange = useCallback((e: SelectChangeEvent<string>) => {
    const sign = e.target.value as string;
    setSelectedSign(sign);
    onSelect(sign);
  }, [onSelect]);

  return (
    <div className={styles.select}>
      <FormControl
        variant="outlined"
        sx={{
          width: 200,
          '@media (max-width:500px)': {
            width: 150,
            '& .MuiInputBase-input': {
              fontSize: '0.8rem',
              padding: '4px'
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.8rem'
            }
          }
        }}
      >
        <InputLabel id="zodiac-selector-label">Horoscope</InputLabel>
        <Select
          labelId="zodiac-selector-label"
          id="zodiac-selector"
          value={selectedSign}
          onChange={handleChange}
          label="Horoscope"
          autoWidth={false}
        >
          {zodiacSigns.map(sign => (
            <MenuItem key={sign} value={sign}>
              {sign}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
