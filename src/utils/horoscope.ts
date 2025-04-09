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
  'Pisces',
];

export function generateScore(date: string, zodiacSign: string): number {
  const dayNumber = new Date(date).getDate();
  const zodiacIndex = zodiacSigns.indexOf(zodiacSign) + 1;
  const baseScore = Math.floor(Math.random() * 101);
  const bonus = Math.floor((dayNumber + zodiacIndex) / 2);
  const finalScore = Math.floor((baseScore + bonus) / 2);
  return finalScore > 0 ? finalScore : 1;
}

export function generateHoroscopeData(): HoroscopeData {
  const startDate = new Date().toISOString().split('T')[0];
  const data: Record<string, DayData[]> = {};

  zodiacSigns.forEach((sign) => {
    data[sign] = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(new Date(), i);
      const dateString = d.toISOString().split('T')[0];
      const health = generateScore(dateString, sign);
      const relationship = generateScore(dateString, sign);
      const career = generateScore(dateString, sign);
      const averageScore = Math.floor((health + relationship + career) / 3);
      return {
        date: dateString,
        score: { health, relationship, career },
        catFact: '',
        catFactParam: averageScore,
      };
    });
  });

  return { startDate, data };
}
