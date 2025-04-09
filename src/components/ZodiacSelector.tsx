import { useState } from 'react';
import { zodiacSigns } from '@/utils/horoscope';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import styles from './ZodiacSelector.module.css'

type ZodiacSelectorProps = {
  onSelect: (sign: string) => void;
};

export default function ZodiacSelector({ onSelect }: ZodiacSelectorProps) {
  const [selectedSign, setSelectedSign] = useState(zodiacSigns[0]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    const sign = e.target.value as string;
    setSelectedSign(sign);
    onSelect(sign);
  };

  return (
    <div className={styles.select}>
      <FormControl
        variant="outlined"
        sx={{ width: 200 }} 
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
          {zodiacSigns.map((sign) => (
            <MenuItem key={sign} value={sign}>
              {sign}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
