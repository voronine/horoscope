import { addDays } from 'date-fns';

export type Score = {
  health: number;
  relationship: number;
  career: number;
};

export type DayData = {
  date: string;
  score: Score;
  catFact: string;
  catFactParam: number;
};

export type HoroscopeData = {
  startDate: string;
  data: Record<string, DayData[]>;
};

export function generateRandomNumber(): number {
  return Math.floor(Math.random() * 101);
}

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

export function generateHoroscopeData(): HoroscopeData {
  const startDate = new Date().toISOString().split('T')[0];
  const data: Record<string, DayData[]> = {};

  zodiacSigns.forEach(sign => {
    data[sign] = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(new Date(), i);
      return {
        date: d.toISOString().split('T')[0],
        score: {
          health: generateRandomNumber(),
          relationship: generateRandomNumber(),
          career: generateRandomNumber()
        },
        catFact: '',
        catFactParam: generateRandomNumber()
      };
    });
  });

  return { startDate, data };
}
